import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  deleteUser
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

import {
  getFirestore,
  collection,
  addDoc
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC4s3SZASerJgs_mY-RWVJt8atAqhnLbfo",
  authDomain: "apiweb2024wbt.firebaseapp.com",
  projectId: "apiweb2024wbt",
  storageBucket: "apiweb2024wbt.appspot.com",
  messagingSenderId: "250763717888",
  appId: "1:250763717888:web:98d8356e0d87c8696a97e5",
  measurementId: "G-3NSDW7E82N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export const loginvalidation = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export function see() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href = "index.html";
    }
  });
}

// Crear nuevo usuario
export const registerAuth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Iniciar sesión con Google
export const loginGoogle = () => signInWithPopup(auth, providerGoogle);

// Enviar correo de confirmación
export const mensajeA = () => sendEmailVerification(auth.currentUser);

// Enviar correo para restablecer contraseña
export const cambiar = (email) => sendPasswordResetEmail(auth, email);

// Iniciar sesión con Facebook
export const loginFacebook = () => signInWithPopup(auth, providerFacebook);

// Eliminar usuario
export function Deletuser() {
  const user = auth.currentUser;
  deleteUser(user)
    .then(() => {
      // Usuario eliminado
    })
    .catch((error) => {
      alert('Error al eliminar el usuario: ' + error.message);
    });
}
//google
export const popup = () => {
  return signInWithPopup(auth, providerGoogle)
      .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          return user; // Devolver el usuario después de iniciar sesión
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          throw error; // Re-lanzar el error para manejarlo en el código que llama a esta función
      });
};

// Guardar datos adicionales en Firestore
export async function addUserDetails(uid, cedula, nombre, cumpleanos, direccion, telefono) {
  try {
    await addDoc(collection(db, "users"), {
      uid,
      cedula,
      nombre,
      cumpleanos,
      direccion,
      telefono
    });
    console.log("Datos adicionales guardados en Firestore");
  } catch (error) {
    console.error("Error al guardar los datos en Firestore:", error);
  }
}
