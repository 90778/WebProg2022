<template>
    <div id="app">
        <h1>BuildingCalculator</h1>
        <BuildingCostCalculator/>
    </div>
</template>

<script>
import BuildingCostCalculator from '../components/BuildingCostCalculator.vue'

export default {
    name: "app",
    components: {
        BuildingCostCalculator
    }
}
</script>

<style>

</style>