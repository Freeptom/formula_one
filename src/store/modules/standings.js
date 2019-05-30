import axios from 'axios';

const state = {
  standings: [],
};

const getters = {
  /* eslint no-shadow: ["error", { "allow": ["state"] }] */
  allStandings: state => state.standings,
};

const mutations = {
  setStandings: (state, standings) => (state.standings = standings),
};


const actions = {
  async fetchStandings({ commit }) {
    const response = await axios.get('https://ergast.com/api/f1/current/driverStandings.json');


    commit('setStandings', response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings); // response.data is passed to 'standings' in the mutation (2nd arg)
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};
