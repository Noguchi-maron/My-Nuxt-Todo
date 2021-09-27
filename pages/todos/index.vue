<template>
  <section class="container">
    <StatusFilter/>
    <SortRadio></SortRadio>
    <v-btn to="/todos/create" class="mb-10" elevation="0" :disabled="isDisabled">Todo新規作成</v-btn>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <v-row height="50">
          <v-col cols="2">
          <v-select :items="status" item-text="text" item-value="value" single-line dense @change="statusChange(todo.id, $event)" :value="status[todo.status]">
          </v-select>
          </v-col>
          <v-col cols="9" class="todo-text">
          <span>{{ todo.title }}</span>
          <span class="ml-4">{{ todo.due }}</span>
          <!-- <span class="ml-4">コメント ({{ todo.comment.length }})</span> -->
          <span class="span-btn ml-4" @click="detailPage(todo.id)">[詳細]</span>
          </v-col>
        </v-row>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isDisabled: true
    }
  },
  async mounted () {
    this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isDisabled = false
      }
    })
    await this.$store.dispatch('getTodo')
  },
  computed: {
    todos ()  {
      return this.$store.state.todos
    },
    status () {
      return this.$store.state.status
    }
  },
  methods: {
    statusChange (id, value) {
      this.$fb.firestore().collection('todos').doc(id).update({
        status: value
      })
    },
    detailPage (id) {
      this.$router.push(`/todos/${id}`)
    }
  }
}
</script>
