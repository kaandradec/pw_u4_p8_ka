<template>
  <div class="login-container">
    <div class="login-caja">
      <h2>Iniciar Sesión</h2>
      <input v-model="username" type="text" placeholder="Usuario" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="login()">Ingresar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (
        (this.username === "admin" || this.username === "estudiante") &&
        this.password === "123"
      ) {
        // PINIA VUE Framework especializado para almacenar auth
        localStorage.setItem("usuario", this.username);
        localStorage.setItem("auth", "true"); // bandera que me indique al sistema que se autenticó

        // Redireccionar a la página de bienvenida
        this.$router.push("/home?anio=2018");
      }
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f6f8;
  /* Ocupar y distribuir en toda la altura y en todo el ancho */
  height: 100vh;
  width: 100vw;
}

.login-caja {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  border: 1px solid black;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
}
/* Error de input sobresalido */
/* 
Por defecto, box-sizing es content-box, lo cual no incluye el padding ni el border
dentro del width. Por eso, input { width: 100%; padding: 10px; },
el input termina ocupando más que el 100% del contenedor,
provocando el desbordamiento.
Solución ⬇️
*/
input,
button {
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>