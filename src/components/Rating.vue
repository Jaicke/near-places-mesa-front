<template>
  <div>
     <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <img src="https://i0.wp.com/www.startuprad.io/wp-content/uploads/2018/10/placeholder-user-300x300.png?fit=300%2C300&ssl=1" alt="John">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ rating.user.email }}</v-list-item-title>
          <v-list-item-subtitle>{{ rating.comment }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          {{ rating.note }}/5
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>

export default {
  name: "Rating",
  props: [ "rating" ]
}
</script>

<style>

</style>