/* eslint-disable no-param-reassign, no-return-assign */
import axios from 'axios';

const state = {
  standings: [],
  search: '',
};

const getters = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  filteredStandings: state => state.standings.filter(standing => standing.Driver.driverId.match(state.search)),
  // sortedFilteredStandings: (state, getters) => getters.filteredStandings.sort((a, b) => )
};

const mutations = {
  SET_STANDINGS: (state, standings) => (state.standings = standings),
  SET_SEARCH: (state, search) => (state.search = search),
};

const actions = {
  async fetchStandings({ commit }) {
    const response = await axios.get('https://ergast.com/api/f1/current/driverStandings.json');
    commit('SET_STANDINGS', response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings); // response.data is passed to 'standings' in the mutation (2nd arg)
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
