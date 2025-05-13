function iniciarPrograma() {
    const imgSis = document.getElementById('img-sis');

    document.getElementById('s1').addEventListener('click', () => {
        document.getElementById('step-3-enjoy').style.display = 'none'
        document.getElementById('step-2').style.display = 'block'
        imgSis.innerHTML = '<img src="../img/sisn-1.png" alt="" srcset="" style="max-width: 50%; max-height: 50%;">'
        document.getElementById('siguiente-1').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('x').value)
            const y = parseFloat(document.getElementById('y').value)
            if (x < 0 || x > 2 || y < -1 || y > 1 || isNaN(x) || isNaN(y)) {
                let modal = new bootstrap.Modal(document.getElementById('errorModal'));
                modal.show();

                if (isNaN(x) || isNaN(y)) {
                    document.getElementById('msg-modal').innerHTML = 'Los valores no pueden estar vacios'

                }
                else {
                    document.getElementById('msg-modal').innerHTML = 'El intervalo es inadecuado'

                }
                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else {
                document.getElementById('step-3-enjoy').style.display = 'block'

                newtonRaphsonSystem(x, y,'sis1')

            }
        })
    })

    document.getElementById('s2').addEventListener('click', () => {

        document.getElementById('step-3-enjoy').style.display = 'none'
        document.getElementById('step-2').style.display = 'block'

        imgSis.innerHTML = '<img src="../img/sis-2.png" alt="" srcset="" style="max-width: 50%; max-height: 50%;">'

        document.getElementById('siguiente-1').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('x').value)
            const y = parseFloat(document.getElementById('y').value)
            if (x < -4 || x > 4 || y < -4 || y > 4 || isNaN(x) || isNaN(y)) {
                let modal = new bootstrap.Modal(document.getElementById('errorModal'));
                modal.show();

                if (isNaN(x) || isNaN(y)) {
                    document.getElementById('msg-modal').innerHTML = 'Los valores no pueden estar vacios'

                }
                else {
                    document.getElementById('msg-modal').innerHTML = 'El intervalo es inadecuado'

                }
                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else {
                document.getElementById('step-3-enjoy').style.display = 'block'                

                newtonRaphsonSystem(x,y,'sis2')
            }
        })
    })
}

function newtonRaphsonSystem(x0, y0, sis) {
    const resultado = document.getElementById('resultado');

    const maxIter = 100;
    const tol = 1e-6;
    let x = x0;
    let y = y0;

    let output = '<table class="table table-striped">';
    output += '<thead><tr><th>\\[n\\]</th><th>\\[\\vec{x}_n\\]</th><th>\\[\\mathbb{J}\\]</th><th>\\[\\mathbb{J}^{-1}(\\vec{x}_n)\\]</th><th>\\[\\vec{f}(\\vec{x}_n)\\]</th><th>\\[\\vec{x}_{n+1}\\]</th></tr></thead><tbody>';

    for (let iter = 0; iter < maxIter; iter++) {
        let f, g, dfdx, dfdy, dgdx, dgdy

        if(sis == 'sis1'){
            f = Math.pow(x, 3) + y - 1;
            g = Math.pow(y, 3) - x + 1;

            dfdx = 3 * Math.pow(x, 2);
            dfdy = 1;
            dgdx = -1;
            dgdy = 3 * Math.pow(y, 2);
        }
        else if(sis == 'sis2'){
            f = Math.pow(x, 2) - y - 2;
            g = Math.pow(y, 2) + x - 4;

            dfdx = 2 * x;
            dfdy = - y;
            dgdx = 1;
            dgdy = 2 * y;
        }


        const det = dfdx * dgdy - dfdy * dgdx;

        if (Math.abs(det) < 1e-12) {
            resultado.innerHTML = 'El Jacobiano es singular. El método no puede continuar.';
            return;
        }

        // Inversa del Jacobiano por [-f, -g]
        const dx = (-f * dgdy - (-g) * dfdy) / det;
        const dy = (dfdx * (-g) - (-f) * dgdx) / det;

        // Registro de datos para la tabla
        const jMatrix = `\\[\\begin{bmatrix} ${dfdx.toFixed(4)} & ${dfdy} \\\\ ${dgdx} & ${dgdy.toFixed(4)} \\end{bmatrix}\\]`;
        const jInv = `\\[\\frac{1}{${det.toFixed(4)}} \\begin{bmatrix} ${dgdy.toFixed(4)} & ${(-dfdy).toFixed(4)} \\\\ ${(-dgdx).toFixed(4)} & ${dfdx.toFixed(4)} \\end{bmatrix}\\]`;
        const fxVec = `\\[\\begin{bmatrix} ${f.toExponential(2)} \\\\ ${g.toExponential(2)} \\end{bmatrix}\\]`;
        const xn = `\\[\\begin{bmatrix} ${x.toFixed(6)} \\\\ ${y.toFixed(6)} \\end{bmatrix}\\]`;
        const xn1 = `\\[\\begin{bmatrix} ${(x + dx).toFixed(6)} \\\\ ${(y + dy).toFixed(6)} \\end{bmatrix}\\]`;

        output += `<tr><td>${iter}</td><td>${xn}</td><td>${jMatrix}</td><td>${jInv}</td><td>${fxVec}</td><td>${xn1}</td></tr>`;

        // Actualización
        x += dx;
        y += dy;

        if (Math.abs(dx) < tol && Math.abs(dy) < tol) {
            output += `</tbody></table> <br><br> <p class="h3">La aproximación final es: \\[ \\vec{x} = \\] ${xn1}</p>`;
            resultado.innerHTML = output;
            if (typeof MathJax !== 'undefined') MathJax.typeset(); // Para que se actualice MathJax
            return;
        }
    }

    output += '</tbody></table>';
    resultado.innerHTML = output + "<p>No convergió en el número máximo de iteraciones.</p>";
    if (typeof MathJax !== 'undefined') MathJax.typeset();
}

window.addEventListener('load', iniciarPrograma)