function iniciar() {
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'none';
    document.getElementById('step-4').style.display = 'none';

    let n;

    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const dropdownButton = document.getElementById("cantidadDatosDropdown");

    dropdownItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            dropdownButton.textContent = this.textContent;
            n = parseInt(dropdownButton.textContent);
        });
    });

    document.getElementById('siguiente-1').addEventListener('click', () => {
        if (!n) {
            mostrarError('La cantidad de datos no puede estar vacía');
        } else {
            document.getElementById('step-2').style.display = 'block';
            let tablaDatos = document.getElementById('tabla-datos');
            let tabla = '<table class="table table-striped"><th>\\[n\\]</th><th>\\[x\\]</th><th>\\[f(x)\\]</th>';
            for (let i = 0; i < n; i++) {
                tabla += `
                    <tr>
                        <td>${i}</td>
                        <td><input type="number" class="form-control" id="x-${i}" step="any"></td>
                        <td><input type="number" class="form-control" id="y-${i}" step="any"></td>
                    </tr>`;
            }
            tabla += '</table>';
            tablaDatos.innerHTML = tabla;
            MathJax.typeset();

            document.getElementById('siguiente-2').addEventListener('click', () => {
                let x = [], y = [];
                for (let i = 0; i < n; i++) {
                    x.push(parseFloat(document.getElementById(`x-${i}`).value));
                    y.push(parseFloat(document.getElementById(`y-${i}`).value));
                }

                if (new Set(x).size !== x.length) {
                    mostrarError('No puedes dar un valor repetido para x');
                } else {
                    document.getElementById('step-3').style.display = 'block';
                    let tabla = calcularDiferenciasDivididas(x, y);
                    document.getElementById('polinomio-general').innerHTML = tabla;
                    MathJax.typeset();

                    document.getElementById('siguiente-3').addEventListener('click', () => {
                        document.getElementById('step-4').style.display = 'block';
                        document.getElementById('intervalo').innerHTML = `\\[ x \\in [${x[0]},${x[n - 1]}] \\]`;
                        let polinomio = construirPolinomio(x, y);
                        mostrarPolinomio(polinomio);
                    });
                }
            });
        }
    });
}

function calcularDiferenciasDivididas(x, y) {
    let n = x.length;
    let coef = [...y];
    let tabla = '<table class="table table-bordered"><thead><tr><th>\\[x\\]</th><th>\\[f[x]\\]</th>';
    for (let i = 1; i < n; i++) {
        tabla += `<th>\\[f[${'x'.repeat(i + 1)}]\\]</th>`;
    }
    tabla += '</tr></thead><tbody>';

    let f = Array.from({ length: n }, (_, i) => [y[i]]);

    for (let j = 1; j < n; j++) {
        for (let i = 0; i < n - j; i++) {
            let valor = (f[i + 1][j - 1] - f[i][j - 1]) / (x[i + j] - x[i]);
            f[i].push(valor);
        }
    }

    for (let i = 0; i < n; i++) {
        tabla += `<tr><td>${x[i]}</td>`;
        for (let j = 0; j < f[i].length; j++) {
            tabla += `<td>${f[i][j].toFixed(6)}</td>`;
        }
        tabla += '</tr>';
    }

    tabla += '</tbody></table>';
    return tabla;
}

function construirPolinomio(x, y) {
    let n = x.length;
    let coef = [...y];

    for (let j = 1; j < n; j++) {
        for (let i = n - 1; i >= j; i--) {
            coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j]);
        }
    }

    let polinomio = `${coef[0]}`;
    for (let i = 1; i < n; i++) {
        polinomio += ` + (${coef[i]})`;
        for (let j = 0; j < i; j++) {
            polinomio += `*(x - (${x[j]}))`;
        }
    }

    return polinomio;
}

async function mostrarPolinomio(expresion) {
    const polinomioInterpolador = await simplificar(expresion);
    if (polinomioInterpolador) {
        let polinomio = '\\[ P_n(x) = ' + polinomioInterpolador + ' \\]';
        document.getElementById('polinomio').innerText = polinomio;
        MathJax.typesetPromise();
    }
}

async function simplificar(expresion) {
    const encoded = encodeURIComponent(expresion);
    try {
        const res = await fetch(`https://newton.vercel.app/api/v2/simplify/${encoded}`);
        const data = await res.json();
        return data.result;
    } catch (err) {
        console.error(err);
        return expresion;
    }
}

function mostrarError(mensaje) {
    let modal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById('msg-modal').innerHTML = mensaje;
    modal.show();
    setTimeout(() => modal.hide(), 5000);
}

window.addEventListener('load', iniciar);
