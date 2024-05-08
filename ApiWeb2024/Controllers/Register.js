import { registerAuth, mensajeA, addUserDetails } from "../Controllers/Firebase.js";

const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

async function register() {
  const cedula = document.getElementById('cedula').value;
  const nombre = document.getElementById('fullname').value;
  const cumpleanos = document.getElementById('birthdate').value;
  const direccion = document.getElementById('address').value;
  const telefono = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const confirmEmail = document.getElementById('confirmEmail').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validar que las contraseñas coincidan
  if (password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres');
    return;
  } else if (!specialCharacters.test(password)) {
    alert('La contraseña debe contener al menos un carácter especial');
    return;
  } else if (email !== confirmEmail) {
    alert('El correo y la confirmación de correo no coinciden');
    return;
  } else if (password !== confirmPassword) {
    alert('La contraseña y la confirmación de contraseña no coinciden');
    return;
  } else {
    try {
      const userCredential = await registerAuth(email, password);
      const user = userCredential.user;

      // Guardar detalles adicionales en Firestore
      await addUserDetails(user.uid, cedula, nombre, cumpleanos, direccion, telefono);

      // Enviar correo de confirmación
      await mensajeA();
      alert('Usuario registrado exitosamente. Por favor, verifica tu correo electrónico.');
      window.location.href = '../Templates/home.html';
    } catch (error) {
      alert('Error en el registro: ' + error.message);
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const save_auth = document.getElementById('btnregister');
  save_auth.addEventListener('click', register);
});
