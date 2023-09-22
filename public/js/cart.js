
// Lógica para mostrar el carrito
document.querySelectorAll('.cart-button').forEach(button => {
button.addEventListener('click',  async (event) => {
       const productId = event.target.id;
   try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Maneja la respuesta de la API
      if (response.ok) {
        window.location.href = `http://localhost:8080/api/carts/${cartId}`;
      } else {
        throw new Error('Error al ir al carrito');
      }
    } catch (error) {
      alert(error.message);
    }
    
  });
  });


// // Obtener el contenedor donde se mostrará el carrito seleccionado
// const cartContainer = document.getElementById('cart-container');

// // Obtener el id del carrito seleccionado de la URL 
// const selectedCartId = window.location.pathname.split('/').pop();

// // Realizar una solicitud al servidor para obtener los detalles del carrito seleccionado
// fetch(`/api/carts/${selectedCartId}`)
//   .then(response => response.json())
//   .then(data => {
//     if (data.message === 'Listado de carritos') {
//       const cartData = data.data;
//       renderCart(cartData);
//     }
//   })
//   .catch(error => console.error('Error al obtener los detalles del carrito:', error));

// // Función para renderizar el carrito seleccionado en la vista
// function renderCart(cartData) {
//   const cartList = document.getElementById('cart-list');
//   if (cartList) {
//     const cartItems = cartData.products.map(product => {
//       return `<li>${product.productId.name} - Cantidad: ${product.quantity}</li>`;
//     });
//     cartList.innerHTML = cartItems.join('');
//   }
// }
