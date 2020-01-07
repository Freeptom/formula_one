/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */
import axios from 'axios';

const state = {
  races: '',
  raceCount: '',
};

const getters = {
  allRaces: state => state.races,
  raceDates: state => state.races.map(race => race.date),
  raceCount: state => state.races.length,
};

const mutations = {
  set_races: (state, races) => (state.races = races),
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
  async fetchResults(round) {
    try {
      console.log(round);

      const response = await axios.get(`http://ergast.com/api/f1/current/${round}/results`);
      console.log(response);
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
