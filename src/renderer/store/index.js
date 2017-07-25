import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

// console.log( process.env.NODE_ENV );

export default new Vuex.Store({
  modules,
  // strict: process.env.NODE_ENV !== 'production'
  strict: false
})
