/* eslint-disable no-param-reassign, no-return-assign */
import axios from 'axios';
import moment from 'moment';

const state = {
  races: null,

};

const getters = {
  races: state => state.races,
  raceDates: state => state.races.date,
};


const mutations = {
  set_races: (state, races) => (state.races = races),

};

const actions = {
  async fetchRaces({ commit }) {
    const response = await axios.get('https://ergast.com/api/f1/current.json');
    commit('set_races', response.data.MRData.RaceTable.Races[0]);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
