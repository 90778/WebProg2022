
<template>
    <div id=app>
        <AddTodo/>
        <FilterTodos/>
        <Todos/>
    </div>
</template>
<script>
import Todos from '@/components/Todos.vue';
import AddTodo from '@/components/AddTodo.vue';
import FilterTodos from '../components/FilterTodos.vue';

export default {
  name: 'app',
  components: {
    Todos,
    AddTodo,
    FilterTodos
  }
}
</script>

<style>
#app {
    text-align: center;
}

/* if screen size < 500px all todos are 1 column*/
@media (max-width: 500px) {
    .todos {
        grid-template-columns: 1fr;
    }
}
</style>