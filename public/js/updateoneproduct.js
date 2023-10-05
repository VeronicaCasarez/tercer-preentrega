//logica para el boton actualizar producto
const updateProductForm = document.getElementById('updateProductForm');
 // Obtener el ID del producto de la ruta


updateProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

   // Obtén la URL actual


// Divide la URL usando "/" como separador
const pid = window.location.pathname.split('/').pop();
console.log(pid)

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const availability = parseInt(document.getElementById('availability').value);

  const updateProducto = {
    name,
    description,
    price,
    category,
    availability,
  };

  // Realiza una solicitud POST al servidor para crear el producto
  try {
    const response = await fetch(`/api/updateproducts/${pid}`,  {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProducto), // Envía los datos como JSON
    });

    if (response.ok) {
        console.log('Producto actualizado con éxito',updateProducto);
        window.location.href = "/api/updateproducts/"; 
       } else {
        console.error('Error al actualizar el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});



