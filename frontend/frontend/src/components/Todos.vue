
<template>
    <div id=app>
        <h2>Todos</h2>
        <div class="todos">
            <!-- all new todos will have the same id -->
            <div 
                @dbclick="onDblClick(todo)" 
                v-for="todo in allTodos" 
                :key="todo.id" 
                class="todo"
                v-bind:class="{'is-complete':todo.completed}"><!-- if todo.completed is true then the class is-complete is bound to this div -->
                {{ todo.title }}
                <button @click="deleteTodo(todo.id)" style="background-color: #DC985E;" class="btn">delete</button>
            </div>
        </div>
    </div>
</template>
<script>
// maps getters from vuex to the component
import { mapGetters } from "vuex";
// maps actions from vuex to the component
import { mapActions } from "vuex";

export default {
    name: "Todos",
    methods: {
        // ... is the space operator for multiple actions
        ...mapActions(["fetchTodos", "deleteTodo", "updTodo"]),
        onDblClick(todo) {
            const updTodo = {
                id: todo.id,
                title: todo.title,
                completed: !todo.completed
            }
            // gives the change object back
            this.updateTodo(updTodo);
        }
    },
    // choosing what getters needs to be used with computed
    // gehört zu vuex
    computed: mapGetters(["allTodos"]),
    // wird aufgerufen bevor
    // gehört zu vue
    created() {
        this.fetchTodos();
    }
}
</script>

<style>
#app {
    text-align: center;
}

.is-complete {
    background: #35495e;
    color: #fff;
}
</style>