<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-alert
        border="left"
        colored-border
        type="error"
        elevation="2"
        v-if="withError">
        <li v-for="error in messageErrors" :key="error">{{error}}</li>
      </v-alert>
      <v-card-title>
      <span class="headline">Avaliar Lugar</span>
      </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
            type="number"
            ref="note"
            v-model="note"
            :rules="[rules.required, rules.lenght]"
            label="Nota"
            required
            autofocus
          ></v-text-field>

           <v-text-field
            ref="comment"
            v-model="comment"
            label="Comentário"
            required
          ></v-text-field>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="show = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="createRatingPlace">Salvar</v-btn>
          </v-card-actions>

          <RatingList :placeRatings="placeRatings" :placeId="placeId" />
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
import api from '@/services/api'

import RatingList from './RatingList'

export default {
  name: "PlaceRating",
  props: {
    placeId: Number,
    value: Boolean
  },
  components: { RatingList },
  data() {
    return {
      note: "",
      comment: "",
      withError: false,
      placeRatings: null,
      messageErrors: null,
      authorization: localStorage.getItem("Authorization"),
      rules: {
        required: (pass) => !!pass || 'Obrigatório',
        lenght: (v) => v <= 5 || 'Deve ser menor ou igual a 5'
      },
    }
  },
  created(){
    this.getPlaceRatings()
  },
  methods: {
    createRatingPlace(){
      api.post(`/places/${this.placeId}/ratings`,
         { rating: { note: this.note, comment: this.comment }},
         { headers: { Authorization: this.authorization } })
         .then(response => {
           this.withError = false
           this.note = ""
           this.comment = ""
           this.getPlaceRatings()
          })
         .catch(error => {
           this.withError = true
           this.messageErrors = error.response.data.errors
         })
    },
    getPlaceRatings(){
      api.get(`/places/${this.placeId}/ratings`, { headers: { Authorization: this.authorization } })
         .then((response) => this.placeRatings = response.data)
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  }
}
</script>
