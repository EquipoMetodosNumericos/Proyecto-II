function iniciarPrograma(){
    document.getElementById('qr-code').style.display='none'
    document.getElementById('qr').addEventListener('click',function(){
        document.getElementById('qr-code').style.display='block'
    })
    document.getElementById('c-qr').addEventListener('click',function(){
        document.getElementById('qr-code').style.display='none'
    })
}
window.addEventListener('load',iniciarPrograma)