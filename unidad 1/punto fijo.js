function iniciarPrograma() {
    document.getElementById('eq-1').style.display = 'none'

    document.getElementById('s1').addEventListener('click', () => {
        document.getElementById('verificacion').style.display = 'none';
        const eq1 = document.getElementById('eq-1');
        eq1.style.display = 'block';
        eq1.scrollIntoView({ behavior: 'smooth' });

        const imgEq = document.getElementById('img-eq');
        imgEq.innerHTML = '<img src="../img/ec-1.png" alt="" srcset="" style="max-width: 50%; max-height: 50%;">'

        const despejes = document.getElementById('despejes')
        despejes.innerHTML = `
            
            <div class="col">
                <input type="radio" name="despejes" id="d1">
                <label for="d1" class="custom-eq w-100 ">
                    \\[
                    x = x - \\frac{x^3 + x - 6}{7}
                    \\]
                </label>
            </div>
            <div class="col">
                <input type="radio" name="despejes" id="d2">
                <label for="d2" class="custom-eq w-100">
                    \\[
                    x = \\sqrt[3]{6 - x}
                    \\]
                </label>
            </div>`;
        MathJax.typesetPromise();


        const d1 = document.getElementById('d1')
        const d2 = document.getElementById('d2')
        d1.addEventListener('click', () => {

            const x = parseFloat(document.getElementById('x').value);
            const y = parseFloat(document.getElementById('y').value);

            const x_m = (x + y) / 2;

            const ecEva1 = math.abs(1 - (3 * (x_m ** 2) + 1) / 7)
            console.log(ecEva1);

            if (isNaN(x) || isNaN(y)) {
                let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else if (ecEva1 > 1) {

                let msg = document.getElementById('msg');
                msg.innerHTML = `El valor hace que \\[|g´(x)|=${(ecEva1).toFixed(4)}>1\\]`
                let modal = new bootstrap.Modal(document.getElementById('modal-mayor'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else {
                const verificacion = document.getElementById('verificacion')

                verificacion.innerHTML = `
                    <h2>Primer despeje:</h2>
                    <p>
                        \\[
                        g_1(x) = x - \\frac{x^3 + x - 6}{7}
                        \\]
                        Derivada:
                        \\[
                        g_1'(x) = 1 - \\frac{3x^2 + 1}{7}
                        \\]
                        Evaluando en \\( x = ${(x_m).toFixed(4)} \\):
                        
                        \\[
                        \\left| g_1'(${(x_m).toFixed(4)}) \\right| = ${(ecEva1).toFixed(4)} < 1
                        \\Rightarrow \\text{Converge}
                        \\]
                    </p>
                `

                verificacion.style.display = 'block'
                resolver(x_m, 'ec1');
            }
            MathJax.typesetPromise();

        })
        d2.addEventListener('click', () => {
            const x = parseFloat(document.getElementById('x').value);
            const y = parseFloat(document.getElementById('y').value);

            const x_m = (x + y) / 2;

            const ecEva1 = math.abs(-1 / 3 * (6 - x_m) ** (-2 / 3))
            console.log(ecEva1);

            if (isNaN(x) || isNaN(y)) {
                let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else if (ecEva1 > 1 || isNaN(ecEva1)) {
                if (ecEva1 > 1) {
                    let msg = document.getElementById('msg');
                    msg.innerHTML = `El valor hace que \\[|g´(x)|=${(ecEva1).toFixed(4)}>1\\]`
                }
                else if (isNaN(ecEva1)) {
                    let msg = document.getElementById('msg');
                    msg.innerHTML = `El valor no es proporcionado no es adecuado.`
                }
                let modal = new bootstrap.Modal(document.getElementById('modal-mayor'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);

            }
            else {
                const verificacion = document.getElementById('verificacion')
                verificacion.innerHTML = `
                    <h2>Segundo despeje:</h2>
                    <p>
                        \\[
                        g_1(x) = \\sqrt[3]{6-x}
                        \\]
                        Derivada:
                        \\[
                        g_1'(x) = \\frac{1}{3(6-x)^{-\\frac{2}{3}}}
                        \\]
                        Evaluando en \\( x = ${(x_m).toFixed(4)} \\):
                        
                        \\[
                        \\left| g_1'(${(x_m).toFixed(4)}) \\right| = ${(ecEva1).toFixed(4)} < 1
                        \\Rightarrow \\text{Converge}
                        \\]
                    </p>
                `
                verificacion.style.display = 'block'
                resolver(x_m, 'ec2');
            }
            MathJax.typesetPromise();

        })

    })
    document.getElementById('s2').addEventListener('click', () => {
        document.getElementById('verificacion').style.display = 'none';
        const eq1 = document.getElementById('eq-1');
        eq1.style.display = 'block';

        eq1.scrollIntoView({ behavior: 'smooth' });

        const imgEq = document.getElementById('img-eq');
        imgEq.innerHTML = '<img src="../img/ec-2.png" alt="" srcset="" style="max-width: 50%; max-height: 50%;">'

        const despejes = document.getElementById('despejes')
        despejes.innerHTML = `
        <div class="col">
                <input type="radio" name="despejes" id="d1">
                <label for="d1" class="custom-eq w-100 ">
                    \\[
                    x = e^{-x}
                    \\]
                </label>
            </div>
            <div class="col">
                <input type="radio" name="despejes" id="d2">
                <label for="d2" class="custom-eq w-100">
                    \\[
                    x = \\frac{1}{2}(x + e^{-x})
                    \\]
                </label>
            </div>`;

        MathJax.typesetPromise();

        const d1 = document.getElementById('d1')
        const d2 = document.getElementById('d2')
        d1.addEventListener('click', () => {

            const x = parseFloat(document.getElementById('x').value);
            const y = parseFloat(document.getElementById('y').value);

            const x_m = (x + y) / 2;

            const ecEva1 = math.abs(math.e ** (-x_m))
            console.log(ecEva1);

            if (isNaN(x) || isNaN(y)) {
                let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else if (ecEva1 > 1) {

                let msg = document.getElementById('msg');
                msg.innerHTML = `El valor hace que \\[|g´(x)|=${(ecEva1).toFixed(4)}>1\\]`
                let modal = new bootstrap.Modal(document.getElementById('modal-mayor'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else {
                const verificacion = document.getElementById('verificacion')

                verificacion.innerHTML = `
                    <h2>Primer despeje:</h2>
                    <p>
                        \\[
                        g(x) = e^{-x}
                        \\]
                        Derivada:
                        \\[
                        g'(x) = -e^{-x}
                        \\]
                        Evaluando en \\( x = ${(x_m).toFixed(4)} \\):
                        
                        \\[
                        \\left| g_1'(${(x_m).toFixed(4)}) \\right| = ${(ecEva1).toFixed(4)} < 1
                        \\Rightarrow \\text{Converge}
                        \\]
                    </p>
                `

                verificacion.style.display = 'block'

                resolver(x_m, 'ec3');
            }
            MathJax.typesetPromise();

        })
        d2.addEventListener('click', () => {
            const x = parseFloat(document.getElementById('x').value);
            const y = parseFloat(document.getElementById('y').value);

            const x_m = (x + y) / 2;

            const ecEva1 = math.abs(1 / 2 * (x_m + math.e ** (-x_m)))
            console.log(ecEva1);

            if (isNaN(x) || isNaN(y)) {
                let modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);
            }
            else if (ecEva1 > 1 || isNaN(ecEva1)) {
                if (ecEva1 > 1) {
                    let msg = document.getElementById('msg');
                    msg.innerHTML = `El valor hace que \\[|g´(x)|=${(ecEva1).toFixed(4)}>1\\]`
                }
                else if (isNaN(ecEva1)) {
                    let msg = document.getElementById('msg');
                    msg.innerHTML = `El valor no es proporcionado no es adecuado.`
                }
                let modal = new bootstrap.Modal(document.getElementById('modal-mayor'));
                modal.show();

                setTimeout(() => {
                    modal.hide();
                }, 6000);

            }
            else {
                const verificacion = document.getElementById('verificacion')
                verificacion.innerHTML = `
                    <h2>Segundo despeje:</h2>
                    <p>
                        \\[
                        g(x) = \\frac{1}{2}(x+e^{-x})
                        \\]
                        Derivada:
                        \\[
                        g'(x) = \\frac{1-e^{-x}}{2}
                        \\]
                        Evaluando en \\( x = ${(x_m).toFixed(4)} \\):
                        
                        \\[
                        \\left| g'(${(x_m).toFixed(4)}) \\right| = ${(ecEva1).toFixed(4)} < 1
                        \\Rightarrow \\text{Converge}
                        \\]
                    </p>
                `
                verificacion.style.display = 'block'

                resolver(x_m, 'ec4');
            }
            MathJax.typesetPromise();
        })
    })
}

function resolver(x0, ecuacion) {
    const tol = 1e-6;
    const maxIter = 100;
    let iter = 0;
    let x1;
    let output = `<table class=" table table-stripped"><th>Iteración</th><th>\\[ x_n \\]</th><th></th>`;

    do {
        x1 = g(x0, ecuacion);
        output += `<tr> <td> ${iter + 1} </td> <td> ${x1.toFixed(6)}\n </td>  </tr>`;
        if (Math.abs(x1 - x0) < tol) break;
        x0 = x1;
        iter++;
    } while (iter < maxIter);

    output += `</table> <br> <br> Aproximación final: x ≈ ${x1.toFixed(6)}`;
    document.getElementById("resultado").innerHTML = output;
}

function g(x,ecuacion){
    if(ecuacion=='ec1'){
        return x-(x**3+x-6)/7
    }
    else if(ecuacion=='ec2'){
        return math.cbrt(6-x)
    }
    else if(ecuacion=='ec3'){
        return math.e ** (-x)
    }
    
    else if(ecuacion=='ec4'){
        return 1/2 * (x+ math.e **(-x))
    }
    
}

window.addEventListener('load', iniciarPrograma)