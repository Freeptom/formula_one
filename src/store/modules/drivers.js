/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const CurrentRepository = RepositoryFactory.get('current');

const state = {
  drivers: '',
};

const getters = {
  allDrivers: state => state.drivers,
};

const mutations = {
  set_drivers: (state, drivers) => (state.drivers = drivers),
};

const actions = {
  async fetchDrivers({ commit }) {
    try {
      const response = await CurrentRepository.getDrivers();
      const currentDrivers = response.data.MRData.DriverTable.Drivers;
      commit('set_drivers', currentDrivers);
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
