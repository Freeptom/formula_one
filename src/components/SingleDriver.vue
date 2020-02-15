<template>
  <div>
    <h1>{{ driver }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// eslint-disable-next-line no-unused-vars
import styles from '../styles/styles.scss';

export default {
  name: 'SingleDriver',

  data() {
    return {
      driverId: this.$route.params.driver,
    };
  },

  computed: {
    ...mapGetters(['driver']),
  },

  created() {
    this.fetchDrivers(this.driverId);
  },
  methods: { ...mapActions(['fetchDrivers']) },
};
</script>

<style scoped lang="scss"></style>
