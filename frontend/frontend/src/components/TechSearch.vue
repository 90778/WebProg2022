<template>
    <div id="app">
        <h1>Select your unit</h1>
        <select id="chosenUnit" v-model="chosenUnit" @change="getAllTechsForUnit()" >
            <option v-for="item in getAllUnits" :key="item.id" :value="item.name">{{ item.name }}</option>
        </select>
        <h3 v-if="!hideText">These technologies influence the unit:</h3>
        <div id="allTechs" class="psydoLink" v-for="item in allTechsForUnit" :key="item.id">
            
            <a @click="RedirectURL(item)">{{ item.name }}</a>
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
        "setInfoCard",
        "changeInfoCard",
        "setProcessing",
        ]),

        getAllTechsForUnit() {
            //remove all entrys to array
            this.allTechsForUnit.splice(0, this.allTechsForUnit.length);
            let unit = document.getElementById("chosenUnit").value;
            for(let i = 0; i < this.getAllTechnologies.length; i++) {
                if("applies_to" in this.getAllTechnologies[i]) {
                    for(let x = 0; x < this.getAllTechnologies[i].applies_to.length; x++) {
                        if(this.getAllTechnologies[i].applies_to[x].toLowerCase().replace(" ", "_").includes("/" + unit.toLowerCase().replace(" ", "_"))) {
                        this.allTechsForUnit.push(this.getAllTechnologies[i]);
                        } 
                    }
                } 
            }
            if(this.allTechsForUnit.length === 0){
                let obj = {name: this.noUpgradeDefault, id: -1};
                this.allTechsForUnit.push(obj);
            }
            this.hideText = false;
        },

        RedirectURL(clickedItem) {
            if(clickedItem.name == this.noUpgradeDefault) {
                console.log("no redirect link because no techs")
                return;
            }
            this.SessionStorage(clickedItem);
            window.location = this.testURL;
        },
    
        SessionStorage(clickedItem) {
            let obj = {class: 'technologies', id: clickedItem.id}
            this.getInfoCard(obj);
            sessionStorage.clear();
            sessionStorage.setItem('infoCardInformation', JSON.stringify(this.getInfoCardInformation));
            sessionStorage.setItem('isProcessing', false);
            sessionStorage.setItem('currentInfoCardClass', 'technologies');
            sessionStorage.setItem('infoCardInformationArray', JSON.stringify(this.getInfoCardInformationArray))
        },

    getInfoCard(obj) {
        if(obj.id === -1) {
            console.log("no entry to jump to")
            return;
        }
        this.changeInfoCard(obj);
    },

},
    data() {
        return {
            chosenUnit: '',
            allTechsForUnit: [],
            testURL: "./wikiView",
            linkRegex: /^[a-z]{1,5}[^\s\da-zA-Z]{1,3}[a-z]{1,3}[^\s\da-zA-Z][a-z]{1,2}[^\s\da-zA-Z][a-z]{1,7}[^\s\da-zA-Z]\d[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,9}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]\d./, //[^\s\da-zA-Z][a-z]\d[^\s\da-zA-Z][a-z]{1,13}
            getInfoData: [],
            noUpgradeDefault: "There are no new Upgrades",
            hideText: true,
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
        "getInfoCardInformation2",
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
.psydoLink {
    color: blue;
    text-decoration: underline;
    font-size: 30px;
}
</style>