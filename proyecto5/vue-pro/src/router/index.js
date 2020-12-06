import Vue from "vue";
import VueRouter from "vue-router";
import AgregarGenero from "../views/AgregarGenero.vue";
import AgregarPelicula from "../views/AgregarPelicula.vue";
import EditarGenero from "../views/EditarGenero.vue";
import EditarPelicula from "../views/EditarPelicula.vue";
import Genero from "../views/Genero.vue";
import Home from "../views/Home.vue";
import Pelicula from "../views/Pelicula.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/peliculas",
    name: "Peliculas",
    component: Pelicula,
  },
  {
    path: "/agregar-pelicula",
    name: "AgregarPelicula",
    component: AgregarPelicula,
  },
  {
    path: "/editar-pelicula",
    name: "EditarPelicula",
    component: EditarPelicula,
  },
  {
    path: "/genero",
    name: "Genero",
    component: Genero,
  },
  {
    path: "/agregar-genero",
    name: "AgregarGenero",
    component: AgregarGenero,
  },
  {
    path: "/editar-genero/:id",
    name: "EditarGenero",
    component: EditarGenero,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
