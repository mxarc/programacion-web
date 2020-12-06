import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    generos: [],
    peliculas: [],
    loading: false,
  },
  mutations: {
    SET_GENEROS(state, generos) {
      state.generos = generos;
    },
    SET_PELICULAS(state, peliculas) {
      state.peliculas = peliculas;
    },
    SET_LOADING(state, load) {
      state.loading = load;
    },
  },
  actions: {
    /** GENDERS ENDPOINT  **/
    setGeneros({ commit }) {
      commit("SET_LOADING", true);
      axios
        .get("http://localhost:3000/genders")
        .then((response) => {
          commit("SET_GENEROS", response.data);
        })
        .finally(() => commit("SET_LOADING", false));
    },
    crearGenero({ commit }, { params, onComplete, onError }) {
      axios
        .post("http://localhost:3000/genders", params)
        .then(onComplete)
        .catch(onError);
    },
    obtenerGenero({ commit }, { id, onComplete, onError }) {
      axios
        .get(`http://localhost:3000/genders/${id}`)
        .then(onComplete)
        .catch(onError);
    },
    editarGenero({ commit }, { id, params, onComplete, onError }) {
      axios
        .put(`http://localhost:3000/genders/${id}`, params)
        .then(onComplete)
        .catch(onError);
    },
    eliminarGenero({ commit }, { id, onComplete, onError }) {
      axios
        .delete(`http://localhost:3000/genders/${id}`)
        .then(onComplete)
        .catch(onError);
    },

    /** MOVIES ENDPOINT  **/
    setPeliculas({ commit }) {
      commit("SET_LOADING", true);
      axios
        .get("http://localhost:3000/movies")
        .then((response) => {
          commit("SET_PELICULAS", response.data);
        })
        .finally(() => commit("SET_LOADING", false));
    },
    crearPelicula({ commit }, { params, onComplete, onError }) {
      axios
        .post("http://localhost:3000/movies", params)
        .then(onComplete)
        .catch(onError);
    },
    obtenerPelicula({ commit }, { id, onComplete, onError }) {
      axios
        .get(`http://localhost:3000/movies/${id}`)
        .then(onComplete)
        .catch(onError);
    },
    editarPelicula({ commit }, { id, params, onComplete, onError }) {
      axios
        .put(`http://localhost:3000/movies/${id}`, params)
        .then(onComplete)
        .catch(onError);
    },
    eliminarPelicula({ commit }, { id, onComplete, onError }) {
      axios
        .delete(`http://localhost:3000/movies/${id}`)
        .then(onComplete)
        .catch(onError);
    },
  },
  getters: {
    allGeneros: (state) => {
      return state.generos;
    },
    allPeliculas: (state) => {
      return state.peliculas;
    },
    getLoading: (state) => {
      return state.loading;
    },
  },
});
