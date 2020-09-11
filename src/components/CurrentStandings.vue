<template>
  <section class="module">
    <div class="module-header">
      <h3 class="module-heading">Current Standings</h3>
      <!-- {{standings}} -->
      <input
        type="text"
        :value="standings.search"
        placeholder="Search driver name"
        class="form-input search-box"
        @input="filterStandings"
      />
    </div>
    <Loader v-if="loading" :loading="loading"></Loader>
    <table v-else class="standings">
      <thead>
        <!-- <th class="limiter"></th> -->
        <th
          class="number order-list"
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
              src="../assets/icons/chevron-down.svg"
              alt="chevron-down"
            />
            <img
              v-else
              class="icon-arrow icon-arrow--sort"
              src="../assets/icons/chevron-up.svg"
              alt="chevron-up"
            />
          </span>
        </th>
        <th>Driver</th>
        <th class="nat">Nat</th>
        <th>Team</th>
        <th class="number win-amount">Wins</th>
        <th class="number">Pts</th>
        <!-- <th class="limiter"></th> -->
      </thead>
      <tbody>
        <tr v-for="standing in filteredStandings" :key="standing.position" class="standing">
          <!-- <td class="limiter"></td> -->
          <td class="number">{{ standing.position }}</td>
          <td>
            <router-link :to="'/drivers/' + standing.Driver.driverId">
              <strong>{{ standing.Driver.familyName | toUppercase | abrv }}</strong>
            </router-link>
          </td>
          <td class="nat">{{ standing.Driver.nationality | toTitleCase }}</td>
          <td>{{ standing.Constructors[0].constructorId | toTitleCase }}</td>
          <td class="number win-amount">{{ standing.wins }}</td>
          <td class="number">{{ standing.points }}</td>
          <!-- <td class="limiter"></td> -->
        </tr>
      </tbody>
    </table>
    <p v-if="filteredStandings.length === 0 && loading === false" class="no-results">
      <strong>No drivers found</strong>
    </p>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
// eslint-disable-next-line no-unused-vars
import Loader from '@/components/Loader.vue';

export default {
  name: 'CurrentStandings',
  components: {
    Loader,
  },

  data() {
    return {
      numericalOrder: true,
      loading: true,
    };
  },

  computed: {
    ...mapState(['standings']),
    ...mapGetters(['filteredStandings']),
  },

  created() {
    this.fetchStandings().then(() => (this.loading = false));
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
.no-results {
  padding: 0 1rem 1rem 1rem;
  margin: 0;
  text-align: center;
}
a {
  text-decoration: none;
  color: $black;
}
</style>
