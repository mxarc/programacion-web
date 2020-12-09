<template>
  <div id="app">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">🎥🍿 Películas</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Inicio</b-nav-item>
        <b-nav-item to="/genero">Géneros</b-nav-item>
        <b-nav-item to="/peliculas">Peliculas</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
    <router-view class="container mt-4" />
    <notifications position="bottom right" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
