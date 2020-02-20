import dashboard from './components/Dashboard.vue';
import Drivers from './components/Drivers.vue';
import SingleDriver from './components/SingleDriver.vue';
import RandomChart from './components/charts/RandomChart.vue';

export default [
  { path: '/', component: dashboard },
  { path: '/drivers', component: Drivers },
  { path: '/drivers/:driver', component: SingleDriver },
  { path: '/chart', component: RandomChart },
];
