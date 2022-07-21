
import todoslist from './modules/todoslist';
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  modules: {
    todoslist
  }
})

export default store
