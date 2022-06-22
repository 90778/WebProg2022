<template>
  <v-app id="bewertung">
    <h2>test</h2>
    <h1 class="header" id="headerBewertung">Professor Rating App</h1>
    <AddEntry id="addEntry" @entryAdded="addEntry"></AddEntry>
    <ListEntries
      id="listEntry"
      v-for="(singleEntry, index) of listOfEntries"
      :key="index"
      :entry="singleEntry"
      :index="index"
      @entryRemoved="removeEntry"
      @entryEdited="editEntry"
    ></ListEntries>
  </v-app>
</template>

<script>//@ steht für import aus src/ folder => @/components // .. steht als ausgangspunkt nehme das verzeichnis 1 schritt über mir
import AddEntry from "../components/AddEntry.vue";
import ListEntries from "../components/ListEntries.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    AddEntry,
    ListEntries
  },
  
  data: function() {
    return {
      listOfEntries: []
    };
  },
  methods: {
    addEntry: function(e) {
      axios
        .post("http://localhost:8080/profs/", {
          name: e.name,
          rating: e.rating
        })
        .then(response => {
          this.listOfEntries = response.data;
        });
    },
    editEntry: function(e) {
      axios
        .put("http://localhost:8080/profs/" + e.index, {
          name: e.name,
          rating: e.rating
        })
        .then(response => {
          this.listOfEntries = response.data; //TODO: change this, do not return full list
        });
    },
    removeEntry: function(e) {
      axios.delete("http://localhost:8080/profs/" + e.index).then(response => {
        this.listOfEntries = response.data;
      });
    }
  },
  mounted() {
    axios.get("http://localhost:8080/profs/").then(response => {
      this.listOfEntries = response.data;
    });
  }
};
</script>