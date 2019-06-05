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
        v-model="searchQuery"
        v-on:input="filterStandings"
        placeholder="search driver"
      >
      <table class="standings">
        <thead>
          <th>Position</th>
          <th>Driver Name</th>
          <th>Nationality</th>
          <th>Team</th>
          <th>Wins</th>
          <th>Points</th>
        </thead>
        <tbody>
          <tr v-for="standing in GET_STANDINGS" :key="standing.position" class="standing">
            <td>{{standing.position }}</td>
            <td>{{standing.Driver.driverId | last-name | to-title-case}}</td>
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
      searchQuery: "",
      drivers: []
    };
  },

  created() {
    this.fetchStandings();
  },

  mounted() {
    this.drivers = this.GET_STANDINGS;
  },

  computed: {
    ...mapState(["standings", "filter"]),
    ...mapGetters(["GET_STANDINGS", "GET_SEARCH", "FILTERED_STANDINGS"])
  },

  methods: {
    ...mapActions(["fetchStandings"]),
    ...mapMutations(["SET_SEARCH", "SET_FILTER"]),

    filterStandings() {
      this.$store.commit("SET_SEARCH", this.searchQuery);
      console.log(this.GET_SEARCH);
      this.SET_FILTER(
        this.GET_STANDINGS.filter(standing => {
          console.log(standing.Driver.driverId.match(this.GET_SEARCH));
          let driver = standing.Driver.driverId.match(this.GET_SEARCH);
          return driver;
        })
        // this.FILTERED_STANDINGS(
        // this.FILTERED_STANDINGS = GET_STANDINGS,
        // return this.FILTERED_STANDINGS
        // )
      );
    }

    // filterStandings() {
    //   console.log(this.GET_STANDINGS);
    //   this.$store.commit("SET_SEARCH", this.searchQuery);
    //   console.log(this.GET_SEARCH);
    //   this.SET_FILTER(
    //     this.drivers.filter(standing => {
    //       return (
    //         !this.searchQuery ||
    //         console.log(standing.Driver.driverId.match(this.searchQuery))
    //       );
    //     })
    //   );
    // }
  }
};
</script>








<!-- Add "scoped" attribute to limit CSS to this component only -->
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


 
