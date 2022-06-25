<template>
    <div id="app">
        <div class="grid-container">
            
            <div class="grid-item">
                <div v-for="name in getInfoCardInformationArray" :key="name.id">{{ (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_/g, " ") + ":"}}</div>
            </div>
            <div class="grid-item">
                <div ><!--class="info"-->
                    <!-- changes after generation to class psydoLink -->
                    <div v-for="parameter in getInfoCardInformation" :key="parameter.id">{{ parseCorrectInfoCardInformation(parameter) }}</div>
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

        parseCorrectInfoCardInformation(element) {
            // Arrays
            if(element instanceof Array) {
                let array = element.slice();
                if(element.length === 0) {
                    return "none";
                }
                for(let i = 0; i < element.length; i++ ) {
                    array[i] = this.linkNameExtraction(array[i]);
                }
                return array.toString();
            }
            // Object
            if(element instanceof Object) {
                let array = [];
                let array2 = [];
                let json = JSON.stringify(element);
                // auf spliten der object parameter
                array = json.replace(/"/g, "").replace(/{|}/g, "").split(",");

                for(let i = 0; i<array.length; i++) {
                    // entfernen des : und auf spliten von name und wert
                    array2[i] = array[i].split(":")
                    let x = 0;
                    while(x < array2[i].length -1) {
                        array[i] = array2[i][x] + ": "
                        x++;
                    }
                    // hinzufügen des letzen elements des arrays (braucht kein ": ")
                    array[i] = array[i] + array2[i][x];
                }
                return array.toString();
            }
            // string/number/etc.
            if(this.linkRegex.test(element) && !(element instanceof Object)) {
                return this.linkNameExtraction(element);
            }
            //default
            return element;
        },

        linkNameExtraction(string) {
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
        this.$parent.change();
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