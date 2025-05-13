function iniciarPrograma() {

    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);

    if (fileName === 'unidad1.html') {
        document.getElementById('menu').style.display = 'none'
        document.getElementById('section-punto-fijo').style.display = 'none'
        document.getElementById('section-newton').style.display = 'none'
        document.getElementById('menu-punto-fijo').style.display = 'none'
        document.getElementById('siguiente').addEventListener('click', () => {
            document.getElementById('introduccion').style.display = 'none'
            document.getElementById('menu').style.display = 'block'
        })
        document.getElementById('volver').addEventListener('click', () => {
            document.getElementById('introduccion').style.display = 'block'
            document.getElementById('menu').style.display = 'none'
        })
        document.getElementById('punto-fijo').addEventListener('click', () => {
            document.getElementById('menu').style.display = 'none'
            document.getElementById('section-punto-fijo').style.display = 'block'
        })
        document.getElementById('newton').addEventListener('click', () => {
            document.getElementById('menu').style.display = 'none'
            document.getElementById('section-newton').style.display = 'block'
        })
        document.getElementById('volver-menu').addEventListener('click', () => {
            document.getElementById('menu').style.display = 'block'
            document.getElementById('section-punto-fijo').style.display = 'none'
            document.getElementById('section-newton').style.display = 'none'
        })
        document.getElementById('siguiente-mpf').addEventListener('click', () => {
            document.getElementById('menu-punto-fijo').style.display = 'block'
            document.getElementById('section-punto-fijo').style.display = 'none'
        })
        document.getElementById('volver-mpf').addEventListener('click', () => {
            document.getElementById('menu-punto-fijo').style.display = 'none'
            document.getElementById('section-punto-fijo').style.display = 'block'
        })
        document.getElementById('una-ecuacion-punto-fijo').addEventListener('click', () => {
            window.location.href = './punto-fijo-1.html'
        })
        document.getElementById('sistema-punto-fijo').addEventListener('click', () => {
            window.location.href = './punto-fijo.html'
        })
    }

    else if (fileName === 'unidad2.html') {
        // Ocultar menú al inicio
        document.getElementById('menu').style.display = 'none';

        // Botón SIGUIENTE muestra menú
        document.getElementById('siguiente').addEventListener('click', () => {
            document.getElementById('introduccion').style.display = 'none';
            document.getElementById('menu').style.display = 'block';
        });
        // Botón VOLVER regresa a introducción
        document.getElementById('volver').addEventListener('click', () => {
            document.getElementById('menu').style.display = 'none';
            document.getElementById('introduccion').style.display = 'block';
        });
        // Inicializar secciones de métodos ocultas
        const metodos = document.querySelectorAll('.metodo');
        metodos.forEach(metodo => metodo.style.display = 'none');

        // Función para mostrar un método
        window.mostrarMetodo = function (id) {
            metodos.forEach(metodo => metodo.style.display = 'none');
            const seccionActiva = document.getElementById(id);
            if (seccionActiva) {
                seccionActiva.style.display = 'block';
                window.scrollTo({ top: seccionActiva.offsetTop - 100, behavior: 'smooth' });
            }
        };
    }

    else if (fileName === 'unidad3.html') {
        // Ocultar menú al inicio
        document.getElementById('menu').style.display = 'none';

        // Botón SIGUIENTE muestra menú
        document.getElementById('siguiente').addEventListener('click', () => {
            document.getElementById('introduccion').style.display = 'none';
            document.getElementById('menu').style.display = 'block';
        });

        // Botón VOLVER regresa a introducción
        document.getElementById('volver').addEventListener('click', () => {
            document.getElementById('menu').style.display = 'none';
            document.getElementById('introduccion').style.display = 'block';
        });

        // Inicializar secciones de métodos ocultas
        const metodos = document.querySelectorAll('.metodo');
        metodos.forEach(metodo => metodo.style.display = 'none');

        // Función para mostrar un método
        window.mostrarMetodo = function (id) {
            metodos.forEach(metodo => metodo.style.display = 'none');
            const seccionActiva = document.getElementById(id);
            if (seccionActiva) {
                seccionActiva.style.display = 'block';
                window.scrollTo({ top: seccionActiva.offsetTop - 100, behavior: 'smooth' });
            }
        };

        // Configurar botones de métodos específicos
        document.getElementById('trapecio').addEventListener('click', () => {
            mostrarMetodo('trapecio');
        });

        document.getElementById('simpson13').addEventListener('click', () => {
            mostrarMetodo('simpson13');
        });

        document.getElementById('simpson38').addEventListener('click', () => {
            mostrarMetodo('simpson38');
        });

        // Configurar botones de navegación a páginas específicas
        document.getElementById('btn-trapecio').addEventListener('click', () => {
            window.location.href = './trapecio.html';
        });

        document.getElementById('btn-simpson13').addEventListener('click', () => {
            window.location.href = './simpson13.html';
        });

        document.getElementById('btn-simpson38').addEventListener('click', () => {
            window.location.href = './simpson38.html';
        });
    }
    else if (fileName === 'introduccion.html') {
        console.log('hola')
        let modalU1 = new bootstrap.Modal(document.getElementById('modal-unidad-1'))
        let modalU2 = new bootstrap.Modal(document.getElementById('modal-unidad-2'))
        let modalU3 = new bootstrap.Modal(document.getElementById('modal-unidad-3'))

        document.getElementById('btn-unidad-1').addEventListener('click', () => {
            modalU1.show()
        })
        document.getElementById('btn-unidad-2').addEventListener('click', () => {
            modalU2.show()
        })
        document.getElementById('btn-unidad-3').addEventListener('click', () => {
            modalU3.show()
        })
    }
}

window.addEventListener('load', iniciarPrograma);