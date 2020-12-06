<template>
  <div id="app" class="px-1">
    <!-- Header -->
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
        <div class="navbar-start">
          <a class="navbar-item" v-on:click="refresh">Refresh</a>
          <a class="navbar-item" v-on:click="settings">Settings</a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>

            <div class="navbar-dropdown">
              <a href="https://www.mjurtz.com/Impressum.html" class="navbar-item"> Imprint </a>
              <a href="https://www.mjurtz.com/Datenschutzerklaerung.html" class="navbar-item"> Privacy </a>
              <a href="mailto:jurtzmarcel@gmail.com" class="navbar-item"> Contact </a>
            </div>
          </div>
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
  margin-top: 3rem;
  max-width: 700px;
}

.px-1 {
  padding-left: 1em;
  padding-right: 1em;
}
</style>
