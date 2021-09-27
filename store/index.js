import { _ } from "core-js"

export const state = () => {
  return {
    todos: [],
    status: [
      {text: '未完了', value: 0},
      {text: '途中', value: 1},
      {text: '完了', value: 2}
    ],
    loginState: false
  }
}

export const mutations = {
  loadLogin (state) {
    this.$fb.auth().onAuthStateChanged((user) => {
      if (!user) {
        state.loginState = false
      } else {
        state.loginState = true
      }
    })
  },
  createTodo (state, todo) {
    state.todos.unshift(todo)
  },
  loadTodo (state, todos) {
    state.todos = todos
  },
  
}

export const actions = {
  async getTodo({ commit }) {
    const db = this.$fb.firestore()
    const result = await db.collection('todos').orderBy('created').get()
    commit('loadTodo', result.docs.map((d) => d.data()))
  },
  loadLogin ({ commit }) {
    commit('loadLogin')
  },
  async filterNew ({ commit }) { 
    const result = await this.$fb.firestore().collection('todos').where('status', '==', 0).get()
      commit('loadTodo', result.docs.map((d) => d.data()))
  },
  async filterDoing ({ commit }) { 
    const result = await this.$fb.firestore().collection('todos').where('status', '==', 1).get()
      commit('loadTodo', result.docs.map((d) => d.data()))
  },
  async filterDone ({ commit }) { 
    const result = await this.$fb.firestore().collection('todos').where('status', '==', 2).get()
      commit('loadTodo', result.docs.map((d) => d.data()))
  },
  async sortDue ({ commit }) {
    const result = await this.$fb.firestore().collection('todos').orderBy('due').get()
    commit('loadTodo', result.docs.map((d) => d.data()))
  },
  async sortDueReverse ({ commit }) {
    const result = await this.$fb.firestore().collection('todos').orderBy('due', 'desc').get()
    commit('loadTodo', result.docs.map((d) => d.data()))
  },
  async sortStatus ({ commit }) {
    const result = await this.$fb.firestore().collection('todos').orderBy('status').get()
    commit('loadTodo', result.docs.map((d) => d.data()))
  }
}
