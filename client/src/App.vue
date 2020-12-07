<template>
  <div id="app" class="main px-3">
    <div class="content">
      <!-- Header -->
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu is-shadowless" >
          <div class="navbar-start">
            <a class="navbar-item" v-on:click="refresh">Refresh</a>
            <a class="navbar-item" v-on:click="settings">Settings</a>
          </div>
        </div>
      </nav>
      <!-- /Header -->
      <div v-if="wod" class="wod-container">
        <h1 class="title is-1 mt-2">
          {{ wod.name ? wod.name : "Todays Workout" }}
        </h1>
        <div class="wod">
          <p class="subtitle is-3">{{ wod.description }}</p>
          <ul class="ul-container" id="wod-elements">
            <li v-for="item in wod.excercises" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>No workouts found!</p>
      </div>
    </div>
    <footer class="footer">
      <div class="content is-transparent has-text-centered">
        <p>
          <strong>WOD Generator</strong> by <a href="https://mjurtz.com">Marcel Jurtz</a> | 
          <a href="https://www.mjurtz.com/Impressum.html"> Imprint </a> |
          <a href="https://www.mjurtz.com/Datenschutzerklaerung.html"> Privacy </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      showNav: false,
      wod: {},
    };
  },
  async mounted() {
    const response = await axios.get("api/wod/random");
    this.wod = response.data;
  },
  methods: {
    refresh: function () {
      axios.get("api/wod/random").then((response) => {
        this.wod = response.data;
        console.log(response);
      });
    },

    settings: function () {
      alert("Sorry, not yet implemented");
    },
  },
};
</script>

<style>
@font-face {
  font-family: "PermanentMarker";
  src: local("PermanentMarker"), local("PermanentMarker-Regular"),
    url("assets/PermanentMarker-regular.ttf") format("truetype");
  font-style: normal;
  font-weight: 400;
}

#app {
  font-family: "PermanentMarker", Helvetica, Arial, sans-serif;
  margin: auto;
  max-width: 700px;
}

.main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content {
  margin-top: 3rem;
  flex: 1;
}

.footer {
  background-color: transparent;
}

/* Navbar workaround */
.navbar-item {
  display: flex;
}

.navbar,
.navbar-menu,
.navbar-start,
.navbar-end {
  align-items: stretch;
  display: flex;
  padding: 0;
}

.navbar-menu{
  flex-grow: 1;
  flex-shrink: 0;
}
.navbar-start{
  justify-content: flex-start;
  margin-right: auto;
}
.navbar-end{
  justify-content: flex-end;
  margin-left: auto;
}

.navbar .container {
  display: flex;
}
.navbar-item {
  display: flex;
  align-items: center;
}
</style>
