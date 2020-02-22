/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const CurrentRepository = RepositoryFactory.get('current');

const state = {
  races: '',
  raceResult: '',
  allRaceResults: '',
};

const getters = {
  allRaces: state => state.races,
  racesCount: state => state.races.length,
  raceDates: state => state.races.map(race => race.date),
  allResults: state => state.allRaceResults,
  lapNumber: state => state.raceResult.Results[0].laps,
};

const mutations = {
  set_races: (state, races) => (state.races = races),
  set_round_result: (state, raceResult) => (state.raceResult = raceResult),
  set_race_results: (state, allRaceResults) => (state.allRaceResults = allRaceResults),
};

const actions = {
  async fetchRaces({ commit }) {
    try {
      const response = await CurrentRepository.get();
      const currentRaces = response.data.MRData.RaceTable.Races;

      commit('set_races', currentRaces);
    } catch (e) {
      console.log(e);
    }
  },

  // TODO refactor this bad boi, possibly commit response and use roundInfo in a getter (need to check what roundInfo actually is)?
  async fetchSingleRoundResults({ commit }, round) {
    try {
      const response = await CurrentRepository.getSingleRoundResults(round);
      const roundInfo = response.data.MRData.RaceTable.Races[0]; // get specifically RaceTable info
      await commit('set_round_result', roundInfo);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  // http://ergast.com/api/f1/current/results.json - can be used to access ALL races in season's results!!

  async fetchAllRoundResults({ commit }) {
    try {
      const response = await CurrentRepository.getAllRoundResults();
      const races = response.data.MRData.RaceTable.Races;
      await commit('set_race_results', races);
      return response;
    } catch (e) {
      console.log(e);
    }
    // http://ergast.com/api/f1/current/results.json - can be used to access ALL races in season's results!!
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
