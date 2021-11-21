<template>
  <div id="app" class="main px-3">
    <div class="content">
      <!-- Header -->
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu is-shadowless" >
          <div class="navbar-start">
            <a class="navbar-item" v-bind:class="{ disabled: refreshDisabled }" v-on:click="refresh">Refresh</a>
            <a class="navbar-item" v-on:click="toggleSettings">{{ SettingsButtonText }}</a>
          </div>
        </div>
      </nav>
      <!-- /Header -->
      <app-wod v-show=!settingsActive></app-wod>
      <app-settings v-show=settingsActive></app-settings>
    </div>
    <footer class="footer">
      <div class="content is-transparent has-text-centered">
        <p>
          <strong>WOD Generator</strong> by <a href="https://mjurtz.com">Marcel Jurtz</a> | 
          <a href="https://www.mjurtz.com/imprint"> Imprint </a> |
          <a href="https://www.mjurtz.com/privacy"> Privacy </a>
        </p>
        <p>Feedback or Ideas for Improvement? <a href="mailto:marcel@mjurtz.com">Text me</a>!</p>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      showNav: false,
      settingsActive: false,
      isLoading: false
    };
  },
  methods: {
    refresh: async function () {
      if(!this.refreshDisabled) {
        await this.$store.dispatch("getWod");
      }
    },

    toggleSettings: function () {
      this.settingsActive = !this.settingsActive
    },
  },
  computed: {
    SettingsButtonText: function() {
      return this.settingsActive ? "WOD" : "Settings";
    },
    refreshDisabled: function() {
      return this.settingsActive || this.isLoading;
    }
  },
  watch: {
    '$store.state.wodLoading': function() {
      this.isLoading = this.$store.state.wodLoading;
    }
  }
};
</script>

<style>
@font-face {
  font-family: "PermanentMarker";
  src: local("PermanentMarker"), local("PermanentMarker-Regular"),
    url("./assets/PermanentMarker-regular.ttf") format("truetype");
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

a.disabled {
  pointer-events: none;
  opacity: .65;
}

</style>
