<template>
  <div>
    <v-btn @click="logout" elevation="0">ログアウト</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$fb.auth().signOut().then(() => {
        this.$emit('logout')
        this.$router.push('/todos')
      })
    }
  }
}
</script>
