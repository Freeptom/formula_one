/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const RacesRepository = RepositoryFactory.get('races');

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
  set_round_results: (state, results) => (state.results = results),
};

const actions = {
  async fetchRaces({ commit }) {
    try {
      const response = await RacesRepository.get();
      const currentRaces = response.data.MRData.RaceTable.Races;
      commit('set_races', currentRaces);
    } catch (e) {
      console.log(e);
    }
  },

  async fetchRoundResults({ commit }, round) {
    try {
      const response = await RacesRepository.getRoundResults(round);
      const roundInfo = response.data.MRData.RaceTable.Races[0];
      await commit('set_round_results', roundInfo);
      return response;
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
