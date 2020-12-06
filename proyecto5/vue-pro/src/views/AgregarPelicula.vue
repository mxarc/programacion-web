<template>
  <div>
    <h1>Agregar peliculas</h1>
    <b-form @submit.prevent="guardarPelicula">
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
        :error="erroresValidacion && !validacionDirector"
        class="mb-2"
      />
      <Input
        v-model="pelicula.fecha"
        label="Año de la pelicula"
        id="fecha"
        minlength="4"
        maxlength="4"
        :error="erroresValidacion && !validacionFecha"
        placeholder="Ingrese el año de la pelicula"
      />
      <b-form-group id="input-group-3" label="Género" label-for="genero">
        <b-form-select
          id="genero"
          v-model="pelicula.genero"
          :options="genderOptions"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="success" class="float-right mt-3"
        >Guardar</b-button
      >
    </b-form>
  </div>
</template>

<script>
import Input from "../components/Input";
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";

export default {
  name: "Agregar",
  components: {
    Input,
  },
  data() {
    return {
      pelicula: {
        id: 0,
        titulo: "",
        director: "",
        fecha: "",
        genero: null,
      },
      erroresValidacion: false,
      genderOptions: [],
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.pelicula.titulo !== undefined && this.pelicula.titulo.trim() !== ""
      );
    },

    validacionDirector() {
      return (
        this.pelicula.director !== undefined &&
        this.pelicula.director.trim() !== ""
      );
    },

    validacionFecha() {
      return (
        this.pelicula.fecha !== undefined && this.pelicula.fecha.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["crearPelicula", "setGeneros"]),
    ...mapGetters(["allGeneros"]),
    guardarPelicula() {
      if (
        this.validacionNombre &&
        this.validacionDirector &&
        this.validacionFecha
      ) {
        this.erroresValidacion = false;
        console.log(this.pelicula);
        this.crearPelicula({
          params: this.pelicula,
          onComplete: (response) => {
            console.log(response);
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
  mounted() {
    this.setGeneros();
    setTimeout(() => {
      const genders = this.allGeneros();
      Vue.set(
        this,
        "genderOptions",
        genders.map((gender) => {
          return { value: gender.id, text: gender.genero };
        })
      );
    }, 1000);
  },
};
</script>

<style>
</style>