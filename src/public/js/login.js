// LOGICA PARA EL INICIO DE SESION

document.getElementById('login').addEventListener('click', async (event) => {
    event.preventDefault();

    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/auth/passport/login', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ mail, password })
      });     
  
      const data = await response.json();

      if (response.ok) {
        if (data) {
        console.log(data)
        //localStorage.setItem('token', data.token)
        alert (data.message);  
        window.location.href = '/api/products'; 
        } else {
          alert ('Login failed');
        }
        } else {
          alert ('Request failed');
        }
      } catch (error) {
        console.log(error);
        alert ('Request failed');
      }
    });