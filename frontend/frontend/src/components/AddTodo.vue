<template>
    <div>
        <h3>Add Todo</h3>
        <div class="add">
            <form @submit="onSubmit">
                <input type="text" v-model="title" placeholder="Add Todo"/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "AddTodo",
    data() {
        return {
            // two way databinding wit v-model in input
            title: ''
        }
    },
    methods: {
        ...mapActions(['addTodo']),
        onSubmit(e) {
            // prevent empty submissions
            e.preventDefault();
            this.addTodo(this.title);
        }
    }
}
</script>

<style>
input[type="text"] {
    flex: 10;
    border: 1px solid #41b883;
}

input[type="submit"] {
    flex: 2;
    background: greenyellow;
}
</style>