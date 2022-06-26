<template>
  <div id="app">
    <div id="nav">
      <router-link to="/wikiView">Wiki</router-link> |
      <router-link to="/techSearchView">TechSearch</router-link> |
      <router-link to="/fightSimulator">FightCalculator</router-link> |
      <router-link to="/buildingCostCalculatorView">BuildingCostCalculator</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 20px;
}

html {
  background-color: #ccdbdc;
}

button {
  text-align: center;
  width: 250px;
  height: 50px;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #04aee7cc;
  font-size: 20px;
}

select {
  text-align: center;
  width: 250px;
  height: 50px;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #04aee7cc;
  font-size: 20px;
}

input {
  text-align: left;
  width: 250px;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 20px;
}

#nav {
  padding: 30px;
  font-size: 25px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.grid-container > div {
  background-color: #80ced7;
  border: 1px solid black;
  text-align: center;
  font-size: 30px;
  width: 100%;
}
</style>