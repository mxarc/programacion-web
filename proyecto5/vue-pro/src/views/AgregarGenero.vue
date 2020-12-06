<template>
  <div>
    <h1>Agregar géneros</h1>
    <b-form @submit.prevent="guardarGenero">
      <Input
        v-model="genero.genero"
        label="Nombre"
        id="genero"
        placeholder="Ingrese nombre del genero"
        mensajeError="El nombre es obligatorio"
        :maxlength="50"
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
import Input from "../components/Input";
import { mapActions } from "vuex";

export default {
  name: "Agregar",
  components: {
    Input,
  },
  data() {
    return {
      genero: {
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
    ...mapActions(["crearGenero"]),
    guardarGenero() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        console.log(this.genero.genero);
        this.crearGenero({
          params: this.genero,
          onComplete: (response) => {
            console.log(response);
            this.$notify({
              type: "success",
              title: response.data.mensaje,
            });

            this.$router.push({
              name: "Genero",
            });
          },
          onError: (error) => {
            this.$notify({
              type: "error",
              title: error.response.data.mensaje,
            });
          },
        });
      } else {
        this.erroresValidacion = true;
      }
    },
  },
};
</script>

<style>
</style>