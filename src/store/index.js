import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

// import wodData from 'wods.json';

Vue.use(Vuex);

// For debugging the spinner
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export default new Vuex.Store({
    state: { // available in complete app
        savedWods: [],
        wod: {},
        wodLoading: false,
        blacklistedEquipment: []
    },
    mutations: { // sync
        SET_WOD(state, wod) {
            state.wod = wod
        },
        SET_EQ_BLACKLIST(state, items) {
            state.blacklistedEquipment = items
        },
        SET_WOD_LOADING(state, isLoading) {
            state.wodLoading = isLoading
        },
        SET_SAVED_WODS(state, wods) {
            state.savedWods = wods
        }
    },
    actions: { // async
        async getWod({ commit, state }) {
            state.wodLoading = true;
            // await sleep(20000) For Debugging only
            axios.get("wods.json")
                .then((response) => {
                    // Get random wod based on blacklist

                    let validWods = response.data.filter(function(item) {
                        if (!item.equipment)
                            return true;

                        return !state.blacklistedEquipment.some(r => item.equipment.includes(r))
                    });

                    console.log("Found wods: " + response.data.length);
                    console.log("Valid wods: " + validWods.length);

                    var wod = validWods[Math.floor(Math.random() * validWods.length)];

                    commit('SET_WOD', wod)
                    state.wodLoading = false;
                }).catch(function(err) {
                    state.wodLoading = false;
                    return err
                });
        }
    },
    modules: {},
})