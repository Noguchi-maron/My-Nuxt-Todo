<template>
  <div>
    <v-radio-group v-model="isChecked">
      <v-row>
        <v-col>
          <v-radio v-for="(s, index) in sort" :key="index" :label="s" class="mr-5" @change="sortBtn(index)" :value="index"></v-radio>
        </v-col>
      </v-row>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sort: ['作成順', '期限(近い順)', '期限（遠い順）', '進捗順'],
      isChecked: 0
    }
  },
  methods: {
    async sortBtn (index) {
      if (index == 0) {
        this.$store.dispatch('getTodo')
      } else if (index == 1) {
        this.$store.dispatch('sortDue')
      } else if (index == 2){
        this.$store.dispatch('sortDueReverse')
      } else {
        this.$store.dispatch('sortStatus')
      }
    },
  }
}
</script>
