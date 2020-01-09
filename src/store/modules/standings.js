/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */
import axios from 'axios';

const state = {
  standings: [],
  search: '',
};

const getters = {
  // eslint-disable-next-line max-len
  filteredStandings: state =>
    state.standings.filter(standing =>
      standing.Driver.familyName.toLowerCase().includes(state.search.toLowerCase())
    ),
};

const mutations = {
  set_standings: (state, standings) => (state.standings = standings),
  set_search: (state, search) => (state.search = search),
};

const actions = {
  async fetchStandings({ commit }) {
    const response = await axios.get('https://ergast.com/api/f1/current/driverStandings.json');
    commit('set_standings', response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings); // response.data is passed to 'standings' in the mutation (2nd arg)
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
