//LOGICA PARA EL BOTON IR AL CARRITO
// document.addEventListener("DOMContentLoaded", () => {
//   const btnIrAlCarrito = document.querySelector(".btn-ir-al-carrito");

//   if (btnIrAlCarrito) {
//     btnIrAlCarrito.addEventListener("click", (event) => {
//       event.preventDefault();

//       // Obtener el valor de la cookie 
//       const cartId = getCartIdFromCookie();

//       if (cartId) {
//         // Redirigir al usuario al carrito utilizando el cartId
//         window.location.href = `/api/carts/${cartId}`;
//       } else {
//         // Manejar el caso en que la cookie "cartId" no existe
//         console.error("La cookie 'cartId' no se encuentra definida.");
//         // Puedes mostrar un mensaje de error o redirigir a una página predeterminada
//       }
//     });
//   }
// });


// // Función para obtener el ID del carrito desde la cookie de usuario logeado
// function getCartIdFromCookie() {
//   const userDataCookie = document.cookie
   
//   if (userDataCookie) {
//     try {
//       const jwtToken = userDataCookie.split('=')[1];
//       const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
      
    
//       if (decodedToken.cart) {
//         return decodedToken.cart;
//       }
//     } catch (error) {
//       console.error('Error al decodificar el token JWT:', error);
//     }
//   }

//   return null; // Si no se encuentra la cookie o el ID del carrito en el token JWT
// }


// if (cartId !== null) {
//   console.log('ID del carrito:', cartId);
// } else {
//   console.log('No se pudo obtener el ID del carrito desde la cookie de usuario logeado.');
// }




// document.querySelectorAll('.cart-button').forEach(button => {
// button.addEventListener('click',  async (event) => {
//        const cartId= event.target.id;
//    try {
//       const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       // Maneja la respuesta de la API
//       if (response.ok) {
//         window.location.href = `http://localhost:8080/api/carts/${cartId}`;
//       } else {
//         throw new Error('Error al ir al carrito');
//       }
//     } catch (error) {
//       alert(error.message);
//     }
    
//   });
//   });


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
