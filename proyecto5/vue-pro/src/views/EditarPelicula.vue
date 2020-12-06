<template>
  <div>
    <h1>Editar pelicula</h1>
    <b-form @submit.prevent="guardarEditPelicula">
      <Input
        v-model="pelicula.id"
        label="Clave"
        id="clave"
        disabled
        class="mb-2"
      />
      <Input
        v-model="pelicula.titulo"
        label="Titulo"
        id="titulo"
        maxlength="120"
        placeholder="Ingrese nombre de la pelicula"
        mensajeError="El nombre es obligatorio"
        :error="erroresValidacion && !validacionNombre"
        class="mb-2"
      />
      <Input
        v-model="pelicula.director"
        label="Director"
        id="director"
        maxlength="100"
        placeholder="Ingrese el director de la pelicula"
        class="mb-2"
      />
      <Input
        v-model="pelicula.fecha"
        label="Año de la pelicula"
        id="año"
        maxlength="4"
        placeholder="Ingrese el año de la pelicula"
      />

      <b-button type="submit" variant="success" class="float-right mt-3"
        >Guardar</b-button
      >
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import Input from "../components/Input";
import { mapActions } from "vuex";

export default {
  name: "Editar",
  components: {
    Input,
  },
  data() {
    return {
      pelicula: {
        id: 0,
        titulo: "",
        director: "",
        año: "",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.pelicula.titulo !== undefined && this.pelicula.titulo.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["obtenerPelicula", "editarPelicula"]),
    guardarEditPelicula() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        this.editarPelicula({
          id: this.pelicula.id,
          params: this.pelicula,
          onComplete: (response) => {
            this.$notify({
              type: "success",
              title: response.data.message,
            });
            this.$router.push({
              name: "Peliculas",
            });
          },
          onError: (error) => {
            this.$notify({
              type: "error",
              title: error.response.data.message,
            });
          },
        });
      } else {
        this.erroresValidacion = true;
      }
    },
  },
  created() {
    this.obtenerPelicula({
      id: this.$route.params.id,
      onComplete: (response) => {
        console.log("info", response.data.data[0]);
        Vue.set(this, "pelicula", response.data.data[0]);
      },
    });
  },
};
</script>

<style>
</style>