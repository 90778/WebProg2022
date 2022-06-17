<template>
    <div id="app">
        <h2>This is the Wiki</h2>
        <Button @click="changeInfoCard(obj = {class: 'civilizations', id: 1})">Civilization</Button>
        <Button @click="changeInfoCard(obj = {class: 'units', id: 1})">Unit</Button>
        <Button @click="changeInfoCard(obj = {class: 'structures', id: 1})">Strategie</Button>
        <Button @click="changeInfoCard(obj = {class: 'technologies', id: 1})">Technologies</Button>
        <br>
        <Button>next</Button>
        <Button>prev</Button>
        <InfoCard/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import InfoCard from '@/components/InfoCard.vue';

export default {
    name: "TestAgeComponent",
    components: {
        InfoCard
    },

    methods: {
        ...mapActions([
        "fetchAllCivilizations", 
        "fetchAllUnits", 
        "fetchAllStructures", 
        "fetchAllTechnologies",
        "setInfoCard",
        "changeInfoCard",
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
button {
    border: 3px solid;
    width: 100px;
    height: 30px;
}
</style>