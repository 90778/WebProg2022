import axios from "axios";

// singleton speicher für alles
const state = {
    api: "https://age-of-empires-2-api.herokuapp.com/api/v1/",
    corsProxy: "https://thingproxy.freeboard.io/fetch/", // nicht mehr als 100.000 zeichen pro request && nicht mehr als 10 requests pro sekunde
    civilizations: [],
    units: [],
    structures: [],
    technologies: [],
    infoCardInformation: "LOADING",
    infoCardInformationArray: [],
    isProcessing: true,
    currentInfoCardClass: "",
};
// read only aus store
const getters = {
    getAllCivilizations: (state) => state.civilizations,
    getAllUnits:  (state) => state.units,
    getAllStructures:  (state) => state.structures,
    getAllTechnologies:  (state) => state.technologies,

    getInfoCardInformation(state) {
        return state.infoCardInformation;
    },

    getIsProcessing: (state) => state.isProcessing,
    getInfoCardInformationArray: (state) => state.infoCardInformationArray,
    getCurrentInfoCardClass: (state) => state.currentInfoCardClass,
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

    async setInfoCard({ commit }, newInfo) {
        commit('setInfoCardInformation', newInfo);
    },
    
    async changeInfoCard({ commit, dispatch }, obj) {
        if(state[obj.class].length == 0) { // calls the needed fetch fuction if there is no data
            await dispatch("fetchAll" + obj.class.charAt(0).toUpperCase() + obj.class.slice(1));
        }
        commit('changeInfoCardInformation', obj);
    },

    async setProcessing({ commit }, bool) {
        commit('setProcessingState', bool)
    },

    async nextInfoCard({ commit }) {
        commit('placeholder');
    }

};
//ändert/modifiziert den store
const mutations = {
    // only give an array into it
    setCivilizations: (state, civilizations) => (state.civilizations = civilizations),
    setUnits:  (state, units) => (state.units = units),
    setStructures:  (state, structures) => (state.structures = structures),
    setTechnologies:  (state, technologies) => (state.technologies = technologies),
    
    setInfoCardInformation: (state, newInfo) => (state.infoCardInformation = newInfo),
    changeInfoCardInformation(state, obj) {
        // save against out of range ids
        if(obj.id> state[obj.class].length || obj.id < 1) {
            console.log("nein");
            obj.id = state.infoCardInformation.id;
        }
        state.currentInfoCardClass = obj.class;
        for(let i = 0; i < state[obj.class].length; i++) {
            if(state[obj.class][i].id === obj.id) {
                state.infoCardInformation = state[obj.class][i];
            }
        }
        state.infoCardInformationArray = [];
        let counter = 0;
        for (let prop in state.infoCardInformation) {
            state.infoCardInformationArray[counter++] = prop;
        }

        //console.log("returned" + state[obj.class][0].id + " " + obj.class + obj.id);
    },
    
    setProcessingState: (state, bool) => (state.isProcessing = bool),
};

export default {
    state,
    getters,
    actions,
    mutations,
}