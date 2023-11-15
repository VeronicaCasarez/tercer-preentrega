//LOGICA PARA BOTON IR A  CARGAR DOCUMENTOS
document.querySelectorAll('.go-to-up-document').forEach(button => {
    button.addEventListener('click', moveToUpDocument);
  });
  
  function moveToUpDocument(event) {
    event.preventDefault();
  
    const userId = event.target.id;
    console.log("aca-",userId)
   
    fetch(`/api/users/${userId}/documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {

        window.location.href = `/api/users/${userId}/documents`;
      } else {
        // Manejar errores aquí
        throw new Error('Error al ir a subir documentos');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }