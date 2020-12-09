<template>
  <div class="home">
    <h1>🍿 Bienvenido a la cartelera</h1>
    <div>
  <b-card no-body>
    <div class="mx-auto text-center mt-3 mb-3" v-if="getLoading">
                <b-spinner
            variant="primary"
            label="Spinning"
          ></b-spinner>
          <p class="mt-2">Cargando...</p>
    </div>
    <b-tabs pills card vertical>
    <b-tab v-for="gender in allGeneros" @click="filtrarPeliculas(gender.id)" :key="gender.id" :title="gender.genero">
        <b-card-text>
          <Table :items="peliculasFiltered" :fields="campos">
          </Table>
        </b-card-text>
  <!-- Render this if no tabs -->
        <template #empty>
          <div class="text-center text-muted">
              No hay géneros asignados
          </div>
        </template>

      </b-tab>
    </b-tabs>
  </b-card>
<!--     <b-tab title="First" active><p>I'm the first tab</p></b-tab>-->
</div>
  </div>
</template>
<script>

import Table from "../components/Table";
import Vue from 'vue';
import { mapActions, mapGetters } from "vuex";

export default {

  name: 'Home',
  components: {
    Table
  },

  data() {
    return {
  campos: [
        {
          key: "titulo",
          label: "Película",
          formatter: (value) => {
            return value || "Sin nombre";
          },
        },
        {
          key: "fecha",
          label: "Año",
        },
      ],
    }
  },

  computed: {
    ...mapGetters(["allGeneros", "allPeliculas", "getLoading"]),
  },
  methods: {
    ...mapActions(["setGeneros", "setPeliculas" , "eliminarGenero"]),

    changedEvent(currentTabs, previousTabs) {
      console.log('Triggered');
      console.log(currentTabs);
    },
    filtrarPeliculas(id) {
      console.log('Filtrando pelicula con ID ', id);
      const peliculas = this.allPeliculas.filter((pelicula) => pelicula.genero === id);
      Vue.set(this, "peliculasFiltered", peliculas);
      console.log('Peliculas filtradas: ', peliculas.length);
      console.log(this.peliculasFiltered);
    },
  },
  mounted() {
    this.setGeneros();
    this.setPeliculas();
  },
}
</script>
