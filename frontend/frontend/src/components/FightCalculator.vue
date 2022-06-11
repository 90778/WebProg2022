<template>
    <div id="app">
        <div 
        v-for="item in getAllSortedByNameCivilizations" 
        :key="item.id">
        {{ item.name }}
        </div>
        <div class="grid-container">
            <div class="grid-item">
                <select id="CivilizationBlue">
                    <option>Kunst</option>
                    <option>Natur</option>
                </select>
            </div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
            <div class="grid-item">5</div>
            <div class="grid-item">6</div>
            <div class="grid-item">7</div>
            <div class="grid-item">8</div>
            <div class="grid-item">9</div>
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
        "fetchAllTechnologies",
        "sortAll"
        ]),

    },
    computed: {
        ...mapGetters([
        "getAllCivilizations",
        "getAllUnits",
        "getAllStructures",
        "getAllTechnologies",
        "getAllSortedByNameCivilizations",
        "getAllSortedByNameUnits",
        "getAllSortedByNameStructures",
        "getAllSortedByNameTechnologies",
        ])
    },
    
    created() {
        // sollte man auslagern
        this.fetchAllCivilizations();
        this.fetchAllUnits();
        this.fetchAllStructures();
        this.fetchAllTechnologies();
        this.sortAll();
    },

    methods: {
        test() {
            
        }
    },
}
</script>

<style>
.grid-container {
  display: grid;
}
</style>