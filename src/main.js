import Vue from 'vue';
import App from './App.vue';
import store from './store/index';

Vue.config.productionTip = false;

// filters
Vue.filter('to-uppercase', value => value.charAt(0).toUpperCase() + value.slice(1));
Vue.filter('rm-underscore', (value) => {
  const splitString = value.split('-');
  console.log(splitString);
  return splitString;
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
