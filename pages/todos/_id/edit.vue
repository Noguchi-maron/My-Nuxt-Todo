<template>
  <section class="container">
      <v-card width="500" height="400" class="mx-auto px-16 py-16" >
        <div class="wrap d-flex align-center">
        <v-form>
          <v-row dense>
            <v-col cols="4">
          <v-text-field readonly v-model="editForm.name" label="名前"></v-text-field>
            </v-col>
            <v-col>
              <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="editForm.due"
              label="期限"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="editForm.due"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
          <v-textarea v-model="editForm.title" label="Todo" counter maxlength="50" single-lilne auto-grow autofocus rows="2"></v-textarea>
            </v-col>
          </v-row>
          <v-row class="pr-3 mt-10">
            <v-btn class="ml-auto" @click.prevent="edit" type="submit">保存</v-btn>
          </v-row>
        </v-form>
        </div>
      </v-card>
    </section>
</template>

<script>
export default {
  data () {
    return {
      editForm: {},
      menu: false,
      date: ''
    }
  },
  async mounted () {
    this.db = this.$fb.firestore().collection('todos').doc(this.$route.params.id)
    await this.db.get().then(d => {
      if(d.exists) {
        this.editForm = d.data()
      } else {
        console.log(404)
      }
    })
    this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.comment.name = user.displayName
      }
    })
  },
  methods: {
    async edit () {
      await this.$fb.firestore().collection('todos').doc(this.$route.params.id).update(this.editForm)
      this.$router.push('/todos')
    },
  }
}
</script>
