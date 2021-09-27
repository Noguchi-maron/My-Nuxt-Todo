  <template>
  <section class="container">
    <v-card width="500" class="mx-auto px-16 py-12" outlined >
      <div class="wrap d-flex align-center">
      <v-form>
        <v-row dense>
          <v-col cols="4">
        <v-text-field readonly v-model="form.name" label="名前"></v-text-field>
          </v-col>
          <v-col>
          <v-text-field
            v-model="form.due"
            label="期限"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
          <v-spacer></v-spacer>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
        <v-textarea v-model="form.title" label="Todo" counter maxlength="50" single-lilne auto-grow rows="1" readonly></v-textarea>
          </v-col>
        </v-row>
        <v-row class="pr-3 mb-10">
          <div class="ml-auto">
          <v-btn @click.prevent="editBtn" type="submit" :disabled="userCollate">編集</v-btn>
          <v-btn class="ml-5" @click.prevent="deleteBtn" type="submit" color="#91CEF2" :disabled="userCollate">削除</v-btn>
          </div>
        </v-row>
      </v-form>
      </div>
      <v-card class="px-8 py-4 mb-3" outlined>
        <v-form>
          <v-row dense>
            <v-col cols="5">
          <v-text-field label="名前" readonly v-model="comment.name"></v-text-field>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
          <v-text-field label="コメント" counter maxlength="100" v-model="comment.text"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="pr-3 mb-2">
            <div class="ml-auto">
            <v-btn @click="commentUp">保存</v-btn>
          </div>
          </v-row>
        </v-form>
      </v-card>
      <ul class="pl-0">
        <p>コメント</p>
        <li v-for="com in form.comment" :key="com.id" class="mb-2">
          <v-card class="px-2 py-1" outlined>{{ com.text }} ({{ com.name }})</v-card>
        </li>
      </ul>
    </v-card>
  </section>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      db: null,
      menu: false,
      comment: {
        id: 0,
        name: '',
        text: ''
      },
      userCollate: true
    }
  },
  async mounted () {
    this.db = this.$fb.firestore().collection('todos').doc(this.$route.params.id)
    await this.db.get().then(d => {
      if(d.exists) {
        this.form = d.data()
      } else {
        console.log(404)
      }
    })
    this.$fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.comment.name = user.displayName
        if (user.displayName === this.form.name) {
          this.userCollate = false
        }
      }
    })
  },
  methods: {
    editBtn (){
      this.$router.push(`/todos/${this.$route.params.id}/edit`)
    },
    async deleteBtn() {
      await this.db.delete()
      this.$router.push('/todos')
    },
    async commentUp () {
      if (!this.comment.text) {
        return
      }
      const formCom = this.form.comment
      if(formCom.comment) {
        this.comment.id = formCom[formCom.length - 1].id + 1
      }
      formCom.unshift(this.comment)
      await this.db.update({ comment: formCom })
      this.$router.push('/todos')
    }
  }
}
</script>


