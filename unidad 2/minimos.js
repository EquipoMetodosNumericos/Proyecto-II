function iniciar() {
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'none';

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
            let tabla = '<table class="table table-striped"><th>\\[n\\]</th><th>\\[x\\]</th><th>\\[y\\]</th>';
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

                if (x.includes(NaN) || y.includes(NaN)) {
                    mostrarError('Todos los valores deben ser numéricos');
                } else {
                    const { tabla, ecuacion } = calcularTablaMinimos(x, y);
                    document.getElementById('step-3').style.display = 'block';
                    document.getElementById('tabla-calculos').innerHTML = tabla;
                    document.getElementById('step-4').style.display = 'block';
                    document.getElementById('resultado').innerHTML = ecuacion;
                    MathJax.typesetPromise();
                }
            });

        }
    });
}

function calcularTablaMinimos(x, y) {
    const n = x.length;
    let sumX = 0, sumY = 0, sumX2 = 0, sumXY = 0;
    let tabla = `
        <table class="table table-bordered text-center">
            <thead class="table-dark">
                <tr>
                    <th>\\(x_i\\)</th>
                    <th>\\(y_i\\)</th>
                    <th>\\(x_i^2\\)</th>
                    <th>\\(x_i y_i\\)</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < n; i++) {
        const xi = x[i];
        const yi = y[i];
        const xi2 = xi * xi;
        const xiyi = xi * yi;

        sumX += xi;
        sumY += yi;
        sumX2 += xi2;
        sumXY += xiyi;

        tabla += `
            <tr>
                <td>${xi.toFixed(4)}</td>
                <td>${yi.toFixed(4)}</td>
                <td>${xi2.toFixed(4)}</td>
                <td>${xiyi.toFixed(4)}</td>
            </tr>
        `;
    }

    tabla += `
        <tr class="table-primary fw-bold">
            <td>\\(\\sum x_i = ${sumX.toFixed(4)}\\)</td>
            <td>\\(\\sum y_i = ${sumY.toFixed(4)}\\)</td>
            <td>\\(\\sum x_i^2 = ${sumX2.toFixed(4)}\\)</td>
            <td>\\(\\sum x_i y_i = ${sumXY.toFixed(4)}\\)</td>
        </tr>
        </tbody></table>
    `;

    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - a * sumX) / n;

    return {
        tabla,
        ecuacion: `\\[ y = ${a.toFixed(6)}x + ${b.toFixed(6)} \\]`
    };
}


function mostrarError(mensaje) {
    let modal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById('msg-modal').innerHTML = mensaje;
    modal.show();
    setTimeout(() => modal.hide(), 5000);
}

window.addEventListener('load', iniciar);
