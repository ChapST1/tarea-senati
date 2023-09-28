import { guardarEnLocalStorage, obtenerDelLocalStorage, obtenerParametrosDeBusqueda } from "../../../utilidades/index.js"

const $nombreDeUsuario = document.querySelectorAll("#nombreUsuario")
const $modalCrearDocente = document.querySelector("#modalCrearDocente")
const $abrirModalCrearDocente = document.querySelector("#abrirModalCrearDocente")
const $btnCerrarSesion = document.getElementById("btnCerrarSesion")

window.addEventListener('load', () => {
  const usuarioEstaLogin = obtenerDelLocalStorage("estaLogin")
  if (!usuarioEstaLogin) window.location.href = "/index.html"
  crearDocente()
  crearTablaDocentes()


  $nombreDeUsuario.forEach((item) => {
    item.textContent = obtenerNombreDeUsuario()
  })

  $abrirModalCrearDocente.addEventListener('click', () => {
    document.documentElement.style.overflowY = 'hidden'
    $modalCrearDocente.classList.add('modalCrearActivo')
  })

  $modalCrearDocente.addEventListener('click', (e) => {
    if (e.target === $modalCrearDocente) {
      document.documentElement.style.overflowY = 'auto'
      $modalCrearDocente.classList.remove('modalCrearActivo')
    }
  })

  $btnCerrarSesion.addEventListener('click', () => {
    cerrarSesion()
  })
})

function obtenerNombreDeUsuario() {
  const usuario = obtenerParametrosDeBusqueda("usuario")
  return usuario
}

function crearDocente() {
  const $formCrearDocente = document.getElementById("formDocente")
  const usuarioId = obtenerParametrosDeBusqueda("id")

  $formCrearDocente.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const
      { nombre,
        apellido,
        direccion,
        distrito,
        especialidad,
        edad,
        sueldo } = Object.fromEntries(new FormData(evento.target))

    const otrosUsuarios = obtenerDelLocalStorage("usuarios")

    const nuevosUusario = otrosUsuarios.map((item) => {
      if (item.id === usuarioId) {
        const existePropiedadDocentes = item.docentes

        const crearNuevoDocente = {
          id: crypto.randomUUID(),
          nombre,
          apellido,
          direccion,
          distrito,
          especialidad,
          edad,
          sueldo
        }

        if (!existePropiedadDocentes) {
          const nuevoItem = { ...item, docentes: [crearNuevoDocente] }
          return nuevoItem
        }

        const nuevoItem = { ...item, docentes: [...item.docentes, crearNuevoDocente] }
        item = nuevoItem
      }

      return item
    })
    guardarEnLocalStorage("usuarios", nuevosUusario)

    alert("docente creado con exito!")
    // reset inputs
    $formCrearDocente.reset()

    crearTablaDocentes()
  })


}

function crearTablaDocentes() {
  const idActual = obtenerParametrosDeBusqueda("id")
  const { docentes } = obtenerDelLocalStorage("usuarios").find((item) => item.id === idActual)

  if (!docentes) {
    alert("En estos momentos no tienes docentes 🥲")
    alert("Pero puedes crearlos 👍")
    return
  }

  const $appContenedor = document.getElementById("app")
  const $trElement = document.createElement("tr")

  const table = `
      <table>
      <tbody>
        <tr>
          <td>Id</td>
          <td>Nombre</td>
          <td>Apellido</td>
          <td>Direcciôn</td>
          <td>Distrito</td>
          <td>Especialidad</td>
          <td>Edad</td>
          <td>Suedo</td>
        </tr>

          ${docentes.map((item) => {
    const { id, nombre, apellido, direccion, distrito, edad, especialidad, sueldo } = item
    return `
            <tr>
            <td>${id}</td>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${direccion}</td>
            <td>${distrito}</td>
            <td>${edad}</td>
            <td>${especialidad}</td>
            <td>${sueldo}</td>
            </tr>
            
            
            `
  })}
      </tbody>
    </table>
  `

  $appContenedor.innerHTML = table
}

function cerrarSesion() {
  guardarEnLocalStorage("estaLogin", false)
  window.location.href = '/index.html'
}



