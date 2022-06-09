import axios from "axios";

// singleton speicher für alles
const state = {
    api: "https://age-of-empires-2-api.herokuapp.com/api/v1/",
    corsProxy: "https://thingproxy.freeboard.io/fetch/", // nicht mehr als 100.000 zeichen pro request && nicht mehr als 10 requests pro sekunde
    civilizations: [],
    units: [],
    structures: [],
    technologies: [],
};
// read only aus store
const getters = {
   getAllCivilizations: (state) => state.civilizations,
   getAllUnits:  (state) => state.units,
   getAllStructures:  (state) => state.structures,
   getAllTechnologies:  (state) => state.technologies,
};
// Instead of mutating the state, actions commit mutations
const actions = {
    async fetchAllCivilizations({ commit }) {
        const response = await axios.get(state.corsProxy + state.api + "civilizations");

        commit('setCivilizations', response.data.civilizations);
    },
    async fetchAllUnits({ commit }) {
        const response = await axios.get(state.corsProxy + state.api + "units");

        commit('setUnits', response.data.units);
    },
    async fetchAllStructures({ commit }) {
        const response = await axios.get(state.corsProxy + state.api + "structures");

        commit('setStructures', response.data.structures);
    },
    async fetchAllTechnologies({ commit }) {
        const response = await axios.get(state.corsProxy + state.api + "technologies");

        commit('setTechnologies', response.data.technologies);
    },


};
//ändert/modifiziert den store
const mutations = {
    // only give an array into it
    setCivilizations: (state, civilizations) => (state.civilizations = civilizations),
    setUnits:  (state, units) => (state.units = units),
    setStructures:  (state, structures) => (state.structures = structures),
    setTechnologies:  (state, technologies) => (state.technologies = technologies),
};

export default {
    state,
    getters,
    actions,
    mutations
}