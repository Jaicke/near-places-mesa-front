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
          <li v-for="error in messageErrors" :key="error">{{error}}</li>
        </v-alert>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">Registrar-se</v-list-item-title>
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

          <v-text-field
            v-model="passwordConfirmation"
            :append-icon="showConf ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showConf ? 'text' : 'password'"
            name="input-10-1"
            label="Confirmação de Senha"
            @click:append="showConf = !showConf"
          ></v-text-field>

          <v-list-item-content>
            <v-list-item-title class="headline">Perfil</v-list-item-title>
          </v-list-item-content>          

          <v-text-field
            ref="name"
            v-model="name"
            :rules="[rules.required]"
            label="Nome"
            required
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

        </v-card-text>
       
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn to="/sessions" text>Entrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="toRegister">Registrar-se</v-btn>
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
      passwordConfirmation: '',
      name: '',
      street: '',
      city: '',
      state: '',
      country: '',
      withError: false,
      show: false,
      showConf: false,
      messageErrors: null,
      rules: {
        required: (pass) => !!pass || 'Obrigatório',
        min: (pass) => pass.length >= 8 || 'Mínimo 8 caracteres',
      },
    };
  },
  methods: {
    toRegister() {
      api.post('/registrations', {
        user: { email: this.email, password: this.password, password_confirmation: this.passwordConfirmation,
            profile_attributes: { name: this.name, state: this.state, street: this.street, country: this.country, city: this.city } },
         })
      .then((response) => {
        this.withError = false
        this.$router.replace( {name: "session"} )
      })
      .catch(error => {
        this.withError = true
        this.messageErrors = error.response.data.errors
      });
    }

  }
};
</script>

<style>

</style>
