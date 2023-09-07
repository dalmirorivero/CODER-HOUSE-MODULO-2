// LOGICA PARA EL INICIO DE SESION

document.getElementById('login').addEventListener('click', async (event) => {
    event.preventDefault();

    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ mail, password })
      });     
  
      const data = await response.json();

      if (response.ok) {
        if (data.session) {
        alert (data.message);  
        window.location.href = '/api/products'; 
        } else {
          alert ('Inicio de sesión fallido.');
        }
        } else {
          alert ('Error en la solicitud.');
        }
      } catch (error) {
        console.log(error);
        alert ('Error en la solicitud.');
      }
    });