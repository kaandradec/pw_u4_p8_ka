import axios from "axios";

// Guardar
// public Response guardar(@RequestBody EstudianteTo estudianteTo) {

const URL_API = 'http://localhost:8081/api/matricula/v1/estudiantes';

const guardar = async (body) => {
  const data = axios.post(URL_API, body).then(res => res.data);
  console.log(data);
}

// Actualizar
// public Response actualizarPorId(@RequestBody EstudianteTo estudianteTo, @PathParam("id") Integer id)
const actualizar = async (body, id) => {
  axios.put(`${URL_API}/${id}`, body).then(res => res.data);
}

// Actualzar parcial
//  public Response actualizarParcial(@RequestBody EstudianteTo estudianteTo, @PathParam("id") Integer id)
const actualizarParcial = async (body, id) => {
  axios.patch(`${URL_API}/${id}`, body).then(res => res.data);
}

// BorrarPorId
// public Response borrarPorIdPorId(@PathParam("id") Integer id) {
const borrarPorId = async (id) => {
  axios.delete(`${URL_API}/${id}`).then(res => res.data);
}

// FACHADAS
export const guardarFachada = async (body) => {
  await guardar(body);
}

export const actualizarFachada = async (body, id) => {
  await actualizar(body, id);
}

export const actualizarParcialFachada = async (body, id) => {
  await actualizarParcial(body, id);
}

export const borrarPorIdFachada = async (id) => {
  await borrarPorId(id);
}


