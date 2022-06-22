<template>
  <div>
    <v-text-field
      id="input"
      :color="'#b98440'"
      label="Name of professor"
      v-model="name">
    </v-text-field>
    <v-rating
      id="rating"
      class="ml-2 mr-3"
      v-model="rating"
      background-color="#b98440"
      color="#daa520"
    ></v-rating>
    <v-btn class="addButton" @click="addEntry">
      Add
    </v-btn>
  </div>
</template>

<script>

export default {
  name: "AddEntry",
  data: function() {
    return {
      name: "",
      rating: 0
    };
  },
  methods: {
    addEntry: function() {
      if (this.name.length > 0) {
        this.$emit("entryAdded", {
          name: this.name,
          rating: this.rating
        });
        this.name = "";
        this.rating = 0;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: flex;
  align-items: center;
}
</style>
