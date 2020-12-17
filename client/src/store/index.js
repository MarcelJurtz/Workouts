import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // available in complete app
        wod: {},
        blacklistedEquipment: []
    },
    mutations: { // sync
        SET_WOD(state, wod) {
            state.wod = wod
        },
        SET_EQ_BLACKLIST(state, items) {
            state.blacklistedEquipment = items
        }
    },
    actions: { // async
        getWod({ commit, state }) {
            axios.get("api/wod/random", {
                params: {
                    blacklist: state.blacklistedEquipment
                }
            }).then((response) => {
                commit('SET_WOD', response.data)
            });
        }
    },
    modules: {},
})