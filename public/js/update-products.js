//logica para crear producto
const createProductForm = document.getElementById("createProductForm");

createProductForm &&
  createProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value;
    const availability = parseInt(document.getElementById("availability").value);

    // Obtiene el ID del usuario desde el botón
    const ownerId = document.getElementById("createProductButton").getAttribute("data-user-id");
 console.log(ownerId)
    const nuevoProducto = {
      name,
      description,
      price,
      category,
      availability,
      owner: ownerId, // Establece el ID del usuario como el valor de 'owner'
    };


    // Realiza una solicitud POST al servidor para crear el producto
    try {
      const response = await fetch("/api/updateproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto), // Envía los datos como JSON
      });

      if (response.ok) {
        console.log("Producto creado con éxito");
        window.location.href = "/api/updateproducts";
      } else {
        console.error("Error al crear el producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });

//logica para eliminar un producto
document.querySelectorAll(".button-delete-product").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const productId = event.target.id;

    try {
      const response = await fetch(
        `/api/updateproducts/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // El producto se eliminó con éxito
        console.log("Producto eliminado con éxito");
        location.reload(); // Recarga la página actual
      } else {
        console.error("Error al eliminar el producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  });
});

//logica para ir a actualizar un producto
document.querySelectorAll(".button-to-update-product").forEach((button) => {
  button.addEventListener("click", moveToUpdateProduct);
});

function moveToUpdateProduct(event) {
  event.preventDefault();

  const productId = event.target.id;

  fetch(`/api/updateproducts/${productId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Redirigir a actualizar producto si la respuesta es exitosa
        window.location.href = `/api/updateproducts/${productId}`;
      } else {
        // Manejar errores aquí
        throw new Error("Error al ir a actualizar prodcuto");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}
//**********************
