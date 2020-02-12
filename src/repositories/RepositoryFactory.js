import StandingsRepository from './standingsRepository';
import CurrentRepository from './currentRepository';

const repositories = {
  standings: StandingsRepository,
  current: CurrentRepository,
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
