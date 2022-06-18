<template>
    <div id="app">
        <h2>This is the Wiki</h2>
        <Button @click="x(obj = {class: 'civilizations', id: 1})">Civilization</Button>
        <Button @click="x(obj = {class: 'units', id: 1})">Unit</Button>
        <Button @click="x(obj = {class: 'structures', id: 1})">Strategie</Button>
        <Button @click="x({class: 'technologies', id: 1})">Technologies</Button>
        <br>
        <Button v-if="!getIsProcessing" @click="x(obj = {class: getCurrentInfoCardClass, id: (parseInt(getInfoCardInformation.id) + 1)})">next</Button>
        <Button v-if="!getIsProcessing" @click="x(obj = {class: getCurrentInfoCardClass, id: (parseInt(getInfoCardInformation.id) - 1)})">prev</Button>
        <InfoCard v-if="!getIsProcessing"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import InfoCard from '@/components/InfoCard.vue';

export default {
    name: "Wiki",
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
        "setProcessing",
        ]),

        x(obj) {
            this.changeInfoCard(obj);
            this.setProcessing(false);
            
        }

    },
    computed: {
        ...mapGetters([
        "getAllCivilizations",
        "getAllUnits",
        "getAllStructures",
        "getAllTechnologies",
        "getIsProcessing",
        "getInfoCardInformation",
        "getInfoCardInformationArray",
        "getCurrentInfoCardClass",
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