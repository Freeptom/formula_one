/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */
import axios from 'axios';

const state = {
  races: '',

};

const getters = {
  allRaces: state => state.races,
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


};

export default {
  state,
  getters,
  actions,
  mutations,
};
