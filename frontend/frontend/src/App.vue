<template>
  <div id="app">
    <img id="headerImage" src="./assets/ageOfEmpires.png" alt="">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/bewertung">Bewertung</router-link> |
      <router-link to="/rest">REST</router-link> |
      <router-link to="/vuex">VUEX</router-link> |
      <router-link to="/testAgeView">TestAge</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
  @import './assets/styles/main.css';
  @import './assets/styles/bewertung.css';
  @import './assets/styles/rest.css';
  @import './assets/styles/vuex.css';
  @import './assets/styles/testAge.css';
</style>