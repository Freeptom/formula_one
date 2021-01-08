import dashboard from './views/Dashboard.vue';
import DriversList from './views/DriversList.vue';
import Driver from './views/Driver.vue';

export default [
  { path: '/', component: dashboard },
  { path: '/drivers', component: DriversList },
  { path: '/drivers/:driver', component: Driver },
];
