<template>
    <div id="app">
        <!-- <div 
        v-for="item in getAllSortedByNameCivilizations" 
        :key="item.id">
        {{ item.name }}
        </div> -->
        <div class="grid-container">
            <div id="blue">
                <div class="grid-item">
                    <select id="civilizationBlue">
                        <option>Civ1</option>
                        <option>Civ2</option>
                    </select>
                </div>
                <div class="grid-item">
                    <select id="unitBlue">
                        <option>Unit1</option>
                        <option>Unit2</option>
                    </select>
                </div>
                <div class="grid-item">
                    <input v-model="blueNumberOfUnits" placeholder="Anzahl Units"> 
                </div> 
                <div class="grid-item">
                    <input v-model="blueBonusAttack" placeholder="Unit Bonus Attack"> 
                </div>
            </div>
            <div id="red">
                <div class="grid-item">
                    <select id="civilizationRed">
                        <option>Civ1</option>
                        <option>Civ2</option>
                    </select>
                </div>
                <div class="grid-item">
                    <select id="unitRed">
                        <option>Unit1</option>
                        <option>Unit2</option>
                    </select>
                </div>
                <div class="grid-item">
                    <input v-model="blueNumberOfUnits" placeholder="Anzahl Units"> 
                </div> 
                <div class="grid-item">
                    <input v-model="blueBonusAttack" placeholder="Unit Bonus Attack"> 
                </div>
            </div>
            <div class="grid-item">Ergebnis</div>
        </div> 
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "TestAgeComponent",
    methods: {
        ...mapActions([
        "fetchAllCivilizations", 
        "fetchAllUnits", 
        "fetchAllStructures", 
        "fetchAllTechnologies",
        "sortAll"
        ]),

        getCount() {
            return this.count;
        },

        calculateFight() {
            let armyHpBlue = this.blueUnit.hit_points;
            let armyHpRed = this.redUnit.hit_points;

            // bonus are to inconsistent in json to be useful
            /*attackBonusBlue = 0;
            attackBonusRed = 0;

            for(i = 0; i < blueUnit.attack_Bonus.Length; i++) {
                if(blueUnit.attack_Bonus[i] === redUnit.name )
            }*/

            // bestimmung des Armee typs durch das spawn gebäude?
            // DPS
            let armyAttackBlue = this.blueUnit.attack / this.blueUnit.reload_time;
            // attack = (if((attack - gegnerArmor) <== 0){1}else{attack - gegnerArmor} + bonusdamage) / reload_time
            let armyAttackRed = this.redUnit.attack / this.redUnit.reload_time;


            //https://de.wikipedia.org/wiki/Gesetz_von_Lanchester
            let resultOfFight = (this.blueNumberOfUnits*this.blueNumberOfUnits*armyAttackBlue*armyHpBlue) - (this.redNumberOfUnits*this.redNumberOfUnits*armyAttackRed*armyHpRed);
            if(resultOfFight < 0) {
                return "Red Wins";
            } if(resultOfFight > 0) {
                return "Blue Wins";
            } else {
                return "Draw";
            }

        },

    },
    
    Data() {
        return {
            blueCivilization: '', // civ Json
            blueUnit: '', //unit Json
            blueNumberOfUnits: 0,
            blueBonusAttack: 0,
            //blueInfantryBonusArmor: 0,
            //blueArcherBonusArmor: 0,
            //blueUnitType: '',

            redCivilization: '',
            redUnit: '',
            redNumberOfUnits: 0,
            redBonusAttack: 0,
            //redInfantryBonusArmor: 0,
            //redArcherBonusArmor: 0,
            //redUnitType: '',
        }
    },

    computed: {
        ...mapGetters([
        "getAllCivilizations",
        "getAllUnits",
        "getAllStructures",
        "getAllTechnologies",
        "getAllSortedByNameCivilizations",
        "getAllSortedByNameUnits",
        "getAllSortedByNameStructures",
        "getAllSortedByNameTechnologies",
        ])
    },
    
    created() {
        // sollte man auslagern
        this.fetchAllCivilizations();
        this.fetchAllUnits();
        this.fetchAllStructures();
        this.fetchAllTechnologies();
        this.sortAll();
    },

   
}
</script>

<style>
.grid-container {
  display: grid;
}

.red {
    color: red;
}

.blue {
    color: blue;
}
</style>