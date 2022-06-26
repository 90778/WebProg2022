<template>
    <div @change="changeButtonColor()" @click="changeButtonColor()" id="allButtons">
        <h2>This is the Age of Empires II Wiki</h2>
        <Button id="civilizations" @click="getInfoCard(obj = {class: 'civilizations', id: 1})">Civilization</Button>
        <br>
        <Button id="units" @click="getInfoCard(obj = {class: 'units', id: 1})">Unit</Button>
        <br>
        <Button id="structures" @click="getInfoCard(obj = {class: 'structures', id: 1})">Structures</Button>
        <br>
        <Button id="technologies" @click="getInfoCard({class: 'technologies', id: 1})">Technologies</Button>
        <br>
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
            linkRegex: /^[a-z]{1,5}[^\s\da-zA-Z]{1,3}[a-z]{1,3}[^\s\da-zA-Z][a-z]{1,2}[^\s\da-zA-Z][a-z]{1,7}[^\s\da-zA-Z]\d[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,9}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]\d./,
            buttonColor: "#04aee7cc",
            buttonClickedColor: "#0290c0",
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

        changeButtonColor() {

            let civilizationButton = document.getElementById("civilizations");
            let unitButton = document.getElementById("units");
            let structureButton = document.getElementById("structures");
            let technologieButton = document.getElementById("technologies");

            civilizationButton.style.background = this.buttonColor;
            unitButton.style.background = this.buttonColor;
            structureButton.style.background = this.buttonColor;
            technologieButton.style.background = this.buttonColor;

            document.getElementById(this.getCurrentInfoCardClass).style.background = this.buttonClickedColor;
        },

        addLinkToApiLinks() {
            let infoCardInfoElement = document.getElementsByClassName("info")['0'];
            if(typeof infoCardInfoElement === undefined) {
                return;
            }
            let counter = 0;
            let info = this.getInfoCardInformation2;
            for(let item in info) {
                let infoCardData = info[item];
                infoCardInfoElement.children[counter].className = "test";


                if(infoCardData instanceof Array) {
                    for(let i = 0; i < infoCardData.length; i++ ) {
                        // wenn link dann
                        if(this.linkRegex.test(infoCardData)) { 
                            let split = infoCardData[i].replace(this.linkRegex, "").split("/");
                            //setInfocardInformation
                            infoCardInfoElement.children[counter].addEventListener("click", () => {this.setThisInfoCard({class: split[0] + "s", name: split[1]})});
                            infoCardInfoElement.children[counter].className = "psydoLink";
                        }
                    }
                }else{
                    
                    if(this.linkRegex.test(infoCardData)) {
                        let split = infoCardData.replace(this.linkRegex, "").split("/");
                        //setInfocardInformation
                        infoCardInfoElement.children[counter].addEventListener("click", () => {this.setThisInfoCard({class: split[0] + "s", name: split[1]})});
                        infoCardInfoElement.children[counter].className = "psydoLink";
                    }
                }
                counter++;
            }
            
        },

        getInfoCard(obj) {
            this.changeInfoCard(obj).then(() => {this.addLinkToApiLinks()});
        },

        setThisInfoCard(obj) {
            this.setInfoCard(obj).then(() => {this.addLinkToApiLinks()});
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

    mounted() {
        this.changeButtonColor()
    },
    
    created() {
        this.fetchAllCivilizations();
        this.fetchAllUnits();
        this.fetchAllStructures();
        this.fetchAllTechnologies();

        if(sessionStorage.getItem('isProcessing') === null) {
            sessionStorage.setItem('isProcessing', true)
            this.setProcessing(true);
        }
        if(sessionStorage.getItem('infoCardInformation') === null) {
            let obj = {0: "Loading"}
            sessionStorage.setItem('infoCardInformation', JSON.stringify(obj))
        }
        if(sessionStorage.getItem('currentInfoCardClass') === null) {
            sessionStorage.setItem('currentInfoCardClass', "");
        }
        if(sessionStorage.getItem('infoCardInformationArray') === null) {
            sessionStorage.setItem('infoCardInformationArray', JSON.stringify([]));
        }
    }
}
</script>

<style>

</style>