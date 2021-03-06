import Vuex from 'vuex';
import Vue from 'vue';
import vuexModules from './modules/vuexModules';
import Modules from './modules/modules'

// Load Vuex
Vue.use(Vuex);

//Tutorial Quelle: https://www.youtube.com/watch?v=5lVQgZzLMHc
// create store
export default new Vuex.Store({
    modules: {
        vuexModules,
        Modules
    }
})