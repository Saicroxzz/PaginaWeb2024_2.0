import { cambiar } from '../Controllers/Firebase.js'

const recover = document.getElementById('Resetear')

async function Resetear() {
  const email = document.getElementById('correo').value

  const verificar = cambiar(email)
  const validation = await verificar

    .then(() => {
      alert('resert password seccesfull' + email)
      window.location.href = '../Index.html'
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}

window.addEventListener('DOMContentLoaded', async () => {
  recover.addEventListener('click', Resetear)
})