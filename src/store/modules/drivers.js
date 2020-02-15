/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign, no-return-assign */

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const CurrentRepository = RepositoryFactory.get('current');

const state = {
  drivers: '',
  singleDriver: '',
};

const getters = {
  allDrivers: state => state.drivers,
  driver: state => state.singleDriver,
};

const mutations = {
  set_drivers: (state, drivers) => (state.drivers = drivers),
  set_single_driver: (state, singleDriver) => (state.singleDriver = singleDriver),
};

const actions = {
  async fetchDrivers({ commit }, driverName = '') {
    try {
      const response = await CurrentRepository.getDrivers(driverName);
      const currentDrivers = response.data.MRData.DriverTable.Drivers;
      driverName === ''
        ? commit('set_drivers', currentDrivers)
        : commit('set_single_driver', currentDrivers);
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
