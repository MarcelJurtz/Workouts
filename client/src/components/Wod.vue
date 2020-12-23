<template>
    <div class="wod-container">
        <div v-if="!isLoading && wod">
        <h1 class="title is-1 mt-2">
            {{ wod.name ? wod.name : "Todays Workout" }}
        </h1>
        <div class="wod">
            <span v-if="wod.tag" class="tag is-info abs-tr mb-2">{{ wod.tag }}</span>
            <p class="subtitle is-3">{{ wod.description }}</p>
            <ul class="ul-container" id="wod-elements">
            <li v-for="(item, index) in wod.excercises" :key="index">
                {{ item }}
            </li>
            </ul>
        </div>
        </div>
        <div v-else-if="!isLoading">
            <p>No workouts found!</p>
        </div>
        <div v-else>
          <spinner />
        </div>
    </div>
</template>

<script>
import spinner from "./Spinner"

export default {
  name: "App",
  components: { spinner },
  data: function() {
    return {
      blacklistedEquipment: [],
      showNav: false,
      isLoading: false
    };
  },
  async mounted() {
    await this.$store.dispatch("getWod");
  },
  computed: {
    wod() {
        return this.$store.state.wod
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
.wod-container div:first-child {
  position: relative;
}

.abs-tr {
  position: absolute;
  top: 0;
  right: 0;
}

</style>
