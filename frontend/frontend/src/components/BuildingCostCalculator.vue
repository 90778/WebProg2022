<template>
  <div id="app" @change="ActualizeData()" @click="ActualizeData()">
    <h1> Total Cost: </h1>
    <h3> Wood: {{ this.totalWoodCost}}</h3>
    <h3> Food: {{ this.totalFoodCost}}</h3>
    <h3> Gold: {{ this.totalGoldCost}}</h3>
    <h3> Stone: {{ this.totalStoneCost}}</h3>
    <select id="xxx" @change="test()">
        <option v-for="item in getAllStructures" :key="item.id" :value="item.name">{{ item.name }}</option>
    </select>
    <br>
    <br>

    <div id="buildings"></div>
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

        ActualizeData() {
            let wood = 0;
            let food = 0;
            let gold = 0;
            let stone = 0;
            for(let x = 0; x < this.buildingInfoArray.length; x++) {
                wood += this.buildingInfoArray[x].Wood * this.buildingInfoArray[x].count;
                food += this.buildingInfoArray[x].Food * this.buildingInfoArray[x].count;
                gold += this.buildingInfoArray[x].Gold * this.buildingInfoArray[x].count;
                stone += this.buildingInfoArray[x].Stone * this.buildingInfoArray[x].count;
            }

            this.totalWoodCost = wood;
            this.totalFoodCost = food;
            this.totalGoldCost = gold;
            this.totalStoneCost = stone;

            // updates count of buildings
            for(let x = 0; x < document.getElementsByClassName("counter").length; x++) {
                document.getElementsByClassName("counter")[String(x)].querySelectorAll("p")[0].innerHTML = this.buildingInfoArray[x].count;
            }
        },

        test() {
            let obj = this.getObject(document.getElementById('xxx').value)
            // new element
            if(!this.checkIfBuildingExists(obj)) {
                this.createDomElement(obj);
                this.buildingList.push(obj);
                // count up old element
            }else{
                console.log(this.entryPoint);
                for(let x = 0; x < this.entryPoint.children.length; x++) {
                    if(document.getElementById(obj.name) !== undefined) {
                        this.buildingInfoArray[x].count += 1;
                    }
                }
                
            }
            
        },

        getObject(itemString) {
           for(let x = 0; x < this.getAllStructures.length; x++) {
                if(this.getAllStructures[x].name.includes(itemString)) {
                    return this.getAllStructures[x];
                }
           }
           console.log("Error finding structure");
        },

        createDomElement(obj) {
            // creat buildingInfoArray entry
            let customObj = {   name: obj.name,
                                count: 1,
                                Wood: 0,
                                Food: 0,
                                Gold: 0,
                                Stone: 0,
                            }

            for(let item in obj.cost) {
                customObj[item] = obj.cost[item];
            }
            
            this.buildingInfoArray.push(customObj);

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
        // sollte man auslagern
        this.fetchAllCivilizations();
        this.fetchAllUnits();
        this.fetchAllStructures();
        this.fetchAllTechnologies();
    },

   
}
</script>

<style>
.grid-container {
  display: grid;
  gap: 10px;
}

select {
    text-align: center;
    width: 10%;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #83e0ec;
}

button {
    text-align: center;
    width: 10%;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: #83e0ec;
}
</style>