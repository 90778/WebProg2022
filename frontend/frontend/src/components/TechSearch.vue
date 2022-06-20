<template>
    <div id="app">
        <h2>test</h2>
        <select id="chosenUnit" v-model="chosenUnit" @change="getAllTechsForUnit()" >
            <option v-for="item in getAllUnits" :key="item.id" :value="item.name">{{ item.name }}</option>
        </select>
        <div v-for="item in allTechsForUnit" :key="item.id">
            <a href="#" @click="RedirectURL()">{{ item }}</a>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "TechSearch",
    methods: {
        ...mapActions([
        "fetchAllCivilizations", 
        "fetchAllUnits", 
        "fetchAllStructures", 
        "fetchAllTechnologies",
        "createDynamicURL",
        ]),

        getAllTechsForUnit() {
            //remove all entrys to array
            this.allTechsForUnit.splice(0, this.allTechsForUnit.length);
            let unit = document.getElementById("chosenUnit").value;
            for(let i = 0; i < this.getAllTechnologies.length; i++) {
                if("applies_to" in this.getAllTechnologies[i]) {
                    for(let x = 0; x < this.getAllTechnologies[i].applies_to.length; x++) {
                        if(this.getAllTechnologies[i].applies_to[x].toLowerCase().replace(" ", "_").includes("/" + unit.toLowerCase().replace(" ", "_"))) {
                        this.allTechsForUnit.push(this.getAllTechnologies[i].name + " id:" + (i+1));
                        } 
                    }
                }else{
                    //console.log(this.getAllTechnologies[i].name + " has no Unit it applies to");
                }
                
            }
            if(this.allTechsForUnit.length === 0){
                this.allTechsForUnit.push("There are no new Upgrades");
            }
        },
        //Quelle: https://stackoverflow.com/questions/20834002/building-dynamic-url-using-a-href
        RedirectURL() {
            console.log(3);
            this.createDynamicURL(this.testURL);
            window.location = this.getNewURL;
        }
    },

    data() {
        return {
            chosenUnit: '',
            allTechsForUnit: [],
            testURL: "https://test",
        }
    },

    computed: {
        ...mapGetters([
        "getAllCivilizations",
        "getAllUnits",
        "getAllStructures",
        "getAllTechnologies",
        "getNewURL",
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
select {
    background-color: aqua;
    width: 15%;
    height: 30px;
    text-align: center;
}

</style>