<template>
  <v-card>
    <v-card-title>
      <span class="headline">Avaliações</span>
    </v-card-title>
    <v-card-text>
      <v-container>
         <template v-if="placeRatings.length > 0">
            <Rating v-for="rating in placeRatings" :key="rating.id" :rating="rating" />
          </template>

          <span v-else>Seja o primeiro a avaliar este local.</span>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import api from '@/services/api'

import Rating from './Rating'

export default {
  name: "RatingList",
  props: [ "placeId", "placeRatings" ],
  components: { Rating }
}
</script>