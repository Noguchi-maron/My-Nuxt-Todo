<template>
  <v-app>
    <v-app-bar class="px-12" absolute flat color="#91CEF2">
      <v-toolbar-title>
        <a @click="todosLink" class="router-link">
        Todo List
        </a>
      </v-toolbar-title>
    <v-spacer></v-spacer>
      <LoginParts v-show="!loginStat" @login="login"></LoginParts>
      <LogoutParts @logout="logout" v-show="loginStat"></LogoutParts>
    </v-app-bar>
    
  <Nuxt />

  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: false,
      loginStat: false
    }
  },
  async mounted () {
    this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginStat = true
      }
    })
  },
  methods: {
    todosLink () {
      this.$router.push('/todos')
    },
    login() {
      this.loginStat = true
    },
    logout () {
      this.loginStat = false
    }
  }
}
</script>

<style>
.nav-bar hr {
  background-color:#ddd;
  border: 0;
  height: 1.8px;
}
</style>