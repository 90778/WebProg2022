<template>
    <div id="app">
        <h2>I am an InfoCard</h2>
        
        <div v-for="parameter in getInfoCardInformation" :key="parameter.id">{{ getInfoCardInformation[parameter] + showInfo() }}</div>
        <div class="grid-container1">
            <div class="grid-item1">1</div>
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

        },

        showInfo() {
            let info = this.getInfoCardInformation.id;

            return info;
        },

    },

    computed: {
        ...mapGetters([
        "getInfoCardInformation",
        ])
    },
}
</script>

<style>

</style>