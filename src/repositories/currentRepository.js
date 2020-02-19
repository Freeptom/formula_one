import Repository from './Repository';

const resource = '/f1/current';
const suffix = '.json';
const limit = '?limit=1000';
export default {
  get() {
    return Repository.get(`${resource}${suffix}`);
  },
  getAllRoundsResults() {
    return Repository.get(`${resource}/results${suffix}${limit}`);
  },
  getSingleRoundResults(roundNum) {
    return Repository.get(`${resource}/${roundNum}/results${suffix}`);
  },
  getDrivers(driverName) {
    return Repository.get(`${resource}/drivers/${driverName}${suffix}`);
  },
};
