import Vue from 'vue';
import Vuex from 'vuex';
import standings from './modules/standings';
import races from './modules/races';
import drivers from './modules/drivers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    standings,
    races,
    drivers,
  },
  state: {},
  mutations: {},
  actions: {},
});
