import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteView from '@/views/EstudianteView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  // A cada página que quiero proteger de agregamos una metadata
  // Para proteger rutas usamos 'Guardianes'
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiereAutenticacion: true, // requiereAutenticacion es un nombre cualquiera
    }
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function estaAutenticado() {
  let result = localStorage.getItem('auth') === 'true';
  console.log('LOCALSTORAGE auth:', result)
  return result;
}

// ⬇️ Se ejecuta cada vez que se quiere ingresar a una página
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiereAutenticacion) {
//     // Si no está autenticado
//     if (!estaAutenticado()) {
//       next('/login')
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })

router.beforeEach((to, from, next) => {
  // Si la página no requiere auth
  if (!to.meta.requiereAutenticacion) {
    next();
    return;
  }

  // Si está autenticado
  if (estaAutenticado()) {
    next()
    return;
  }

  // Si NO esta autenticado
  next('/login');
})

export default router
