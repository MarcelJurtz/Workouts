<template>
  <div class="wod-container">
    <div v-if="!isLoading && wod">
      <div class="flex justify-center items-center w-full relative mt-1 mb-5">
        <h1 class="text-5xl text-center flex-grow pr-12">
          {{ wod.name || "Todays Workout" }}
        </h1>
        <div v-if="wod.tag" class="absolute right-0 top-1/2 transform -translate-y-1/2">
          <span class="tag bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">{{ wod.tag }}</span>
        </div>
      </div>
      <div class="wod">
        <p class="text-2xl mb-3">{{ wod.description }}</p>
        <ul class="ul-container" id="wod-elements">
          <li v-for="(item, index) in wod.excercises" :key="index" class="text-xl">
            • {{ item }}
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Spinner from "./SpinnerComponent.vue";

export default {
  name: "App",
  components: { Spinner },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.wodLoading);
    const wod = computed(() => store.state.wod);

    // Dispatch the action on mount
    onMounted(async () => {
      await store.dispatch("getWod");
    });

    return {
      wod,
      isLoading,
    };
  },
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
  margin-top: -15px;
  z-index: 99;
}
</style>
