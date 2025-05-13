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
            mostrarError("La cantidad de subintervalos no puede estar vacía.");
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

            let suma = 0;
            let fxi = [];

            for (let i = 0; i <= n; i++) {
                const xi = a + i * h;
                let yi = math.evaluate(fx, { x: xi });

                fxi.push(yi);
                tabla += `<tr><td>${i}</td><td>${xi.toFixed(6)}</td><td>${yi.toFixed(6)}</td></tr>`;

                if (i === 0 || i === n) {
                    suma += yi;
                } else {
                    suma += 2 * yi;
                }
            }

            tabla += '</tbody></table>';
            const integral = (h / 2) * suma;

            document.getElementById('step-3').style.display = 'block';
            document.getElementById('tabla-trapecio').innerHTML = tabla;

            document.getElementById('step-4').style.display = 'block';
            document.getElementById('resultado').innerHTML = `\\[
                \\text{Aproximación: } I \\approx \\frac{${h.toFixed(6)}}{2} (${fxi[0].toFixed(6)} + 2(${fxi.slice(1, -1).map(y => y.toFixed(6)).join(" + ")}) + ${fxi[n].toFixed(6)}) = ${integral.toFixed(6)}
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
