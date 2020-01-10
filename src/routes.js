import dashboard from './components/Dashboard.vue';
import showDrivers from './components/Drivers.vue';

export default [
  { path: '/', component: dashboard },
  { path: '/drivers', component: showDrivers },
];
