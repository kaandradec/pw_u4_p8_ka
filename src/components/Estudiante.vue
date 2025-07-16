<template>
  <div class="container">
    <button @click="guardar()">Guardar</button>
    <button @click="actualizar()">Actualizar</button>
    <button @click="actualizarParcial()">Actualizar Parcial</button>
    <button @click="borrar()">Borrar</button>
  </div>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarPorIdFachada,
} from "@/clients/EstudianteClient";

export default {
  methods: {
    async guardar() {
      let fecha = "2002-06-03";
      const HORA = "T00:00:00";

      const estudianteToBody = {
        nombre: "Kevin",
        apellido: "Andrade",
        fechaNacimiento: `${fecha}${HORA}`,
        genero: "M",
      };
      await guardarFachada(estudianteToBody);
    },
    async actualizar() {
      let fecha = "2007-04-03";
      const HORA = "T00:00:00";

      const estudianteToBody = {
        nombre: "Pepe",
        apellido: "Perez",
        fechaNacimiento: `${fecha}${HORA}`,
        genero: "M",
      };

      await actualizarFachada(estudianteToBody, 1);
    },
    async actualizarParcial() {
      const estudianteToBody = {
        apellido: "Teran",
      };

      await actualizarParcialFachada(estudianteToBody, 1);
    },
    async borrar() {
      await borrarPorIdFachada(2);
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 auto;
}

button {
  padding: 8px 16px;
  font-weight: 600;
}
</style>