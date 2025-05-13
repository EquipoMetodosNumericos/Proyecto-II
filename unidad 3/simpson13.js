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
        if (!n || n % 2 !== 0) {
            mostrarError("Debes seleccionar un número par de subintervalos.");
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
            let impares = 0;
            let pares = 0;

            for (let i = 1; i < n; i++) {
                if (i % 2 === 0) {
                    suma += 2 * fxi[i];
                    pares += fxi[i];
                } else {
                    suma += 4 * fxi[i];
                    impares += fxi[i];
                }
            }

            const integral = (h / 3) * suma;

            document.getElementById('step-3').style.display = 'block';
            document.getElementById('tabla-simpson').innerHTML = tabla;

            document.getElementById('step-4').style.display = 'block';
            document.getElementById('resultado').innerHTML = `\\[
                I \\approx \\frac{${h.toFixed(6)}}{3} (${fxi[0].toFixed(6)} + 4(${fxi.filter((_, i) => i % 2 === 1).map(x => x.toFixed(6)).join(" + ")}) + 2(${fxi.filter((_, i) => i % 2 === 0 && i !== 0 && i !== n).map(x => x.toFixed(6)).join(" + ")}) + ${fxi[n].toFixed(6)}) = ${integral.toFixed(6)}
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
