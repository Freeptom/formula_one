import Vue from 'vue';
import App from './App.vue';
import store from './store/index';

Vue.config.productionTip = false;

// filters


Vue.filter('last-name', (value) => {
  const splitString = value.split('_');
  return splitString.pop();
});

Vue.filter('remove-underscore', (value) => {
  const removeUnderscore = value.replace(/_/gi, ' ');
  return removeUnderscore.toString();
});

Vue.filter('to-uppercase', value => value.charAt(0).toUpperCase() + value.slice(1)); // change this so it capitalises every word in string or array

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
