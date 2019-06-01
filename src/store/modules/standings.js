import axios from 'axios';

const state = {
  standings: [],
  title: 'test',
  search: '',
};

const getters = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  ALL_STANDINGS: state => state.standings,
  GET_SEARCH: state => state.search,

};

const mutations = {
  SET_STANDINGS: (state, standings) => (state.standings = standings),
  SET_SEARCH: (state, search) => (state.search = search),
  FILTER_SEARCH: (state, search) => (state.standings = search),

};


const actions = {
  async FETCH_STANDINGS({ commit }) {
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
