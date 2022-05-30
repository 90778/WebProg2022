<template>
  <div id="app">
    <img :src="this.getCurrentArticlePicture()">
    <p></p>
    <br>
    {{ this.currentArticleNumber }}
    <button @click="getArticle(++currentArticleNumber);">next article</button>
    <p></p>
    <br>
    {{ getArticleAbstract() }}
    <br>
    <a :href="currentArticleUrl" target="_blank">{{getLink()}}</a>
    <p></p>
    <br>
    <h2>
        Mach keinen scheiß mit meinem ApiKey, Bitte, (^.^)
    </h2>
    {{ this.api + this.apiKey}}
  </div>
</template>

<script>
import axios from 'axios';

export default {
    //this.fetchedInfo gibt fehler. Warum?
  mounted() {
    axios
      .get(this.getApi(this.api, this.apiKey))
      .then(response => (this.fetchedInfo = response));
  },

  methods: {
    getCurrentArticlePicture() {
      if(this.currentArticle != null){
        return this.currentArticle.media[0]['media-metadata'][0].url;
      }else{
        return "something happend";
      }
    },

    getApi(api, apiKey) {
      return api + apiKey;
    },

    getArticle(articelNumber) {
        this.currentArticle = this.fetchedInfo.data.results[articelNumber];
        this.currentArticleNumber = articelNumber++;
    },

    getArticleAbstract() {
      this.currentArticle = this.fetchedInfo.data.results[this.currentArticleNumber];
      this.currentArticleUrl = this.currentArticle.url;
      return this.currentArticle.abstract;
    },

    getLink() {
      this.currentArticleUrl = this.currentArticle.url;
      return this.currentArticle.url;
    }
  },

  data() {
    return {
      api: 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=',
      apiKey: 'sOPwJgzUHJIjXYebPmOoZYharEFI28gj',
      currentArticle: null,
      currentArticlePicture: null,
      currentArticleNumber: 0,
      fetchedInfo: null,
      info: 'sd',
      currentArticleUrl: null,
      
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* does not work why?*/
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 64px;
}
</style>