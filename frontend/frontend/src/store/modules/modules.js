import axios from "axios";

// singleton speicher für alles
const state = {
    api: "https://age-of-empires-2-api.herokuapp.com/api/v1/",
    corsProxy: "https://cors-anywhere.herokuapp.com/",// <= cors proxy für netlify https://cors-anywhere.herokuapp.com/corsdemo
    //corsProxy: "https://thingproxy.freeboard.io/fetch/",// <= cors proxy für lokalen start 
    // nicht mehr als 100.000 zeichen pro request && nicht mehr als 10 requests pro sekunde
    civilizations: [],
    units: [],
    structures: [],
    technologies: [],
    sortedByNameCivilizations: [],
    sortedByNameStructures: [],
    sortedByNameTechnologies: [],
    sortedByNameUnits: [],
    newURL: '',
    infoCardInformation: JSON.parse(sessionStorage.getItem('infoCardInformation')),
    infoCardInformation2: JSON.parse(sessionStorage.getItem('infoCardInformation')),
    infoCardInformationArray: JSON.parse(sessionStorage.getItem('infoCardInformationArray')),
    isProcessing: (sessionStorage.getItem('isProcessing') === 'true'),
    currentInfoCardClass: sessionStorage.getItem('currentInfoCardClass'),
};
// read only aus store
const getters = {
    getAllSortedByNameCivilizations: (state) => state.sortedByNameCivilizations,
    getAllSortedByNameUnits:  (state) => state.sortedByNameUnits,
    getAllSortedByNameStructures:  (state) => state.sortedByNameStructures,
    getAllSortedByNameTechnologies:  (state) => state.sortedByNameTechnologies,
    getAllCivilizations: (state) => state.civilizations,
    getAllUnits:  (state) => state.units,
    getAllStructures:  (state) => state.structures,
    getAllTechnologies:  (state) => state.technologies,

    getInfoCardInformation(state) {
        return state.infoCardInformation;
    },

    getInfoCardInformation2: (state) => state.infoCardInformation2,

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
    // commit, dispatch
    async sortAll({ commit , dispatch}) {
        // needs to wait until infos are there
        await dispatch('fetchAllCivilizations');
        await dispatch('fetchAllUnits');
        await dispatch('fetchAllStructures');
        await dispatch('fetchAllTechnologies');
        commit('sortByNameArray');
    },

    async createDynamicURL({ commit }, newURL) {
        commit('setNewURL', newURL);
    },
    
    async setInfoCard({ commit, dispatch }, obj) {
        obj.name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1); 
    


        let split = obj.name.split("_")
        obj.name = "";
        for(let x = 0; x < split.length; x++) {
            obj.name += (split[x].charAt(0).toUpperCase() + split[x].slice(1));
            if(x < split.length - 1) {
                obj.name += " ";
            }
        }

        if(state[obj.class].length == 0) { // calls the needed fetch fuction if there is no data
            await dispatch("fetchAll" + obj.class.charAt(0).toUpperCase() + obj.class.slice(1));
        }
        commit('setInfoCardInformation', obj);
        commit('setProcessingState', false);
    },
    
    async changeInfoCard({ commit, dispatch }, obj) {
        if(state[obj.class].length == 0) { // calls the needed fetch fuction if there is no data
            await dispatch("fetchAll" + obj.class.charAt(0).toUpperCase() + obj.class.slice(1));
        }
        commit('changeInfoCardInformation', obj);
        commit('setProcessingState', false);
    },

    async setProcessing({ commit }, bool) {
        commit('setProcessingState', bool)
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
        state.sortedByNameUnits.sort((a, b) => a.name.localeCompare(b.name));
        state.sortedByNameStructures = state.structures;
        state.sortedByNameStructures.sort((a, b) => a.name.localeCompare(b.name));
        state.sortedByNameTechnologies = state.technologies;
        state.sortedByNameTechnologies.sort((a, b) => a.name.localeCompare(b.name));
    },

    setNewURL: (state, newURL) => (state.newURL = newURL),
    //obj => class / name
    setInfoCardInformation(state, obj) {
        console.log(obj.class + " " + obj.name);
        state.currentInfoCardClass = obj.class;
        for(let i = 0; i < state[obj.class].length; i++) {
            if(state[obj.class][i].name === obj.name) {
                state.infoCardInformation = state[obj.class][i];
                state.infoCardInformation2 = JSON.parse(JSON.stringify(state.infoCardInformation));
            }
        }
        state.infoCardInformationArray = [];
        let counter = 0;
        for (let prop in state.infoCardInformation) {
            state.infoCardInformationArray[counter++] = prop;
        }
    },
    //obj => class / id
    changeInfoCardInformation(state, obj) {
        // save against out of range ids
        if(obj.id> state[obj.class].length || obj.id < 1) {
            console.log("keine weiteren daten in dieser richtung vorhanden");
            obj.id = state.infoCardInformation.id;
        }
        state.currentInfoCardClass = obj.class;
        for(let i = 0; i < state[obj.class].length; i++) {
            if(state[obj.class][i].id === obj.id) {
                state.infoCardInformation = state[obj.class][i];
                state.infoCardInformation2 = JSON.parse(JSON.stringify(state.infoCardInformation));
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
    setInfoCardDataLoading: (state) => (state.infoCardInformation = state.infoCardInformation2 = "LOADING"),
};                        

export default {
    state,
    getters,
    actions,
    mutations,
}