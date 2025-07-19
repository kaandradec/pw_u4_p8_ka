import axios from "axios";

// Guardar
// public Response guardar(@RequestBody EstudianteTo estudianteTo) {

const URL_API = 'http://localhost:8081/api/matricula/v1/estudiantes';
let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdWNlLmVkdS5lYyIsInVwbiI6Im1pY29ycmVvQHVjZS5lZHUuZWMiLCJncm91cHMiOlsiYWRtaW5zIl0sImlhdCI6MTc1Mjg4NDY3MiwiZXhwIjoxNzUyODg0NzAyLCJqdGkiOiJkNzdlOWFjMy05YTVkLTRlMWUtYmQzNy1lNGVjNjhlOWI5MDUifQ.q1mcGn2J0TvOuod8_Eu2mXULmPlobNPwHXxBX7naqqAft5CX2SCu9ElEXOQL75x-lbxIlXN8LS_vt6LD0qBsqkWbULH6ye4AnyFJY4uIyxsZEUKw8aZ5z2MptMA9Yn82b-rdjPnaV6tdQClmnSmc_6qoyrhFqZQDPUomPx9Lm-7SU-YlMwyYUB26ByOC7Ea0HnteNawrc9_6Su0k1qdcw_K12sFfQa7aHorv_3uSyn-Ru2vvwnKT3LhttTocXZ9s8u4FPlI7yvOgdB2RpSg-RT7LYnl6x87uUd0Bv85wxZd-5ix6Z0WqZHccOk8XmH3L5z6lGHrHyjAO4FS3UXbXqw";

const guardar = async (body) => {
  const data = axios.post(URL_API, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);
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


