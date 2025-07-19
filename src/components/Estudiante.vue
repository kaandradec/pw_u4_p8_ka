<template>
  <div class="inputs-container">
    <h2>Estudiante</h2>
    <p type="Nombre"><input type="text" v-model="nombre" /></p>
    <p type="Apellido"><input type="text" v-model="apellido" /></p>
    <p type="Fecha de nacimiento">
      <input type="date" v-model="fechaNacimiento" />
    </p>
    <p type="Género"><input type="text" v-model="genero" /></p>
  </div>
  <div class="btns-container">
    <button @click="guardar()">Guardar Nuevo</button>
  </div>

  <div class="btns2-container">
    <h4>Operaciones con ID</h4>
    <p type="Id"><input type="number" v-model="id" /></p>
    <button @click="borrar()">Borrar</button>
    <button @click="actualizar()">Actualizar</button>
    <button @click="actualizarParcial()">Actualizar Parcial</button>
  </div>

  <span v-if="mensaje">{{ mensaje }}</span>
</template>

<script>
import {
  guardarFachada,
  actualizarFachada,
  actualizarParcialFachada,
  borrarPorIdFachada,
} from "@/clients/EstudianteClient";

export default {
  data() {
    return {
      id: null,
      nombre: null,
      apellido: null,
      fechaNacimiento: null,
      genero: null,
      mensaje: null,
    };
  },
  methods: {
    async guardar() {
      if (!this.validar(true, false)) {
        return;
      }

      let fecha = this.fechaNacimiento;
      const HORA = "T00:00:00";

      // let fecha = "2002-06-03";
      // const HORA = "T00:00:00";

      const estudianteToBody = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: `${fecha}${HORA}`,
        genero: this.genero,
      };
      await guardarFachada(estudianteToBody);
      this.mensaje = "Estudiante guardado exitosamente.";
    },
    async actualizar() {
      if (!this.validar(true, true)) {
        return;
      }
      let fecha = this.fechaNacimiento;
      const HORA = "T00:00:00";

      const estudianteToBody = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: `${fecha}${HORA}`,
        genero: this.genero,
      };

      await actualizarFachada(estudianteToBody, this.id);
      this.mensaje = "Estudiante actualizado exitosamente.";
    },
    async actualizarParcial() {
      if (!this.validar(false, true)) {
        return;
      }

      let fecha = this.fechaNacimiento;
      const HORA = "T00:00:00";

      if (fecha) {
        fecha = `${fecha}${HORA}`;
      } else {
        fecha = undefined;
      }

      const estudianteToBody = {
        nombre: this.nombre ? this.nombre : undefined,
        apellido: this.apellido ? this.apellido : undefined,
        fechaNacimiento: fecha ? fecha : undefined,
        genero: this.genero ? this.genero : undefined,
      };

      await actualizarParcialFachada(estudianteToBody, this.id);
      this.mensaje = "Estudiante actualizado parcialmente exitosamente.";
    },
    async borrar() {
      if (!this.id) {
        this.mensaje = "Debe ingresar un ID para borrar.";
        return;
      }
      await borrarPorIdFachada(this.id);
      this.mensaje = "Estudiante borrado exitosamente.";
    },
    validar(validarTodosCampos, validarId) {
      if (validarTodosCampos) {
        if (
          !this.nombre ||
          !this.apellido ||
          !this.fechaNacimiento ||
          !this.genero
        ) {
          this.mensaje = "Todos los campos son obligatorios.";
          return false;
        }
      } else {
        if (
          !this.nombre &&
          !this.apellido &&
          !this.fechaNacimiento &&
          !this.genero
        ) {
          this.mensaje = "Al menos un campo debe ser llenado.";
          return false;
        }
      }

      if (validarId && !this.id) {
        this.mensaje = "Debe ingresar un ID.";
        return false;
      }

      this.mensaje = null;
      return true;
    },
  },
};
</script>

<style>
.inputs-container {
  max-width: 450px;
  margin: auto;
  text-align: start;

  border: 1px solid aliceblue;
  background-color: whitesmoke;
  padding: 16px;
  border-radius: 8px;
}
p:before {
  content: attr(type);
}
input {
  border-radius: 8px;
  border: 1px solid seashell;
}
.btns-container {
  display: flex;
  max-width: 450px;
  gap: 8px;
  margin: 0 auto;
  margin-top: 16px;
}

.btns2-container {
  max-width: 450px;
  margin: auto;
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

button {
  padding: 8px 16px;
  font-weight: 600;
  color: azure;
}

span {
  display: block;
  max-width: 450px;
  margin: auto;
  text-align: center;
  margin-top: 16px;
  color: cornflowerblue;
  font-weight: bold;
}
</style>