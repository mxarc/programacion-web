<template>
  <div class="home">
    <h1>Películas</h1>
    <b-button variant="primary" class="float-right mb-3" to="/agregar-pelicula">
      Agregar
    </b-button>
    <Table :fields="campos" :items="allPeliculas" :busy="getLoading">
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
  name: "Home",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "id", label: "Clave" },
        {
          key: "titulo",
          label: "Titulo",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        {
          key: "director",
          label: "Director",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        {
          key: "fecha",
          label: "Año",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapGetters(["allPeliculas", "getLoading"]),
  },
  methods: {
    ...mapActions(["setPelicula", "setPeliculas", "eliminarPelicula"]),
    onEditar(item) {
      console.log(item);
      this.$router.push({
        name: "EditarPelicula",
        params: {
          id: item.item.id,
        },
      });
    },
    onEliminar(item) {
      console.log(item);

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
            this.eliminarPelicula({
              id: item.item.id,
              onComplete: (response) => {
                this.$notify({
                  type: "info",
                  title: response.data.message,
                });
                setTimeout(() => this.setPeliculas(), 1000);
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
    this.setPeliculas();
  },
};
</script>
