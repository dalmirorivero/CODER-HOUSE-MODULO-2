// LOGICA PARA EL REGISTRO

document.getElementById('register').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-type' : 'application/json' },
        body: JSON.stringify({ name, mail, password })
      });     

      const data = await response.json();
  
      if (response.status === 201) {
        alert (data.message);
        window.location.href = '/api/products';
      } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.message);
      }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to register user');
      }     
  });