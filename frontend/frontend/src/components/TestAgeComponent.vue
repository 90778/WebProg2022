<template>
    <div id="app">
        <div 
        v-for="item in getAllUnits" 
        :key="item.id">
        {{ item.name }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "TestAgeComponent",
    methods: {
        ...mapActions([
        "fetchAllCivilizations", 
        "fetchAllUnits", 
        "fetchAllStructures", 
        "fetchAllTechnologies"
        ]),

    },
    computed: {
        ...mapGetters([
        "getAllCivilizations",
        "getAllUnits",
        "getAllStructures",
        "getAllTechnologies"
        ])
    },
    
    created() {
        this.fetchAllCivilizations();
        this.fetchAllUnits();
        this.fetchAllStructures();
        this.fetchAllTechnologies();
    }
}
</script>

<style>

</style>