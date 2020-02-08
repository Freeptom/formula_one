import Repository from './Repository';

const resource = '/f1/current/driverStandings';
const suffix = '.json';
export default {
  get() {
    return Repository.get(`${resource}${suffix}`);
  },
};
