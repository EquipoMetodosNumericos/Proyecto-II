function iniciarPrograma() {
    const fecha = new Date();
    const dia = fecha.getDate();        
    const mes = fecha.getMonth() + 1;    
    const año = fecha.getFullYear();     

    document.getElementById('fecha').innerHTML = `${dia}/${mes}/${año}`


    document.getElementById('qr-code').style.display = 'none'
    document.getElementById('qr').addEventListener('click', function () {
        document.getElementById('qr-code').style.display = 'block'
    })
    document.getElementById('c-qr').addEventListener('click', function () {
        document.getElementById('qr-code').style.display = 'none'
    })
}
window.addEventListener('load', iniciarPrograma)