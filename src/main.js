import Vue from 'vue';
import App from './App.vue';
import store from './store/index';

Vue.config.productionTip = false;

// filters

Vue.filter('last-name', value => {
  const splitString = value.split('_');
  return splitString.pop();
});

Vue.filter('abrv', value => value.slice(0, 3));

Vue.filter('toUppercase', value => value.toUpperCase());

Vue.filter('toTitleCase', value =>
  value
    .replace(/_/gi, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
