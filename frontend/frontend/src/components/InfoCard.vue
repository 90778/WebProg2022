<template>
    <div id="app">
        <h2>I am an InfoCard</h2>
        
        <div class="grid-container1">
            <div class="grid-item1">
                <div v-for="parameter in getInfoCardInformation" :key="parameter.id">{{ parseCorrectInfoCardInformation( parameter ) }}</div>
            </div>
            <div class="grid-item1">
                <div v-for="name in getInfoCardInformationArray" :key="name.id">{{ name }}</div>
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

        x() {
            //Object.keys({ testObj })
            let counter = 0;
            for (let prop in this.getInfoCardInformation) {
                    //return prop;
                    this.arr[counter++] = prop;
                }
        },

        parseCorrectInfoCardInformation(element) {
            // Arrays
            if(element instanceof Array) {
                if(element.length === 0) {
                    return "none";
                }
                for(let i = 0; i < element.length; i++ ) {
                    element[i] = this.linkNameExtraction(element[i]);
                }
                return element.toString();
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
                    console.log(array2);
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
            linkRegex: /^[a-z]{1,5}[^\s\da-zA-Z]{1,3}[a-z]{1,3}[^\s\da-zA-Z][a-z]{1,2}[^\s\da-zA-Z][a-z]{1,7}[^\s\da-zA-Z]\d[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,9}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]{1,3}[^\s\da-zA-Z][a-z]\d[^\s\da-zA-Z][a-z]{1,13}./,
        }
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

</style>