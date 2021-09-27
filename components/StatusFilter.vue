<template>
  <div>
    <v-radio-group v-model="isChecked">
      <v-row>
        <v-col>
          <v-radio label="全体" @change="resetFilter" value="all"></v-radio>
          <v-radio v-for="(st, index) in status" :key="index" :label="st.text" class="ml-5" @change="filterTodo(index)" :value="index"></v-radio>
        </v-col>
      </v-row>
    </v-radio-group>

  </div>
</template>

<script>
export default {
  data () {
    return {
      status: this.$store.state.status,
      isChecked: 'all',
    }
  },
  methods: {
    filterTodo (i) {
      if(i === 0) {
        this.$store.dispatch('filterNew')
      } else if(i === 1) {
        this.$store.dispatch('filterDoing')
      } else {
        this.$store.dispatch('filterDone')
      }
    },
    resetFilter () {
      this.$store.dispatch('getTodo')
    }
  }
}
</script>