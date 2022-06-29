<template>
  <div id="app" @click="actualizeData()">
    <h1> Total cost of the buildings: </h1>
    <h3> Wood: {{ this.totalWoodCost}}</h3>
    <h3> Food: {{ this.totalFoodCost}}</h3>
    <h3> Gold: {{ this.totalGoldCost}}</h3>
    <h3> Stone: {{ this.totalStoneCost}}</h3>
    <select id="buildingPicker" @change="getBuildings()">
        <option v-for="item in getAllStructures" :key="item.id" :value="item.name">{{ item.name }}</option>
    </select>
    <br>
    <br>

    <div id="buildings" class="grid-container"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "BuildingCostCalculator",
    methods: {
    ...mapActions([
        "fetchAllCivilizations", 
        "fetchAllUnits", 
        "fetchAllStructures", 
        "fetchAllTechnologies",
        "createDynamicURL",
        "setInfoCard",
        "changeInfoCard",
        "setProcessing",
        ]),

        actualizeData() {
            let wood = 0;
            let food = 0;
            let gold = 0;
            let stone = 0;
            for(let x = 0; x < this.buildingInfoArray.length; x++) {
                wood += this.buildingInfoArray[x].wood * this.buildingInfoArray[x].count;
                food += this.buildingInfoArray[x].food * this.buildingInfoArray[x].count;
                gold += this.buildingInfoArray[x].gold * this.buildingInfoArray[x].count;
                stone += this.buildingInfoArray[x].stone * this.buildingInfoArray[x].count;
            }

            this.totalWoodCost = wood;
            this.totalFoodCost = food;
            this.totalGoldCost = gold;
            this.totalStoneCost = stone;

            // updates count of buildings
            for(let x = 0; x < document.getElementsByClassName("counter").length; x++) {
                document.getElementsByClassName("counter")[String(x)].querySelectorAll("p")[0].innerHTML = this.buildingInfoArray[x].count;
                //console.log(this.buildingInfoArray[x].count);
            }
        },

        getBuildings() {
            let obj = this.getStructure(document.getElementById('buildingPicker').value)
            // new element
            if(!this.checkIfBuildingExists(obj)) {
                this.createDomElement(obj);
                this.buildingList.push(obj);
                // count up old element
            }else{
                for(let x = 0; x < this.buildingInfoArray.length; x++) {
                    if(this.buildingInfoArray[x].name === obj.name) {
                        this.buildingInfoArray[x].count += 1;
                    }
                }
            }
            
        },

        getStructure(name) {
           for(let x = 0; x < this.getAllStructures.length; x++) {
                if(this.getAllStructures[x].name.includes(name)) {
                    return this.getAllStructures[x];
                }
           }
           console.log("Error finding structure");
        },

        createDomElement(obj) {
            // creat buildingInfoArray entry
            let CustomObj = {   name: obj.name,
                                count: 1,
                                wood: 0,
                                food: 0,
                                gold: 0,
                                stone: 0,
                            }

            for(let item in obj.cost) {
                CustomObj[item.toLowerCase()] = obj.cost[item];
                
            }
            
            this.buildingInfoArray.push(CustomObj);
            let borderDiv = document.createElement('div');
            borderDiv.className = "borderDiv";
            borderDiv.id = this.newIdNumber;

            let idNumber = this.newIdNumber;

            let divName = document.createElement('div');
            divName.innerHTML = obj.name;
            divName.id = obj.name
            divName.className = "name";

            let divNumberOfBuildings = document.createElement('div');
            let counter = document.createElement('p');
            counter.innerHTML = 1;

            divNumberOfBuildings.className = "counter";

            let plusButton = document.createElement('button');
            plusButton.innerHTML = "+";
            plusButton.addEventListener('click', () => this.changeBuildingCounter(idNumber, 1));


            let minusButton = document.createElement('button');
            minusButton.innerHTML = "-";
            minusButton.addEventListener('click', () => this.changeBuildingCounter(idNumber, -1));

            let cost = document.createElement('div');
            cost.className = "cost";

            // in which order the children are appended
            this.entryPoint.appendChild(borderDiv);
            borderDiv.appendChild(divName);
            borderDiv.appendChild(divNumberOfBuildings);
            divNumberOfBuildings.appendChild(minusButton);
            divNumberOfBuildings.appendChild(counter);
            divNumberOfBuildings.appendChild(plusButton);
            
            // next element gets higher
            this.newIdNumber++;
        },

        changeBuildingCounter(idNumber, change) {
            let building = document.getElementById(idNumber);
            let x = building.getElementsByClassName("counter")['0'].children['1'];
            if((change + parseInt(x.innerHTML)) < 0) {
                x.innerHTML = 0;
                this.buildingInfoArray[idNumber].count = 0;
            }else{
                x.innerHTML = change + parseInt(x.innerHTML);
                this.buildingInfoArray[idNumber].count = parseInt(x.innerHTML); 
            }
            
        },

        checkIfBuildingExists(obj) {
            if(this.buildingList.includes(obj)) {
                console.log("building exists already");
                return true;
            }
            return false;
        },
    },
    
    data() {
        return {
            newIdNumber: 0,
            buildingInfoArray: [],
            entryPoint: "",
            buildingList: [],
            newObj: "",
            totalWoodCost: 0,
            totalFoodCost: 0,
            totalGoldCost: 0,
            totalStoneCost: 0,
        }
    },
    
    mounted() {
       this.entryPoint = document.getElementById("buildings");
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
        if(this.getAllUnits.length === 0) {
            console.log("pull");
            this.fetchAllCivilizations();
            this.fetchAllUnits();
            this.fetchAllStructures();
            this.fetchAllTechnologies();
        }
    },

   
}
</script>

<style>
.grid-container {
    display: grid;
    gap: 10px;
}

#buildings {
    grid-template-columns: auto auto auto auto;
}
</style>