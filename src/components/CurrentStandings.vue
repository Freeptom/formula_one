<template>
  <section class="module">
    <div class="module-header">
      <h3 class="module-heading">Current Standings</h3>
      <input
        type="text"
        :value="standings.search"
        @input="filterStandings"
        placeholder="Search Driver"
        class="search"
      />
    </div>

    <table class="standings">
      <thead>
        <th class="limiter"></th>
        <th @click="sortBy('position'); flipIcon()" class="number">
          Pos
          <span>
            <img
              v-if="numericalOrder"
              class="icon-arrow"
              src="../assets/chevron-down.svg"
              alt="chevron-down"
            />
            <img v-else class="icon-arrow" src="../assets/chevron-up.svg" alt="chevron-up" />
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
          <td class="number">{{standing.position }}</td>
          <td>
            <strong>{{standing.Driver.familyName | to-uppercase | abrv}}</strong>
          </td>
          <td class="nat">{{standing.Driver.nationality | to-title-case}}</td>
          <td>{{standing.Constructors[0].constructorId | to-title-case}}</td>
          <td class="number">{{standing.wins }}</td>
          <td class="number">{{standing.points}}</td>
          <td class="limiter"></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import styles from "../styles/styles.scss";

export default {
  name: "CurrentStandings",

  data() {
    return {
      numericalOrder: true
    };
  },

  created() {
    this.fetchStandings();
  },

  computed: {
    ...mapState(["standings"]),
    ...mapGetters(["filteredStandings"])
  },

  methods: {
    ...mapActions(["fetchStandings"]),
    ...mapMutations(["set_search"]),

    flipIcon() {
      this.numericalOrder = !this.numericalOrder;
    },

    filterStandings({ type, target }) {
      this.$store.commit("set_search", target.value);
    },
    sortBy(prop) {
      const sort = this.filteredStandings.reverse();
      this.$store.commit("set_standings", sort);
    }
  }
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
