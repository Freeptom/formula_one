<template>
  <section class="module">
    <div class="module-header">
      <h3 class="module-heading">Current Standings</h3>
      <!-- {{standings}} -->
      <input
        type="text"
        :value="standings.search"
        placeholder="Search Driver"
        class="form-input"
        @input="filterStandings"
      />
    </div>

    <table class="standings">
      <thead>
        <th class="limiter"></th>
        <th
          class="number"
          @click="
            sortBy('position');
            flipIcon();
          "
        >
          Pos
          <span class="icon-holder">
            <img
              v-if="numericalOrder"
              class="icon-arrow icon-arrow--sort"
              src="../assets/chevron-down.svg"
              alt="chevron-down"
            />
            <img v-else class="icon-arrow icon-arrow--sort" src="../assets/chevron-up.svg" alt="chevron-up" />
          </span>
        </th>
        <th>Driver</th>
        <th class="nat">Nat</th>
        <th>Team</th>
        <th class="number">Wins</th>
        <th class="number">Pts</th>
        <th class="limiter"></th>
      </thead>
      <tbody>
        <tr v-for="standing in filteredStandings" :key="standing.position" class="standing">
          <td class="limiter"></td>
          <td class="number">{{ standing.position }}</td>
          <td>
            <strong>{{ standing.Driver.familyName | toUppercase | abrv }}</strong>
          </td>
          <td class="nat">{{ standing.Driver.nationality | toTitleCase }}</td>
          <td>{{ standing.Constructors[0].constructorId | toTitleCase }}</td>
          <td class="number">{{ standing.wins }}</td>
          <td class="number">{{ standing.points }}</td>
          <td class="limiter"></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
// eslint-disable-next-line no-unused-vars
import styles from '../styles/styles.scss';

export default {
  name: 'CurrentStandings',

  data() {
    return {
      numericalOrder: true,
    };
  },

  computed: {
    ...mapState(['standings']),
    ...mapGetters(['filteredStandings']),
  },

  mounted() {
    this.fetchStandings();
  },

  methods: {
    ...mapActions(['fetchStandings']),
    ...mapMutations(['set_search']),

    flipIcon() {
      this.numericalOrder = !this.numericalOrder;
    },

    filterStandings({ target }) {
      this.$store.commit('set_search', target.value);
    },
    sortBy() {
      const sort = this.filteredStandings.reverse();
      this.$store.commit('set_standings', sort);
    },
  },
};
</script>

<style scoped lang="scss">
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1000ms;
}
.fade-enter-to {
  opacity: 1;
}
</style>
