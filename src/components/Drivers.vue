<template>
  <div>
    <p v-for="driver in allDrivers" :key="driver.driverId">{{ driver.driverId }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// eslint-disable-next-line no-unused-vars
import styles from '../styles/styles.scss';

export default {
  name: 'Drivers',

  data() {
    return {};
  },

  computed: {
    ...mapGetters(['allDrivers']),
  },

  created() {
    this.fetchDrivers().then(() => (this.loading = false));
  },
  methods: { ...mapActions(['fetchDrivers']) },
};
</script>

<style scoped lang="scss"></style>
