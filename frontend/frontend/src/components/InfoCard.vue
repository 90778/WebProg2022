<template>
    <div id="app">
        <h2>I am an InfoCard</h2>
        
        <div class="grid-container1">
            <div class="grid-item1">
                <div v-for="parameter in getInfoCardInformation" :key="parameter.id">{{ parseCorrectInfoCardInformation(parameter ) }}</div>
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
            if(element instanceof Array) {
                if(element.length === 0) {
                    return "none";
                }else{
                    return element;
                }
                // link
                /*let name = "";
                name = 
                this.getAllTechnologies[i].applies_to[x].toLowerCase().replace(" ", "_").includes("/" + unit.toLowerCase().replace(" ", "_")));*/
            } 
            //default
            return element;
        },

        showInfo() {
            let info = this.getInfoCardInformation['name'];
            return info;
        },

    },

    data() {
        return {
            testObj: {
            t: 4,
            dd: 2,
            r: 3,
            },
            arr: [],
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