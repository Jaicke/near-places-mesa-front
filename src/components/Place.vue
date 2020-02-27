<template>
  <v-card
    class="mx-auto"
    max-width="400"
     @click.stop="showRatingDialog=true"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{ place.name }}</v-card-title>
    </v-img>

    <!-- <v-card-subtitle class="pb-0">Number 10</v-card-subtitle> -->

    <v-card-text class="text--primary">

      <div>
        {{place.street}},
        {{place.city}},
        {{place.state}},
        {{place.country}}
      </div>
    </v-card-text>

  <RatingDialog v-model="showRatingDialog" :placeId="place.id" />
  </v-card>

</template>

<script>
import RatingDialog from "./PlaceRatingsDialog"

export default {
	name: "Place",
	props: [ "place" ],
  components: { RatingDialog },
  data() {
    return { 
      showRatingDialog: false
    }
  }
}
</script>
