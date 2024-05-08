import { userinfo, logout, Deletuser } from '../Controllers/Firebase.js';

userinfo();

const sesion = document.getElementById('btnlogout');
const borrar = document.getElementById('btnBorrar');

async function cerrarsesion() {
  try {
    await logout();
    alert('Sesión cerrada');
    window.location.href = '../Index.html';
  } catch (error) {
    alert('Error al cerrar sesión');
  }
}

async function BorrarUsuario() {
  try {
    await Deletuser();
    alert('Usuario eliminado');
    window.location.href = '../Index.html';
  } catch (error) {
    alert('Error al eliminar el usuario');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (sesion) {
    sesion.addEventListener('click', cerrarsesion);
  } else {
    console.error("El botón con el ID 'btnlogout' no se encontró en el DOM");
  }

  if (borrar) {
    borrar.addEventListener('click', BorrarUsuario);
  } else {
    console.error("El botón con el ID 'btnBorrar' no se encontró en el DOM");
  }
});
