<template>
    <div id="app">
        <div class="grid-container">
            
            <div class="grid-item">
                <div v-for="name in getInfoCardInformationArray" :key="name.id">{{ formatNameSide(name) }}</div>
            </div>
            <div class="grid-item">
                <div class="info">
                    <!-- changes after generation to class psydoLink -->
                    <div v-for="name in getInfoCardInformation" :key="name.id">{{ parseInfoCardInfo(name) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "InfoCard",
    methods: {
        ...mapActions([
        "setInfoCard",
        "changeInfoCard",
        ]),

        formatNameSide(name) {
            let string = (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_/g, " ") + ":";
            return string;
        },

        parseInfoCardInfo(name) {
            if(name instanceof Array) {
                let nameArray = name.slice();
                if(name.length === 0) {
                    return "none";
                }
                for(let i = 0; i < name.length; i++ ) {
                    nameArray[i] = this.getNameFromLink(nameArray[i]);
                }
                return nameArray.toString();
            }
            if(name instanceof Object) {
                let dataArray = [];
                let splitArray = [];
                let json = JSON.stringify(name);
                // auf spliten der object parameter
                dataArray = json.replace(/"/g, "").replace(/{|}/g, "").split(",");

                for(let i = 0; i<dataArray.length; i++) {
                    // entfernen des : und auf spliten von name und wert
                    // split gibt eine array mit bezeichnung des Wertes und wert zurück
                    //z.B Gold:25 => [Gold][25]
                    splitArray[i] = dataArray[i].split(":");

                    let x = 0;
                    while(x < splitArray[i].length -1) {
                        // neu formatierung des dataArrays mit neu gesetztem :
                        dataArray[i] = splitArray[i][x] + ": ";
                        x++;
                    }
                    // hinzufügen des letzen elements des arrays (braucht kein ": ")
                    dataArray[i] = dataArray[i] + splitArray[i][x];
                }
                return dataArray.toString();
            }
            // string/number/etc.
            if(this.linkRegex.test(name) && !(name instanceof Object)) {
                return this.getNameFromLink(name);
            }
            //default
            return name;
        },

        getNameFromLink(string) {
            return string.replace(this.linkRegex, "").replace(/_/g, " ");
        },

    },

    data() {
        return {
            // regex sucht nach format https://age-of-empires-2-api.herokuapp.com/api/v1/??????????/ 
            linkRegex: /^[a-z]{1,5}[^\s\da-zA-Z]{1,3}[a-z]{1,3}[^\s\da-zA-Z][a-z]{1,2}[^\s\da-zA-Z][a-z]{1,7}[^\s\da-zA-Z]\d[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,9}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]\d[^\s\da-zA-Z][a-z]{1,13}./,
        }
    },

    mounted() {
        this.$parent.addLinkToApiLinks();
        console.log("InfoCard mounted");
    },

    computed: {
        ...mapGetters([
        "getInfoCardInformation",
        "getIsProcessing",
        "getInfoCardInformationArray",
        ])
    },
}
</script>

<style>
.psydoLink {
    color: blue;
    text-decoration: underline;

}

.grid-container {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px;
  padding: 10px;
  align-content: center;
}
</style>