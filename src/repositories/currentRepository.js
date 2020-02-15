import Repository from './Repository';

const resource = '/f1/current';
const suffix = '.json';
export default {
  get() {
    return Repository.get(`${resource}${suffix}`);
  },
  getRoundResults(roundNum) {
    return Repository.get(`${resource}/${roundNum}/results${suffix}`);
  },
  getDrivers(driverName) {
    return Repository.get(`${resource}/drivers/${driverName}${suffix}`);
  },
};
