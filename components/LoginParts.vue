<template>
  <div>
    <v-btn @click="login" elevation="0">ログイン</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async login () {
      const provider = new this.$fb.auth.GoogleAuthProvider()
      await this.$fb.auth().signInWithPopup(provider).
      then(() => {
        this.$router.push('/todos')
      })
      .catch(() =>{
        this.$router.push('/todos')
      })
      this.$emit('login')
    },

  }
}
</script>