import { guardarEnLocalStorage, obtenerDelLocalStorage } from "../../../utilidades/index.js"

const formularioRegistrar = document.getElementById("formRegistrar")


formularioRegistrar.addEventListener('submit', (evento) => {
  evento.preventDefault()
  const formDatos = new FormData(evento.target)
  const { nombre, correo, contraseña } = Object.fromEntries(formDatos)
  const otrosUsuarios = obtenerDelLocalStorage("usuarios") ?? []
  const crearId = crypto.randomUUID()

  otrosUsuarios.push({
    id: crearId,
    nombre,
    correo,
    contraseña
  })

  guardarEnLocalStorage("usuarios", otrosUsuarios)
  formularioRegistrar.reset()
  alert("usuario registrado")
  window.location.href = "/index.html"
})


