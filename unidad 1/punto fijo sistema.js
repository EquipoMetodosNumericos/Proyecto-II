function iniciarPrograma() {
    const imgSis = document.getElementById('img-sis');

    document.getElementById('s1').addEventListener('click', () => {
        document.getElementById('step-3').style.display = 'none'
        document.getElementById('step-4').style.display = 'none'
        document.getElementById('step-2').style.display = 'block'
        imgSis.innerHTML = '<img src="../img/sis-1.png" alt="" srcset="" style="max-width: 50%; max-height: 50%;">'
        document.getElementById('siguiente-1').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('x').value)
            const y = parseFloat(document.getElementById('y').value)
            if (x < 1.2 || x > 2 || y < -1.2 || y > 1.2 || isNaN(x) || isNaN(y)) {
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
                document.getElementById('step-3').style.display = 'block'
                document.getElementById('despejes').innerHTML =
                    `
                    <div class="col">
                    <input type="radio" name="despejes" id="d1">
                    <label for="d1" class="custom-eq w-100 ">
                        \\[
                        \\begin{cases}
                        x = \\sqrt{4-y^2}\\\\
                        y = \\frac{1}{x}
                        \\end{cases}
                        \\]
                    </label>
                    </div>
                    <div class="col">
                        <input type="radio" name="despejes" id="d2">
                        <label for="d2" class="custom-eq w-100">
                            \\[
                            \\begin{cases}
                            x = \\frac{1}{y}\\\\
                            y = \\sqrt{4-x^2}
                            \\end{cases}
                            \\]
                        </label>
                    </div>
                    `
                MathJax.typesetPromise()

                document.getElementById('d1').addEventListener('click',()=>{
                    resolver(x,y,'sis1')
                })
                document.getElementById('d2').addEventListener('click',()=>{
                    resolver(x,y,'sis2')
                })
            }
        })
    })

    document.getElementById('s2').addEventListener('click', () => {

        document.getElementById('step-3').style.display = 'none'
        document.getElementById('step-4').style.display = 'none'
        document.getElementById('step-2').style.display = 'block'

        imgSis.innerHTML = '<img src="../img/sis-2.png" alt="" srcset="" style="max-width: 50%; max-height: 50%;">'

        document.getElementById('siguiente-1').addEventListener('click', () => {
            const x = parseFloat(document.getElementById('x').value)
            const y = parseFloat(document.getElementById('y').value)
            if (x < 1.2 || x > 2 || y < -1.2 || y > 1.2 || isNaN(x) || isNaN(y)) {
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
                document.getElementById('step-3').style.display = 'block'
                document.getElementById('despejes').innerHTML =
                    `
                    <div class="col">
                    <input type="radio" name="despejes" id="d1">
                    <label for="d1" class="custom-eq w-100 ">
                        \\[
                        \\begin{cases}
                        x = \\sqrt{y+2}\\\\
                        y = \\sqrt{4-x}
                        \\end{cases}
                        \\]
                    </label>
                    </div>
                    
                    `
                MathJax.typesetPromise()

                document.getElementById('d1').addEventListener('click',()=>{
                    resolver(x,y,'sis3')
                })

            }
        })
    })
}

function resolver(x0, y0, sistema) {
    const tol = 1e-6;
    const maxIter = 100;
    let iter = 0;
    let x1, y1;
    let output = `<table class="table table-striped">
        <thead><tr><th>Iteración</th><th>\\[ x_n \\]</th><th>\\[ y_n \\]</th><th>Error</th></tr></thead><tbody>`;

    do {
        [x1, y1] = gSistema(x0, y0, sistema);

        const error = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);

        output += `<tr>
            <td>${iter + 1}</td>
            <td>${x1.toFixed(6)}</td>
            <td>${y1.toFixed(6)}</td>
            <td>${error.toExponential(2)}</td>
        </tr>`;

        if (error < tol) break;

        x0 = x1;
        y0 = y1;
        iter++;
    } while (iter < maxIter);

    output += `</tbody></table><br><br>
        Aproximación final: \\[ x ≈ ${x1.toFixed(6)}, \\quad y ≈ ${y1.toFixed(6)} \\]`;

    document.getElementById("resultado").innerHTML = output;
    if (window.MathJax) MathJax.typeset(); 

    document.getElementById('step-4').style.display = 'block'
}

function gSistema(x, y, sistema) {
    switch (sistema) {
        case 'sis1':            
            return [
                Math.sqrt(4-y**2),
                1/x
            ];
        case 'sis2':
            return [
                Math.sqrt((3 - y) / 2),
                Math.sqrt(4 - x)
            ];
        case 'sis3':
            return[
                Math.sqrt(y+2),
                Math.sqrt(4-x)
            ];            
        default:
            console.error("Sistema no reconocido");
            return [x, y];
    }
}

window.addEventListener('load', iniciarPrograma)