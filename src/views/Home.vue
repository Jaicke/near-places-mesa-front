<template>
  <div>
    <template v-if="authorization">
      <Toolbar />
      <PlaceList :places="places" />
      <BottomNavigation v-on:get-places="getPlacesFormat($event)" />
    </template>
  </div>
</template>

<script>
import api from '@/services/api';

import Toolbar from "@/components/Toolbar";
import BottomNavigation from "@/components/BottomNavigation";
import PlaceList from "@/components/PlaceList"

export default {
  name: "Home",
  components: { Toolbar, BottomNavigation, PlaceList },
  data() {
    return {
      places: null,
      authorization: localStorage.getItem("Authorization")
    }
  },
  created() {
    this.getPlaces();
  },
  methods: {
    getPlaces(){
      api.get('/places', { headers: { Authorization: this.authorization } })
         .then((response) => this.places = response.data)
    },
    getPlacesFormat(format){
       api.get(`/places?format=${format}`, { headers: { Authorization: this.authorization } })
          .then((response) => this.places = response.data)
    }
  }
}
</script>

<style>

</style>