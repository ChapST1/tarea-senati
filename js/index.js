import { guardarEnLocalStorage, obtenerDelLocalStorage } from "../utilidades/index.js"

const formularioLogin = document.getElementById("formLogin")

formularioLogin.addEventListener('submit', (evento) => {
  evento.preventDefault()

  const usuarios = obtenerDelLocalStorage("usuarios") ?? []
  const { correo, contraseña } = Object.fromEntries(new FormData(evento.target))
  const esCorrecto = usuarios.find((usuario) => usuario.correo === correo && usuario.contraseña === contraseña)

  if (esCorrecto) {
    alert("credenciales correctas")
    window.location.href = `../../paginas/app/index.html?usuario=${esCorrecto.nombre}&id=${esCorrecto.id}`
    guardarEnLocalStorage("estaLogin", true)
  } else {
    alert("credenciales incorrectas")
  }

})