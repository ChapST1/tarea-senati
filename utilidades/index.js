export function guardarEnLocalStorage(nombreVar, arr) {
  localStorage.setItem(nombreVar, JSON.stringify(arr))
}

export function obtenerDelLocalStorage(nombreVar) {
  return JSON.parse(localStorage.getItem(nombreVar))
}

export function obtenerParametrosDeBusqueda(nombre) {
  const url = new URL(window.location.href)
  const parametro = url.searchParams.get(nombre)
  return parametro
}

