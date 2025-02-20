// store/index.js
import { createStore } from "vuex";
import axios from "axios";

// Utility function for debugging (optional)
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

export default createStore({
    state: {
        savedWods: [],
        wod: {},
        wodLoading: false,
        blacklistedEquipment: [],
    },
    mutations: {
        SET_WOD(state, wod) {
            state.wod = wod;
        },
        SET_EQ_BLACKLIST(state, items) {
            state.blacklistedEquipment = items;
        },
        SET_WOD_LOADING(state, isLoading) {
            state.wodLoading = isLoading;
        },
        SET_SAVED_WODS(state, wods) {
            state.savedWods = wods;
        },
    },
    actions: {
        async getWod({ commit, state }) {
            commit("SET_WOD_LOADING", true); // Use mutation instead of directly modifying state
            try {
                const response = await axios.get("wods.json");

                // Filter wods based on blacklist
                const validWods = response.data.filter((item) => {
                    if (!item.equipment) return true;

                    return !state.blacklistedEquipment.some((r) =>
                        item.equipment.includes(r)
                    );
                });

                console.log("Found wods: " + response.data.length);
                console.log("Valid wods: " + validWods.length);

                // Select a random WOD
                const wod = validWods[Math.floor(Math.random() * validWods.length)];

                commit("SET_WOD", wod);
            } catch (error) {
                console.error("Error fetching WODs:", error);
            } finally {
                commit("SET_WOD_LOADING", false);
            }
        },
    },
    modules: {},
});
