// LOGICA PARA EL BOTON IR AL CARRITO
document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', moveToCart);
  });
  
  function moveToCart(event) {
    event.preventDefault();
  
    const cartId = event.target.id;
   
    fetch(`/api/carts/${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Redirigir al carrito si la respuesta es exitosa
        window.location.href = `/api/carts/${cartId}`;
      } else {
        // Manejar errores aquí
        throw new Error('Error al ir al carrito');
      }
    })
    .catch(error => {
      alert(error.message);
    });
  }
  
