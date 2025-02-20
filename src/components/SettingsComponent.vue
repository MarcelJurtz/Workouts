<template>
  <div class="settings-container">
    <div class="flex items-center space-x-4 mb-3">
      <button 
        @click="toggleTheme"
        id="toggle-button"
        class="relative inline-flex items-center h-6 w-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all bg-gray-300 dark:bg-indigo-600"
        :aria-pressed="isDarkMode.toString()">
        <span class="sr-only">Toggle Dark Mode</span>
        <span 
            id="toggle-indicator"
            class="inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform ease-in-out duration-300"
            :class="{'translate-x-6': isDarkMode, 'translate-x-1': !isDarkMode}"
        ></span>
      </button>
      <label for="toggle-button" class="text-sm font-medium">
        Dark Mode
      </label>
    </div>
    <h1 class="text-lg">Filter Equipment</h1>
    <p class="text-sm mb-3">This lets you restrict the available equipment for your workouts. You won't receive workouts that require equipment that is unselected here.</p>
    <button class="button hover:cursor-pointer" type="button" @click="selectAll">{{ selectAllText }}</button>
    <template v-for="eq in equipment" :key="eq.id">
      <div>
        <input
          type="checkbox"
          :id="eq.id"
          :value="eq.id"
          v-model="whitelist"
          @change="updateState"
        />
        <label :for="eq.id" class="ml-3"> {{ eq.name }}</label>
      </div>
    </template>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

// Reactive state
const whitelist = ref([]);
const equipment = ref([
  { id: "airbike", name: "Airbike" },
  { id: "barbell", name: "Barbell" },
  { id: "bench", name: "Barbell-Bench" },
  { id: "boxjump", name: "Boxjump" },
  { id: "dumbbell", name: "Dumbbell" },
  { id: "kettlebell", name: "Kettlebell" },
  { id: "pool", name: "Pool / Any option to swim" },
  { id: "pullupbar", name: "Pull-Up-Bar" },
  { id: "rings", name: "Rings" },
  { id: "rower", name: "Rowing Ergometer" },
  { id: "skippingrope", name: "Skipping rope" },
  { id: "track", name: "Track / Any option to run" },
  { id: "wallball", name: "Wallball" },
]);

const isDarkMode = ref(false);

// Computed property for the "Select All" button text
const selectAllText = computed(() =>
  whitelist.value.length < equipment.value.length ? "Select All" : "Deselect All"
);

// Methods
const selectAll = () => {
  if (whitelist.value.length < equipment.value.length) {
    whitelist.value = equipment.value.map((eq) => eq.id);
  } else {
    whitelist.value = [];
  }
  updateState();
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

const updateState = () => {
  const blacklist = equipment.value
    .map((eq) => eq.id)
    .filter((id) => !whitelist.value.includes(id));

  store.commit("SET_EQ_BLACKLIST", blacklist);
};

// Set initial whitelist on mount
onMounted(() => {
  whitelist.value = equipment.value.map((eq) => eq.id);
});
</script>

<style scoped>
.settings-container {
  margin: 1rem;
}

.button {
  margin-bottom: 1rem;
}

.my-2 {
  margin: 1rem 0;
}
</style>
