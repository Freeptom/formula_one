/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */
import axios from 'axios';

const state = {
  races: '',
  results: '',
};

const getters = {
  allRaces: state => state.races,
  raceDates: state => state.races.map(race => race.date),
  lapNumber: state => state.results.Results[0].laps,
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
  async fetchRoundResults({ commit }, roundNum) {
    try {
      const response = await axios.get(
        `https://ergast.com/api/f1/current/${roundNum}/results.json`
      );
      commit('set_results', response.data.MRData.RaceTable.Races[0]);
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
