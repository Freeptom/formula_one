import Vue from 'vue';
import Vuex from 'vuex';
import standings from './modules/standings';
import raceCalendar from './modules/raceCalendar';
import drivers from './modules/drivers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    standings,
    raceCalendar,
    drivers,
  },
  state: {},
  mutations: {},
  actions: {},
});
