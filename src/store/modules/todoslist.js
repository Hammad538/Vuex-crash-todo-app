// import axios from "axios";

import axios from "axios";

const state = {
  todos: [],
};
const getters = {
  allTodos: (state) => state.todos,
};
const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    commit("setTodos", response.data);
  },
  async newTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    console.log(limit);

    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updTodo) {
     await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`
    );

    commit("updateTodo", updTodo);
  },
};
const mutations = {
  setTodos: (state, payload) => (state.todos = payload),
  newTodo: (state, payload) => state.todos.unshift(payload),
  removeTodo: (state, id) => {
    console.log(id);
    state.todos = state.todos.filter((todo) => todo.id !== id);
  },
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    {
      if (index !== -1) {
        state.todos.splice(index,1,updTodo);
      }
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
