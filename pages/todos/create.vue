<template>
  <section class="container">
    <v-card width="500" height="400" class="mx-auto px-16 py-16" outlined>
      <div class="wrap d-flex align-center">
      <v-form>
        <v-row dense>
          <v-col cols="4">
        <v-text-field readonly v-model="form.name" label="名前"></v-text-field>
          </v-col>
          <v-col>
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="期限"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
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
        <v-textarea v-model="form.title" label="Todo" counter maxlength="50" single-lilne auto-grow autofocus rows="2"></v-textarea>
          </v-col>
        </v-row>
        <v-row class="pr-3 mt-10">
          <v-btn class="ml-auto" @click.prevent="submit" type="submit">作成</v-btn>
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
      form: {
        id: '',
        name: 'null',
        created: '',
        due: '',
        title: '',
        status: 0,
        comment: []
      },
      menu: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    }
  },
  mounted () {
    this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.form.name = user.displayName
      }
    })
  },
  methods: {
    getTime () {
      this.form.created = $fb.firestore.FieldValue.serverTimestamp()
    },
    async submit () {
      if (!this.form.title) {
        return
      }
      const collection = this.$fb.firestore().collection('todos')
      const newDoc = collection.doc().id
      this.form.id = newDoc
      this.form.created = this.$fb.firestore.FieldValue.serverTimestamp()
      this.form.due = this.date 
      await collection.doc(newDoc).set({ ...this.form })
      this.$router.push('/todos')
    }
  }
}
</script>
