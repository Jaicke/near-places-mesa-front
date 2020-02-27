<template>
  <div class="bottom-navigation">
     <v-bottom-navigation
      :value="activeBtn"
      color="primary"
      vertical
      fixed
      >
      <v-btn @click="getPlacesList">
        <span>All</span>
        <v-icon>mdi-view-list</v-icon>
      </v-btn>

      <v-btn @click="getPlacesMap">
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
  
</template>

<script>
export default {
  name: "bottomNavigation",
	data () {
    return {
      activeBtn: 0,
    }
  },
  methods: {
    getPlacesList(){
      this.$emit("get-places", "list")
    },
    getPlacesMap(){
      this.$emit("get-places", "map")
    }
  }
}
</script>
