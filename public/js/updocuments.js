// // formulario de carga de avatar
// const avatarForm = document.querySelector('#avatarForm');

// avatarForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const formData = new FormData(avatarForm);
//   const userId = event.target.id;
//   const uploadUrl = `/api/users/${userId}/upload-avatar`;

//   try {
//     const response = await fetch(uploadUrl, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Error al subir el avatar');
//     }

//     // Manejar la respuesta si es necesario
//     console.log('Avatar cargado correctamente');
//   } catch (error) {
//     console.error('Error:', error);
//     alert('Hubo un error al subir el avatar');
//   }
// });

// // Obtener el formulario de carga de documentos
// const documentForm = document.querySelector('#documentForm');

// documentForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const formData = new FormData(documentForm);
//   const uploadDocumentUrl = '/upload'; // Ajustar la URL de carga de documentos

//   try {
//     const response = await fetch(uploadDocumentUrl, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Error al subir el documento');
//     }

//     // Manejar la respuesta si es necesario
//     console.log('Documento cargado correctamente');
//   } catch (error) {
//     console.error('Error:', error);
//     alert('Hubo un error al subir el documento');
//   }
// });

//LOGICA PARA BOTON IR A  CARGAR DOCUMENTOS
// document.querySelectorAll('.go-to-up-document').forEach(button => {
//     button.addEventListener('click', moveToUpDocument);
//   });
  
//   function moveToUpDocument(event) {
//     event.preventDefault();
  
//     const userId = event.target.id;
//     console.log("aca-",userId)
   
//     fetch(`/api/users/${userId}/documents`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       if (response.ok) {

//         window.location.href = `/api/users/${userId}/documents`;
//       } else {
//         // Manejar errores aquí
//         throw new Error('Error al ir a subir documentos');
//       }
//     })
//     .catch(error => {
//       alert(error.message);
//     });
//   }