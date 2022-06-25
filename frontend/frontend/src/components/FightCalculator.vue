<template>
    <div id="app">
        <div class="test">Calculate your fights</div>
        <div class="grid-container">
            <div id="blue">
            <div>Blue</div>
                <div class="grid-item">
                    <select v-model="blueCivilization" id="civilizationBlue" placeHolder="Civilization Blue">
                        <option v-for="item in getAllCivilizations" :key="item.id" :value="item">{{ item.name }}</option>
                    </select>
                </div>
                <div class="grid-item">
                    <select v-model="blueUnit" id="unitBlue">
                        <option v-for="item in getAllUnits" :key="item.id" :value="item">{{ item.name }}</option>
                    </select>
                </div>
                <div class="grid-item">
                    <input type="number" v-model="blueNumberOfUnits" placeholder="Anzahl Units"> 
                </div> 
                <div class="grid-item">
                    <p> +{{ blueUnit.attack }}</p>
                    <input type="number" max="12" min="-3" v-model="blueBonusAttack" placeholder="Unit Bonus Attack"> 
                </div>
            </div>
            <div id="red">
                <div>Red</div>
                <div class="grid-item">
                    <select v-model="redCivilization" id="civilizationRed">
                        <option v-for="item in getAllCivilizations" :key="item.id" :value="item">{{ item.name }}</option>
                    </select>
                </div>
                <div class="grid-item">
                    <select v-model="redUnit" id="unitRed">
                        <option v-for="item in getAllUnits" :key="item.id" :value="item">{{ item.name }}</option>
                    </select>
                </div>
                <div class="grid-item">
                    <input type="number" v-model="redNumberOfUnits" placeholder="Anzahl Units"> 
                </div> 
                <div class="grid-item"><!-- v-bind binds data to element, but element needs to be bound to data. Not v-model -->
                    <p> +{{ redUnit.attack }}</p>
                    <input id="redBonusAttack" type="number" v-model="redBonusAttack" max="12" min="-3" placeholder="Unit Bonus Attack"> 
                </div>
            </div>
           
        </div> 
         <div @click="calculateFight()" id="result">The result of the fight is: {{ calculateFight() }}</div>
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

        setVariable(e) {
            this[e.target.id] = document.getElementById(e.target.id).value;
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
            let armyAttackBlue = (this.blueUnit.attack + this.blueBonusAttack) / this.blueUnit.reload_time;
            // attack = (if((attack - gegnerArmor) <== 0){1}else{attack - gegnerArmor} + bonusdamage) / reload_time
            let armyAttackRed = (this.redUnit.attack + this.redBonusAttack) / this.redUnit.reload_time;


            //https://de.wikipedia.org/wiki/Gesetz_von_Lanchester
            let resultOfFight = (this.blueNumberOfUnits*this.blueNumberOfUnits*armyAttackBlue*armyHpBlue) - (this.redNumberOfUnits*this.redNumberOfUnits*armyAttackRed*armyHpRed);
            if(resultOfFight < 0) {
                //document.getElementById("result").style.color = this.redWinColor;
                return "Red Wins";
            } if(resultOfFight > 0) {
                //document.getElementById("result").style.color = this.blueWinColor;
                return "Blue Wins";
            } else {
                //document.getElementById("result").style.color = this.drawColor;
                return "Draw";
            }

        },

    },
    
    data() {
        return {
            blueCivilization: '', // civ Json
            blueUnit: '', //unit Json
            blueNumberOfUnits: "",
            blueBonusAttack: "",
            //blueInfantryBonusArmor: 0,
            //blueArcherBonusArmor: 0,
            //blueUnitType: '',
            blueWinColor: "blue",

            redCivilization: '',
            redUnit: '',
            redNumberOfUnits: "",
            redBonusAttack: "",
            //redInfantryBonusArmor: 0,
            //redArcherBonusArmor: 0,
            //redUnitType: '',
            redWinColor: "red",

            drawColor: "black",
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
        this.fetchAllCivilizations();
        this.fetchAllUnits();
        this.fetchAllStructures();
        this.fetchAllTechnologies();
        this.sortAll();
    },

   
}
</script>

<style>
#result {
    text-align: center;
    font-size: 40px;
    margin: 100px;
}

.grid-container {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px;
  padding: 10px;
  align-content: center;
}

.test {
    font-size: 40px;
    margin: 50px;
}

#red {
    background-color: rgb(255, 148, 148);
}

#blue {
    background-color: rgb(141, 141, 250);
}

#red select {
    background-color: rgb(250, 89, 89);
}

#blue select {
    background-color: rgb(109, 109, 252);
}
</style>