import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const CurrentRepository = RepositoryFactory.get('current');

const state = {
  races: [],
  roundResult: false,
  allRaceResults: [],
};

const getters = {
  allRaces: state => state.races,
  racesCount: state => state.races.length,
  raceDates: state => state.races.map(race => race.date),
  allResults: state => state.allRaceResults,
  // return number of laps, winner if results exist
  raceOptions: state =>
    !state.roundResult
      ? ''
      : {
          winner: `${state.roundResult.Results[0].Driver.givenName} ${state.roundResult.Results[0].Driver.familyName}`,
          laps: state.roundResult.Results[0].laps,
        },
};

const mutations = {
  set_races: (state, races) => (state.races = races),
  set_round_result: (state, roundResult) => (state.roundResult = roundResult),
  set_all_race_results: (state, allRaceResults) => (state.allRaceResults = allRaceResults),
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

  async fetchResults({ commit }, round = null) {
    try {
      if (round) {
        const response = await CurrentRepository.getSingleRoundResults(round);
        let roundInfo = response.data.MRData.RaceTable.Races[0];
        // check if the race has happened yet
        let isResult = result => {
          if (result) return true;
        };
        // if result, set round result with returned info
        if (isResult(roundInfo)) await commit('set_round_result', roundInfo);
        // if no result yet, set round result to false
        if (!isResult(roundInfo)) await commit('set_round_result', false);
        return response;
        // fetch all round results if none is supplied
      } else {
        const response = await CurrentRepository.getAllRoundResults();
        const races = response.data.MRData.RaceTable.Races;
        await commit('set_all_race_results', races);
        return response;
      }
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
