import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteView from '@/views/EstudianteView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import NotasIngresoView from '@/views/NotasIngresoView.vue'
import RecursoProhibidoView from '@/views/RecursoProhibidoView.vue'

import { obtenerPaginasPermitidas } from '@/helpers/Autorizacion'

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
    component: EstudianteView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: NotasIngresoView,
    meta: {
      requiereAutenticacion: true,
    }
  },
  {
    path: '/403',
    name: '403',
    component: RecursoProhibidoView,
    meta: {
      requiereAutenticacion: true,
    }
  },
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
//   // Validar si página debe estar autenticada (requiereAutenticacion: true)
//   if (to.meta.requiereAutenticacion) {
//     // Si no está autenticado
//     if (!estaAutenticado()) {
//       next('/login') // redirigir
//     } else {
//       // autenticado -> compruebo autorización aquí

//       let usuario = localStorage.getItem('usuario');
//       let paginas = obtenerPaginasPermitidas(usuario);
//       if (paginas.includes(to.path)) {
//         next(); // seguir con la ruta planeada
//       } else {
//         next('/403');
//       }

//     }
//   } else {
//     next();
//   }
// })

// Guardian
router.beforeEach((to, from, next) => {
  // Si la página no requiere autenticacion
  if (!to.meta.requiereAutenticacion) {
    next();
    return;
  }

  // Validar autenticacion
  if (!estaAutenticado()) {
    next('/login');
    return;
  }

  let usuario = localStorage.getItem('usuario');
  let paginas = obtenerPaginasPermitidas(usuario);

  // Validar Autorización
  if (!paginas.includes(to.path)) {
    next('/403');
    return;
  }

  // Autenticado y Autorizado
  next();
})

export default router
