<template>
  <div id="app" class="main px-3">
    <div class="content">
      <!-- Header -->
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu is-shadowless">
          <div class="navbar-start">
            <a
              class="m-3 hover:cursor-pointer"
              v-bind:class="{ disabled: refreshDisabled }"
              v-on:click="refresh"
              >Refresh</a
            >
            <a class="m-3 hover:cursor-pointer" v-on:click="toggleContext">{{
              contextButtonText
            }}</a>
          </div>
        </div>
      </nav>
      <!-- /Header -->
      <app-wod v-show="wodVisible"></app-wod>
      <app-settings v-show="settingsActive"></app-settings>
      <app-privacy v-show="privacyActive"></app-privacy>
      <app-imprint v-show="imprintActive"></app-imprint>
    </div>
    <footer class="footer text-center text-md mb-5 mt-3">
      <div class="content is-transparent">
        <p>
          <strong>Made with </strong> ❤️
          <a href="https://fitness.mjurtz.com">Marcel Jurtz</a> |
          <a v-on:click="toggleImprint"> Imprint </a> |
          <a v-on:click="togglePrivacy"> Privacy </a>
        </p>
        <p>
          Feedback or Ideas for Improvement?
          <a href="mailto:marcel@mjurtz.com">Text me</a>!
        </p>
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
      privacyActive: false,
      imprintActive: false,
      isLoading: false,
    };
  },
  methods: {
    refresh: async function () {
      if (!this.refreshDisabled) {
        await this.$store.dispatch("getWod");
      }
    },

    toggleContext: function () {
      if (this.privacyActive || this.imprintActive) {
        this.privacyActive = false;
        this.imprintActive = false;
        this.settingsActive = false;
      } else {
        this.settingsActive = !this.settingsActive;
      }
    },

    togglePrivacy: function () {
      if (this.imprintActive || this.settingsActive) {
        this.imprintActive = false;
        this.settingsActive = false;
      }

      this.privacyActive = !this.privacyActive;
    },

    toggleImprint: function () {
      if (this.privacyActive || this.settingsActive) {
        this.privacyActive = false;
        this.settingsActive = false;
      }

      this.imprintActive = !this.imprintActive;
    },
  },
  computed: {
    contextButtonText: function () {
      return this.settingsActive || this.imprintActive || this.privacyActive
        ? "WOD"
        : "Settings";
    },
    refreshDisabled: function () {
      return (
        this.settingsActive ||
        this.imprintActive ||
        this.privacyActive ||
        this.isLoading
      );
    },
    wodVisible: function () {
      return !this.settingsActive && !this.imprintActive && !this.privacyActive;
    },
  },
  watch: {
    "$store.state.wodLoading": function () {
      this.isLoading = this.$store.state.wodLoading;
    },
  },
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
  max-width: 80%;
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

.navbar-menu {
  flex-grow: 1;
  flex-shrink: 0;
}
.navbar-start {
  justify-content: flex-start;
  margin-right: auto;
}
.navbar-end {
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
  opacity: 0.65;
}
</style>