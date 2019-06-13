<template>
  <transition
    appear
    appear-class="fade-enter"
    appear-to-class="fade-enter-to"
    appear-active-class="fade-enter-active"
  >
    <div>
      <h3>Current Standings</h3>

      <input
        type="text"
        :value="standings.search"
        @input="filterStandings"
        placeholder="search driver"
      >
      <table class="standings">
        <thead>
          <th @click="sortBy('position')">
            Position
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="grey"
                stroke-width="3"
                stroke-linecap="square"
                stroke-linejoin="arcs"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </th>

          <th>Driver Name</th>
          <th>Nationality</th>
          <th>Team</th>
          <th>Wins</th>
          <th>Points</th>
        </thead>
        <tbody>
          <tr v-for="standing in filteredStandings" :key="standing.position" class="standing">
            <td>{{standing.position }}</td>
            <td>{{standing.Driver.familyName | to-title-case}}</td>
            <td>{{standing.Driver.nationality | to-title-case}}</td>
            <td>{{standing.Constructors[0].constructorId | to-title-case}}</td>
            <td>{{standing.wins }}</td>
            <td>{{standing.points}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </transition>
</template>

<script>
import styles from "../styles/styles.scss";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "CurrentStandings",

  data() {
    return {
      items: [{ message: "Foo" }, { message: "Bar" }]
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

    filterStandings({ type, target }) {
      this.$store.commit("set_search", target.value);
    },
    sortBy(prop) {
      // let sort = this.filteredStandings.sort((a, b) => b[prop] - a[prop]);
      let sort = this.filteredStandings.reverse();
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

h3 {
  padding: 25px 0 0 0;
  color: rgba(
    255,
    255,
    255,
    0.6
  ); // figure out how to get 'headerText' from styles import
}
</style>


 
