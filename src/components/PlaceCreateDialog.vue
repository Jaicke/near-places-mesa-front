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
      <span class="headline">Adicionar Lugar</span>
      </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
            ref="name"
            v-model="name"
            :rules="[rules.required]"
            label="Nome"
            required
            autofocus
          ></v-text-field>

           <v-text-field
            ref="street"
            v-model="street"
            :rules="[rules.required]"
            label="Rua"
            required
          ></v-text-field>

          <v-text-field
            ref="city"
            v-model="city"
            :rules="[rules.required]"
            label="Cidade"
            required
          ></v-text-field>

          <v-text-field
            ref="state"
            v-model="state"
            :rules="[rules.required]"
            label="Estado"
            required
          ></v-text-field>

          <v-text-field
            ref="country"
            v-model="country"
            :rules="[rules.required]"
            label="País"
            required
          ></v-text-field>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show = false">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="createPlace">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
import api from "@/services/api"

export default {
  props: {
    value: Boolean
  },
  data(){
    return {
      name: '',
      street: '',
      city: '',
      state: '',
      country: '',
      withError: false,
      messageErrors: null,
      authorization: localStorage.getItem("Authorization"),
      rules: {
        required: (pass) => !!pass || 'Obrigatório'
      },
    }
  },
  methods:{
    createPlace(){
      api.post("/places",
         { place: { name: this.name, state: this.state, street: this.street, country: this.country, city: this.city}},
         { headers: { Authorization: this.authorization } })
         .then(response => {
           this.withError = false
           this.show = false
           this.$router.replace( {name: "home"} )
           window.location.reload();
          })
         .catch(error => {
           this.withError = true
           this.messageErrors = error.response.data.errors
         })
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