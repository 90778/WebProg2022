<template>
    <div id="app">
        <h2>test</h2>
        <select id="chosenUnit" v-model="chosenUnit" @change="getAllTechsForUnit()" >
            <option v-for="item in getAllUnits" :key="item.id" :value="item.name">{{ item.name }}</option>
        </select>
        <div class="psydoLink" v-for="item in allTechsForUnit" :key="item.id">
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
        "createDynamicURL",
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
                    console.log()
                    for(let x = 0; x < this.getAllTechnologies[i].applies_to.length; x++) {
                        if(this.getAllTechnologies[i].applies_to[x].toLowerCase().replace(" ", "_").includes("/" + unit.toLowerCase().replace(" ", "_"))) {
                        this.allTechsForUnit.push(this.getAllTechnologies[i]);
                        } 
                    }
                }else{
                    //console.log(this.getAllTechnologies[i].name + " has no Unit it applies to");
                }
                
            }
            if(this.allTechsForUnit.length === 0){
                let obj = {name: this.noUpgradeDefault, id: -1};
                this.allTechsForUnit.push(obj);
            }
            //console.log(this.allTechsForUnit);
        },
        //Quelle: https://stackoverflow.com/questions/20834002/building-dynamic-url-using-a-href
        RedirectURL(clickedItem) {
            if(clickedItem.name == this.noUpgradeDefault) {
                console.log("no redirect link because no techs")
                return;
            }
            this.SessionStorage(clickedItem);
            this.createDynamicURL(this.testURL);
            window.location = this.getNewURL;
        },
    
        SessionStorage(clickedItem) {
            console.log("writing");
            let obj = {class: 'technologies', id: clickedItem.id}
            this.getInfoCard(obj);
            // entfernen nach testen
            sessionStorage.clear();
            sessionStorage.setItem('infoCardInformation', JSON.stringify(this.getInfoCardInformation));
            sessionStorage.setItem('isProcessing', false);
            sessionStorage.setItem('currentInfoCardClass', 'technologies');
        },

    getInfoCard(obj) {
        if(obj.id === -1) {
            console.log("no entry to jump to")
            return;
        }
        console.log(obj);
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

.psydoLink {
    color: blue;
    text-decoration: underline;

}

</style>