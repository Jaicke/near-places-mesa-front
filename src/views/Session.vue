<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-alert
          border="left"
          colored-border
          type="error"
          elevation="2"
          v-if="withError">
          <li>{{messageError}}</li>
        </v-alert>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">Entrar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-text-field
            ref="email"
            v-model="email"
            :rules="[rules.required]"
            label="E-mail"
            required
            autofocus
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Senha"
            @click:append="show = !show"
          ></v-text-field>

        </v-card-text>
       
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn to="/registrations" text>Registrar-se</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="toAuthenticate">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      email: '',
      password: '',
      withError: false,
      show: false,
      messageError: '',
      rules: {
        required: (pass) => !!pass || 'Obrigatório',
        min: (pass) => pass.length >= 8 || 'Mínimo 8 caracteres',
      },
    };
  },
  methods: {
    toAuthenticate() {
      api.post('/sessions', { user: { email: this.email, password: this.password } })
      .then((response) => {
        this.withError = false
        localStorage.setItem("Authorization", response.data.authentication_token)
        this.$router.replace({ name: "home" })
      })
      .catch(error => {
        this.withError = true
        this.messageError = error.response.data.error
      });
    }

  }
};
</script>

<style>

</style>
