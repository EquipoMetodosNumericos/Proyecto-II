
function iniciar() {
    document.getElementById('step-2').style.display = 'none'
    document.getElementById('step-3').style.display = 'none'
    document.getElementById('step-4').style.display = 'none'

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
            let modal = new bootstrap.Modal(document.getElementById('errorModal'));
            modal.show();

            document.getElementById('msg-modal').innerHTML = 'La cantidad de datos no puede estar vacia'

            setTimeout(() => {
                modal.hide();
            }, 5000);
        }
        else {
            document.getElementById('step-2').style.display = 'block'

            let tablaDatos = document.getElementById('tabla-datos')
            let tabla = '<table class="table table-stripped"><th>\\[n\\]</th><th>\\[x\\]</th><th>\\[f(x)\\]</th>'
            for (i = 0; i < n; i++) {
                tabla += `
                    <tr>
                        <td>
                            ${i}
                        </td>
                        <td>
                            <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="x-${i}" placeholder="0.0" step="any">
                            <label for="x-${i}"></label>
                            </div>
                        </td>
                        <td>
                            <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="y-${i}" placeholder="0.0" step="any">
                            <label for="y-${i}"></label>
                            </div>
                        </td>
                    </tr>
                `
            }
            tabla += '</table>'
            tablaDatos.innerHTML = tabla;
            MathJax.typeset()

            document.getElementById('siguiente-2').addEventListener('click', () => {
                let x = []
                let y = []
                for (let i = 0; i < n; i++) {
                    x.push(parseFloat(document.getElementById(`x-${i}`).value))
                    y.push(parseFloat(document.getElementById(`y-${i}`).value))
                }

                let xRepetidos = new Set(x).size !== x.length;

                if (xRepetidos) {
                    let modal = new bootstrap.Modal(document.getElementById('errorModal'));
                    modal.show();

                    document.getElementById('msg-modal').innerHTML = 'No puedes dar un valor repetido para x'

                    setTimeout(() => {
                        modal.hide();
                    }, 5000);
                }
                else {
                    document.getElementById('step-3').style.display = 'block'
                    const polinomioGeneral = document.getElementById('polinomio-general')

                    let polinomio = '\\['
                    for (let i = 0; i < n; i++) {
                        polinomio += `\\frac{`
                        for (let j = 0; j < n; j++) {
                            if (i != j) {
                                polinomio += `[x - (${x[j]})]`
                            }
                        }
                        polinomio += `}{`
                        for (let k = 0; k < n; k++) {
                            if (i != k) {
                                polinomio += `[${x[i]} - (${x[k]})]`
                            }
                        }
                        polinomio += `} (${y[i]})`

                        if (i != n - 1) {
                            polinomio += '+'
                        }
                    }
                    polinomio += '\\]'

                    let texto = polinomio.replace(/\\\[|\\\]/g, '');

                    texto = texto.replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1)/($2)');

                    texto = texto.replace(/\[/g, '(').replace(/\]/g, ')');

                    polinomioGeneral.innerHTML = polinomio
                    MathJax.typeset()

                    document.getElementById('siguiente-3').addEventListener('click', () => {
                        document.getElementById('step-4').style.display = 'block'
                        document.getElementById('intervalo').innerHTML = `\\[ x \\in [${x[0]},${x[n - 1]}] \\]`

                        mostrarPolinomio(texto)

                        MathJax.typesetPromise()
                    })
                }
            })
        }
    })
}

async function mostrarPolinomio(texto) {
    const polinomioInterpolador = await simplificar(texto);

    if (polinomioInterpolador) {
        console.log(polinomioInterpolador);
        let polinomio = '\\[ P_n (x) ='
        polinomio += polinomioInterpolador
        polinomio += '\\]'

        document.getElementById('polinomio').innerText = polinomio
        MathJax.typesetPromise()

    }
}

async function simplificar(expresion) {
    const expresionCodificada = encodeURIComponent(expresion);

    try {
        const respuesta = await fetch(`https://newton.vercel.app/api/v2/simplify/${expresionCodificada}`);
        const data = await respuesta.json();
        return data.result
    } catch (error) {
        document.getElementById('resultado').innerText = "⚠️ Error al contactar la API.";
        console.error(error);
    }
}

window.addEventListener('load', iniciar)