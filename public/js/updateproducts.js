//logica para crear producto
const createProductForm = document.getElementById('createProductForm');

createProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;
  const availability = parseInt(document.getElementById('availability').value);

  const nuevoProducto = {
    name,
    description,
    price,
    category,
    availability,
  };

  // Realiza una solicitud POST al servidor para crear el producto
  try {
    const response = await fetch('/updateproducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto), // Envía los datos como JSON
    });

    if (response.ok) {
        console.log('Producto creado con éxito');
        window.location.href = "/updateproducts"; 
       } else {
        console.error('Error al crear el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});


//logica para eliminar un producto

document.querySelectorAll('.deleteProductButton').forEach(button => {
button.addEventListener('click',  async (event) => {
        const productId = event.target.id;

        try {
            const response = await fetch(`http://localhost:8080/api/updateproducts/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  }
                });
         

            if (response.ok) {
                // El producto se eliminó con éxito
                console.log('Producto eliminado con éxito');
                location.reload(); // Recarga la página actual
            } else {
                
                console.error('Error al eliminar el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    });
});
