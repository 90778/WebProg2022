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
            window.location = this.testURL;
        },
    
        SessionStorage(clickedItem) {
            let obj = {class: 'technologies', id: clickedItem.id}
            this.getInfoCard(obj);
            // entfernen nach testen
            sessionStorage.clear();
            sessionStorage.setItem('infoCardInformation', JSON.stringify(this.getInfoCardInformation));
            sessionStorage.setItem('isProcessing', false);
            sessionStorage.setItem('currentInfoCardClass', 'technologies');
            sessionStorage.setItem('infoCardInformationArray', JSON.stringify(this.getInfoCardInformationArray))
        },

    /*change() {
        //console.log(document.getElementsByClassName("psydoLink"));
        let domElement = document.getElementsByClassName("redirect");
        if(typeof domElement['0'] == 'undefined') {
            return;            }
        let counter = 0;
        let info = this.getInfoCardInformation2;
        for(let item in info) {
            domElement['0'].children[counter].className = "test";
            //console.log(domElement['0'].children.length);

            if(info[item] instanceof Array) {
                for(let i = 0; i < info[item].length; i++ ) {
                    // wenn link dann
                    if(this.linkRegex.test(info[item])) {
                        let split = info[item][i].replace(this.linkRegex, "").split("/");
                        //setInfocardInformation
                        
                        domElement['0'].children[counter].addEventListener("click", () => {this.setThisInfoCard({class: split[0] + "s", name: split[1]})});
                        domElement['0'].children[counter].className = "psydoLink";
                            
                    }
                }
            }else{
                if(this.linkRegex.test(info[item])) {
                    let split = info[item].replace(this.linkRegex, "").split("/");
                    //setInfocardInformation
                    domElement['0'].children[counter].addEventListener("click", () => {this.setThisInfoCard({class: split[0] + "s", name: split[1]})});
                    domElement['0'].children[counter].className = "psydoLink";
                }
            }
            counter++;
        }
            
    },*/

    getInfoCard(obj) {
        if(obj.id === -1) {
            console.log("no entry to jump to")
            return;
        }
        this.changeInfoCard(obj);
    },

    /*setThisInfoCard(obj) {
        this.setInfoCard(obj).then(() => this.change());
    },*/
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