<template>
  <div>
    <h1>Editar Género</h1>
    <b-form @submit.prevent="guardarEditGenero">
      <Input
        v-model="genero.id"
        label="Clave"
        id="clave"
        disabled
        class="mb-2"
      />
      <Input
        v-model="genero.genero"
        label="Nombre"
        id="nombre"
        placeholder="Ingrese nombre de la persona"
        mensajeError="El nombre es obligatorio"
        :error="erroresValidacion && !validacionNombre"
        class="mb-2"
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
      genero: {
        id: 0,
        genero: "",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (
        this.genero.genero !== undefined && this.genero.genero.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["obtenerGenero", "editarGenero"]),
    guardarEditGenero() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        console.log(this.genero);
        //Editar genero
        this.editarGenero({
          id: this.genero.id,
          params: this.genero,
          onComplete: (response) => {
            this.$notify({
              type: "success",
              title: response.data.message,
            });
            this.$router.push({
              name: "Genero",
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
    this.obtenerGenero({
      id: this.$route.params.id,
      onComplete: (response) => {
        console.log("info", response.data.data[0]);
        Vue.set(this, "genero", response.data.data[0]);
      },
    });
  },
};
</script>

<style>
</style>