import Vue from 'vue';
import App from './App.vue';
import store from './store/index';

Vue.config.productionTip = false;

// filters

Vue.filter('last-name', (value) => {
  const splitString = value.split('_');
  return splitString.pop();
});

Vue.filter('to-uppercase', value => value.charAt(0).toUpperCase() + value.slice(1)); //

Vue.filter('to-title-case', value => value
    .replace(/_/gi, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
