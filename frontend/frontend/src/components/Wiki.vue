<template>
    <div id="app">
        <h2>This is the Wiki</h2>
        <Button @click="getInfoCard(obj = {class: 'civilizations', id: 1})">Civilization</Button>
        <br>
        <div v-if="getCurrentInfoCardClass === 'civilizations'">
            <div>hi</div>
            <br>
        </div>
        <Button @click="getInfoCard(obj = {class: 'units', id: 1})">Unit</Button>
        <br>
        <div v-if="getCurrentInfoCardClass === 'units'">
            <div>hi</div>
            <br>
        </div>
        <Button @click="getInfoCard(obj = {class: 'structures', id: 1})">Structures</Button>
        <br>
        <div v-if="getCurrentInfoCardClass === 'structures'">
            <div>hi</div>
            <br>
        </div>
        <Button @click="getInfoCard({class: 'technologies', id: 1})">Technologies</Button>
        <br>
        <div v-if="getCurrentInfoCardClass === 'technologies'">
            <div>hi</div>
            <br>
        </div>
        <Button v-if="!getIsProcessing" @click="getInfoCard(obj = {class: getCurrentInfoCardClass, id: (parseInt(getInfoCardInformation.id) + 1)})">next</Button>
        <Button v-if="!getIsProcessing" @click="getInfoCard(obj = {class: getCurrentInfoCardClass, id: (parseInt(getInfoCardInformation.id) - 1)})">prev</Button>
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

    data() {
        return {
            linkRegex: /^[a-z]{1,5}[^\s\da-zA-Z]{1,3}[a-z]{1,3}[^\s\da-zA-Z][a-z]{1,2}[^\s\da-zA-Z][a-z]{1,7}[^\s\da-zA-Z]\d[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,9}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]\d./, //[^\s\da-zA-Z][a-z]\d[^\s\da-zA-Z][a-z]{1,13}
        }
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



        change() {
            //console.log(document.getElementsByClassName("psydoLink"));
            let domElement = document.getElementsByClassName("info");
            if(typeof domElement['0'] == 'undefined') {
                return;
            }
            let counter = 0;
            let info = this.getInfoCardInformation2;
            for(let item in info) {
            /*console.log(Object.keys(info).length);
            for(let x = 0; x < Object.keys(info).length; x++) {
                let item = Object.keys(info)[x];*/
                //reset all classes
                //console.log(counter);
                //console.log(domElement['0'].children);
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
            
        },

        getInfoCard(obj) {
            this.changeInfoCard(obj).then(() => {this.change()});
            //this.change();
        },

        setThisInfoCard(obj) {
            this.setInfoCard(obj).then(() => {this.change()});
            //this.change();
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
        if(sessionStorage.getItem('isProcessing') === null) {
            sessionStorage.setItem('isProcessing', true)
        }
        if(sessionStorage.getItem('infoCardInformation') === null) {
            let obj = {0: "Loading"}
            sessionStorage.setItem('infoCardInformation', JSON.stringify(obj))
        }
        if(sessionStorage.getItem('currentInfoCardClass') === null) {
            sessionStorage.setItem('currentInfoCardClass', "");
        }
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