import dashboard from './components/Dashboard.vue';
import DriversList from './components/DriversList.vue';
import Driver from './components/Driver.vue';

export default [
  { path: '/', component: dashboard },
  { path: '/drivers', component: DriversList },
  { path: '/drivers/:driver', component: Driver },
];
