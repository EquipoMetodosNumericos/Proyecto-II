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
        if (!n || n % 3 !== 0) {
            mostrarError("Debes seleccionar un número de subintervalos múltiplo de 3.");
        } else {
            document.getElementById('step-2').style.display = 'block';
        }

        document.getElementById('siguiente-2').addEventListener('click', () => {
            const a = parseFloat(document.getElementById('a').value);
            const b = parseFloat(document.getElementById('b').value);
            const fx = document.getElementById('funcion').value;

            if (isNaN(a) || isNaN(b) || !fx) {
                mostrarError("Por favor, completa todos los campos correctamente.");
                return;
            }

            const h = (b - a) / n;
            let tabla = `
                <table class="table table-bordered text-center">
                    <thead class="table-dark">
                        <tr><th>\\(i\\)</th><th>\\(x_i\\)</th><th>\\(f(x_i)\\)</th></tr>
                    </thead>
                    <tbody>
            `;

            let fxi = [];

            for (let i = 0; i <= n; i++) {
                const xi = a + i * h;
                const yi = math.evaluate(fx, { x: xi });
                fxi.push(yi);
                tabla += `<tr><td>${i}</td><td>${xi.toFixed(6)}</td><td>${yi.toFixed(6)}</td></tr>`;
            }

            tabla += '</tbody></table>';

            let suma = fxi[0] + fxi[n];
            let sum3 = 0;
            let sum2 = 0;

            for (let i = 1; i < n; i++) {
                if (i % 3 === 0) {
                    sum2 += fxi[i];
                    suma += 2 * fxi[i];
                } else {
                    sum3 += fxi[i];
                    suma += 3 * fxi[i];
                }
            }

            const integral = (3 * h / 8) * suma;

            document.getElementById('step-3').style.display = 'block';
            document.getElementById('tabla-simpson38').innerHTML = tabla;

            document.getElementById('step-4').style.display = 'block';
            document.getElementById('resultado').innerHTML = `\\[
                I \\approx \\frac{3(${h.toFixed(6)})}{8} (${fxi[0].toFixed(6)} + 3(${fxi.filter((_, i) => i % 3 !== 0 && i !== n).map(x => x.toFixed(6)).join(" + ")}) + 2(${fxi.filter((_, i) => i % 3 === 0 && i !== 0 && i !== n).map(x => x.toFixed(6)).join(" + ")}) + ${fxi[n].toFixed(6)}) = ${integral.toFixed(6)}
            \\]`;

            MathJax.typesetPromise();
        });
    });
}

function mostrarError(mensaje) {
    let modal = new bootstrap.Modal(document.getElementById('errorModal'));
    document.getElementById('msg-modal').innerHTML = mensaje;
    modal.show();
    setTimeout(() => modal.hide(), 5000);
}

window.addEventListener('load', iniciar);
