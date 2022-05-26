//Seleccion de elementos
const form_user = document.forms.userForm;
const { nombre, apellido, usuario, email, hobby, check } = form_user.elements;

form_user.addEventListener('submit', (e) => {
  e.preventDefault();

  const user_info = {
    nombre: nombre.value,
    apellido: apellido.value,
    usuario: usuario.value,
    email: email.value,
    hobby: hobby.value,
    check: check.value,
  };

  localStorage.setItem('Userinfo', JSON.stringify(user_info));

  location.href = './index.html';
});
