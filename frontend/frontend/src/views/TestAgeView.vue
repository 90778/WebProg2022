<template>
    <div id="app">
        <h2 class="mb-5">TestStuff</h2>
        <TestAgeComponent/>
    </div>
</template>

<script>
import TestAgeComponent from '../components/TestAgeComponent.vue'

export default {
    name: "app",
    components: {
        TestAgeComponent
    }
}
</script>

<style>

</style>
