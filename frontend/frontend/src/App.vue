<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/bewertung">Bewertung</router-link> |
      <router-link to="/rest">REST</router-link> |
      <router-link to="/vuex">VUEX</router-link> |
      <router-link to="/testAgeView">TestAge</router-link> |
      <router-link to="/fightSimulator">Kampfsimulator</router-link> |
      <router-link to="/wikiView">Wiki</router-link> |
      <router-link to="/techSearchView">TechSearch</router-link> |
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>