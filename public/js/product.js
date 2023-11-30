// function renderPagination(data) {
//     const paginationDiv = document.getElementById('pagination');
//     paginationDiv.innerHTML = '';
//     if (data.hasPrevPage) {
//       const prevLink = document.createElement('a');
//       prevLink.href = data.prevLink;
//       prevLink.textContent = 'Previous Page';
//       paginationDiv.appendChild(prevLink);
//     }
//     if (data.hasNextPage) {
//       const nextLink = document.createElement('a');
//       nextLink.href = data.nextLink;
//       nextLink.textContent = 'Next Page';
//       paginationDiv.appendChild(nextLink);
//     }
//   }

     // Lógica para agregar un producto al carrito
  document.querySelectorAll('.button-add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });

    function addToCart(event) {
    event.preventDefault();
    const cid = event.target.getAttribute("data-cart-id"); 
    const pid = event.target.id;
    
    fetch(`/api/carts/${cid}/product/${pid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log("producto agregado al carrito"))
    .catch(error => {
      console.log('Error:', error);
    });
  }
  
    

   // Lógica para mostrar los detalles del producto
document.querySelectorAll('.view-details-button').forEach(button => {
  button.addEventListener('click',  async (event) => {
     const productId = event.target.id;
 try {
    const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Maneja la respuesta de la API
    if (response.ok) {
      window.location.href = `http://localhost:8080/api/products/${productId}`;
    } else {
      throw new Error('Error al ir al detalle');
    }
  } catch (error) {
    alert(error.message);
  }
  
});
});