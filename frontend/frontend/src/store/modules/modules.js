import axios from "axios";

// singleton speicher für alles
const state = {
    api: "https://age-of-empires-2-api.herokuapp.com/api/v1/",
    corsProxy: "https://thingproxy.freeboard.io/fetch/", // nicht mehr als 100.000 zeichen pro request && nicht mehr als 10 requests pro sekunde
    civilizations: [],
    units: [],
    structures: [],
    technologies: [],
    sortedByNameCivilizations: [],
    sortedByNameUnits: [],
    sortedByNameStructures: [],
    sortedByNameTechnologies: [],
};
// read only aus store
const getters = {
   getAllCivilizations: (state) => state.civilizations,
   getAllUnits:  (state) => state.units,
   getAllStructures:  (state) => state.structures,
   getAllTechnologies:  (state) => state.technologies,

   getAllSortedByNameCivilizations: (state) => state.sortedByNameCivilizations,
   getAllSortedByNameUnits:  (state) => state.sortedByNameUnits,
   getAllSortedByNameStructures:  (state) => state.sortedByNameStructures,
   getAllSortedByNameTechnologies:  (state) => state.sortedByNameTechnologies,
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
    // commit, dispatch
    async sortAll({ commit , dispatch}) {
        // needs to wait until infos are there
        await dispatch('fetchAllCivilizations');
        await dispatch('fetchAllUnits');
        await dispatch('fetchAllStructures');
        await dispatch('fetchAllTechnologies');
        commit('sortByNameArray');
    },


};
//ändert/modifiziert den store
const mutations = {
    // only give an array into it
    setCivilizations: (state, civilizations) => (state.civilizations = civilizations),
    setUnits:  (state, units) => (state.units = units),
    setStructures:  (state, structures) => (state.structures = structures),
    setTechnologies:  (state, technologies) => (state.technologies = technologies),
    
    sortByNameArray(state) {
        state.sortedByNameCivilizations = state.civilizations;
        state.sortedByNameCivilizations.sort((a, b) => a.name.localeCompare(b.name));
        state.sortedByNameUnits = state.units;
        state.sortedByNameUnits = state.units.sort((a, b) => a.name.localeCompare(b.name));
        state.sortedByNameStructures = state.structures;
        state.sortedByNameStructures = state.structures.sort((a, b) => a.name.localeCompare(b.name));
        state.sortedByNameTechnologies = state.technologies;
        state.sortedByNameTechnologies = state.technologies.sort((a, b) => a.name.localeCompare(b.name));

        //state[arrays.sortedArray] = state[arrays.toBeSorted].sort((a, b) => a.firstname.localeCompare(b.firstname));
    }
}
                        

export default {
    state,
    getters,
    actions,
    mutations
}