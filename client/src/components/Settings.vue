<template>
    <div class="settings-container">
        <h1 class="title is-1 mt-2">Available Equipment</h1>
        <div>
          <button type="button" class="button" v-on:click="selectAll">{{ selectAllText }}</button>
          <hr class="my-2" />
            <template v-for="eq in equipment">
              <div v-bind:key="eq.id">
                  <input
                  type="checkbox"
                  v-bind:id="eq.id"
                  v-bind:value="eq.id"
                  v-model="whitelist"
                  @change="updateState"
                  />
                  <label v-bind:for="eq.id"> {{ eq.name }}</label>
              </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      whitelist: [],
      equipment: [
        { id: "barbell", name: "Barbell" },
        { id: "bench", name: "Barbell-Bench" },
        { id: "boxjump", name: "Boxjump" },
        { id: "kettlebell", name: "Kettlebell" },
        { id: "pool", name: "Pool" },
        { id: "pullupbar", name: "Pull-Up-Bar" },
        { id: "rings", name: "Rings" },
        { id: "rower", name: "Rowing Ergometer" },
        { id: "skippingrope", name: "Skipping rope" },
        { id: "wallball", name: "Wallball" }
      ],
    };
  },
  computed: {
    selectAllText: function() {
      return this.whitelist.length < this.equipment.length ? "Select All" : "Deselect All";
    }
  },
  methods: {
    selectAll: function () {
      console.log("Executing selectAll");
      var wlength = this.whitelist.length;
      this.whitelist.splice(0, wlength);

      if(wlength < this.equipment.length) {
        for(var i = 0; i < this.equipment.length; i++) {
          var item = this.equipment[i];
          this.whitelist.push(item.id);
        }
      }

      this.updateState();
    },
    updateState: function() {
      var blacklist = this.equipment
        .map(a => a.id)
        .filter(eq => !this.whitelist.includes(eq));

      this.$store.commit('SET_EQ_BLACKLIST', blacklist);
    }
  },
  mounted() {
    this.whitelist = [
      "barbell",
      "bench",
      "boxjump",
      "kettlebell",
      "pool",
      "pullupbar",
      "rings",
      "rower",
      "skippingrope",
      "wallball"
    ]
  }
};
</script>

<style>

</style>
