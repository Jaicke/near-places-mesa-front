<template>
  <v-card
    color="grey lighten-4"
    flat
    height="30px"
    tile
  >
    <v-toolbar dense>
       <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-icon>mdi-hamburger</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              @click="item.method"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      <v-toolbar-title @click="$router.replace({ name:'home' })" style="cursor:pointer;">Near Places Mesa</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click.stop="showPlaceCreateDialog=true">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>

      <PlaceCreateDialog v-model="showPlaceCreateDialog" />
    </v-toolbar>
  </v-card>
</template>

<script>
import api from "@/services/api"

import PlaceCreateDialog from './PlaceCreateDialog'

export default {
  name: "Toolbar",
  components: { PlaceCreateDialog },
  data () {
    return {
      showPlaceCreateDialog: false,
      authorization: localStorage.getItem("Authorization"),
      menuItems: [
        {  title: "Perfil", method: this.profile },
        {  title: "Sair", method: this.signout },
      ]
    }
  },
  methods: {
    signout(){
      localStorage.removeItem("Authorization")
      api.delete('/sessions', { headers: { Authorization: this.authorization } })
      this.$router.replace({ name: 'sessions' })
    },
    profile(){
      this.$router.replace({ name: 'profile' })
    }
  }
}
</script>