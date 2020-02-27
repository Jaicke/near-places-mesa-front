<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Registration from './views/Registration'
import Session from './views/Session'

export default {
  name: 'App',

  components: {
   Registration
  },

  data: () => ({
    //
  }),
};
</script>
