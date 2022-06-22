<template>
    <div>
        <h2>Add Todo</h2>
        <div class="add">
            <form @submit="onSubmit">
                <v-text-field
                    id="input"
                    class="inputTodo"
                    :color="'red'"
                    label="Add Todo"
                    v-model="title"
                >
                </v-text-field>
                <v-btn type="submit" id="submitToDo" class="addButton mb-4" value="Submit">
                    Submit
                </v-btn>
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
