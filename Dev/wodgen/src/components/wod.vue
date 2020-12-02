<template>
  <div class="wod-container">
    <h1>{{ wod.name.length ? wod.name : "Your WOD" }}</h1>
    <div class="menu-container">
      <a v-on:click="settings">Settings</a> | <a v-on:click="refresh">New</a>
    </div>
    <div class="wod">
      <p>{{ wod.description }}</p>
      <ul class="ul-container" id="wod-elements">
      <li v-for="item in wod.excercises" :key="item">
        {{ item }}
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import jsonWods from '../assets/workouts.json'

export default {
  name: 'wodcomponent',
  data () {
    
    return {
      wod: this.getNewWod()
    }
  },

  methods: {
    refresh: function() {
      this.wod = this.getNewWod();
    },

    getNewWod: function() {
      return jsonWods[Math.floor(Math.random() * jsonWods.length)];
    },

    settings: function() {
      alert("Loading settings");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-size: 72px;
  margin-bottom: 0;
}

p {
  font-size: 36px;
}

li {
  font-size: 36px;
}

a:hover {
  cursor: pointer;
}

@media (min-width: 768px) {
  .wod-container {
    width: 50% !important;
  }
}

.wod-container {
  width: 80%;
  margin: 0 auto;
}
</style>
