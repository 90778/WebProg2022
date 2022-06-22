<template>
    <div>
        Filter Todos:
        <!-- everytime something new is selected the event will be passed down to the method filterTodos-->
        <select class="filterTodo" @change="filterTodos($event)">
            <option value="200">200</option>
            <option value="200">100</option>
            <option value="200">20</option>
            <option value="200">10</option>
            <option value="200" default>5</option>
        </select>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "FilterTodos",
    methods: mapActions(["filterTodos"]),
}
</script>
