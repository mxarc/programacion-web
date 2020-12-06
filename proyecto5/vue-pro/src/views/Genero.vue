<template>
  <div class="home">
    <h1>Géneros</h1>
    <b-button variant="primary" class="float-right mb-3" to="/agregar-genero">
      Agregar
    </b-button>
    <Table :fields="campos" :items="allGeneros" :busy="getLoading">
      <template slot="actions" slot-scope="{ item }">
        <b-button size="sm" variant="outline-primary" @click="onEditar(item)">
          Editar
        </b-button>
        <b-button
          size="sm"
          class="ml-2"
          variant="outline-danger"
          @click="onEliminar(item)"
        >
          Eliminar
        </b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Generos",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        {
          key: "genero",
          label: "Nombre",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters(["allGeneros", "getLoading"]),
  },
  methods: {
    ...mapActions(["setGeneros", "eliminarGenero"]),
    onEditar(item) {
      console.log(item);
      this.$router.push({
        name: "EditarGenero",
        params: {
          id: item.item.id,
        },
      });
    },
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer", {
          title: "¿Esta seguro que desea eliminar?",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.eliminarGenero({
              id: item.item.id,
              onComplete: (response) => {
                this.$notify({
                  type: "info",
                  title: response.data.message,
                });
                setTimeout(() => this.setGeneros(), 1000);
              },
              onError: (error) => {
                this.$notify({
                  type: "error",
                  title: error.response.data.message,
                });
              },
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
  mounted() {
    this.setGeneros();
  },
};
</script>
