/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */
import axios from 'axios';

const state = {
  races: '',
  raceCount: '',
  results: '',
};

const getters = {
  allRaces: state => state.races,
  raceDates: state => state.races.map(race => race.date),
  raceCount: state => state.races.length,
  // lapNumber: state => state.results
};

const mutations = {
  set_races: (state, races) => (state.races = races),
  set_results: (state, results) => (state.results = results),
};

const actions = {
  async fetchRaces({ commit }) {
    try {
      const response = await axios.get('https://ergast.com/api/f1/current.json');
      commit('set_races', response.data.MRData.RaceTable.Races);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchResults({ commit }) {
    try {
      const response = await axios.get(`http://ergast.com/api/f1/current/2/results`);
      console.log(response.data.MRData);
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
