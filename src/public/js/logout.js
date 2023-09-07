// LOGICA PARA EL CIERRE DE SESION

document.getElementById('logout').addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/api/auth/logout', {
        method: 'POST'
    })
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
});