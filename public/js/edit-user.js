// LOGICA PARA EL BOTON IR CAMBIAR ROL
document.querySelectorAll('.change-role-button').forEach(button => {
  button.addEventListener('click', moveToChangeRole);
});
function moveToChangeRole(event) {
  event.preventDefault();

  const userId = event.target.id;


  fetch(`/api/users/premium/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

  })
  .then(response => {
    if (response.ok) {
      // Redirigir al carrito si la respuesta es exitosa
      window.location.href = `/api/users/premium/${userId}`;
    } else {
      // Manejar errores aquí
      throw new Error('Error al ir a modificar rol');
    }
  })
  .catch(error => {
    alert(error.message);
  });
}

//LOGICA PARA EL FORMULARIO CAMBIAR ROL
const changeUserForm = document.getElementById('update-role-user-form');

changeUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obtiene el valor seleccionado en el menú desplegable
  const newRole = document.getElementById('newRole').value.toString();

  // Obtiene el correo electrónico del usuario a través del campo de entrada
  const userEmail = document.getElementById('userEmail').value;

  // Realiza una solicitud GET para obtener el ID del usuario por correo electrónico
  try {
    const response = await fetch(`/api/users/byemail/${userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Obtiene el ID del usuario desde la respuesta
      const userId = await response.json();

      // Realiza una solicitud POST para actualizar el rol del usuario por ID
      const updateResponse = await fetch(`/api/users/premium/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newRole }), // Envía el nuevo rol como JSON
      });

      if (updateResponse.ok) {
        console.log('Rol de usuario actualizado con éxito', newRole);
        
        // Borra los campos de entrada estableciendo sus valores en cadena vacía
        document.getElementById('newRole').value = '';
        document.getElementById('userEmail').value = '';
      } else {
        console.error('Error al actualizar el rol del usuario:', updateResponse.statusText);
      }
    } else {
      console.error('Error al obtener el ID del usuario:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});

//LOGICA PARA QUE EL ADMINISTRADOR ELIMINE UN USUARIO
document.querySelectorAll('.button-delete-user').forEach(button => {
  button.addEventListener('click', deleteUser);
});

  function deleteUser(event) {
  event.preventDefault();
  const uid = event.target.id;
  
  fetch(`/api/users/${uid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log("Usuario eliminado");
    window.location.reload();
  })
  .catch(error => {
    console.log('Error:', error);
  });
}