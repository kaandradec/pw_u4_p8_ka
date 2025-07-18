export function obtenerPaginasPermitidas(usurio) {
  let arreglo;
  if (usurio === 'admin') {
    // Páginas del admin
    arreglo = ['/home', '/about', '/estudiante', '/notas', '/403'];
  }

  if (usurio === 'estudiante') {
    // Páginas de estudiante
    arreglo = ['/home', '/about', '/estudiante', '/403'];
  }

  return arreglo;
}