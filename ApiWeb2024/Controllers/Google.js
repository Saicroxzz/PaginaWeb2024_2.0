import { popup } from "../Controllers/Firebase.js";

const google = document.getElementById("btngoogle");

async function log_google() {
    try {
        const verification = await popup();
        if (verification != null) {
            alert("Usuario autenticado: " + verification.email);
            window.location.href = "Templates/home.html";
        } else {
            console.log("Sesión no validada");
            alert("Error de usuario, verifique usuario y/o contraseña.");
        }
    } catch (error) {
        console.error("Error al autenticar:", error);
        if (error.code === "auth/popup-closed-by-user") {
            // El usuario cerró la ventana de inicio de sesión
            alert("Iniciar sesión con Google cancelado.");
        } else {
            alert("Error de autenticación. Verifica la consola para más detalles.");
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
  google.addEventListener('click', async (e) => {
        console.log("login google");
        e.preventDefault(); 
        await log_google();
    });
});