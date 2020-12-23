import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// For debugging the spinner
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export default new Vuex.Store({
    state: { // available in complete app
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
        }
    },
    actions: { // async
        async getWod({ commit, state }) {
            state.wodLoading = true;
            // await sleep(20000) For Debugging only
            axios.get("api/wod/random", {
                params: {
                    blacklist: state.blacklistedEquipment
                }
            }).then((response) => {
                commit('SET_WOD', response.data)
                state.wodLoading = false;
            }).catch(function(err) {
                state.wodLoading = false;
                return err
            });
        }
    },
    modules: {},
})