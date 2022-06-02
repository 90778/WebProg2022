import axios from "axios";

// singleton speicher für alles
const state = {
    todos: [
        {
            id:1,
            title: 'Todo One'
        },
        {
            id: 2,
            title: 'Todo Two'
        }   
    ],
    // no persisten data storage under this api
    api: "https://jsonplaceholder.typicode.com/todos",
};
// read only aus store
const getters = {
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(state.api);

        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post(state.api, { title, completed: false});

        commit('newTodo', response.data);
    },
    // removes element from the database but does not update the ui
    async deleteTodo({ commit }, id) {
        await axios.delete(state.api + `/${id}`);
        // call method to delete it also in the ui
        commit('removeTodo', id);
    },
    async filterTodos({ commit }, e) {
        // Get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        console.log(limit);

        const response = await axios.get(state.api + `?_limit=${limit}`);
        commit('setTodos', response.data);
    },
    // updTodo because you should't call the mutation the same as the action
    async updateTodo({ commit }, updTodo) {
        const response = await axios.put(state.api + `/${updTodo.id}`, updTodo);

        console.log(response.data);
        
        commit('updateTodo', response.data)
    }
};
//ändert/modifiziert den store
const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    // unshift adds new element to array
    newTodo: (state, todo) => state.todos.unshift(todo),
    // removes element from the ui
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    // placeholder does nothing
    nothing:(state) => state,

    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        // if the element is there
        if(index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}