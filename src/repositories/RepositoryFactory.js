import StandingsRepository from './standingsRepository';
import RacesRepository from './racesRepository';

const repositories = {
  standings: StandingsRepository,
  races: RacesRepository,
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
