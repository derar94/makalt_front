import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import home from './home'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: { auth, home }
})