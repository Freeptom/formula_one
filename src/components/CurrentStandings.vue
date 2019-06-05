<template>
  <transition
    appear
    appear-class="fade-enter"
    appear-to-class="fade-enter-to"
    appear-active-class="fade-enter-active"
  >
    <div>
      <h3>Current Standings</h3>

      <input type="text" v-model="searchQuery" v-on:input="search" placeholder="search driver">

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
          <tr v-for="standing in ALL_STANDINGS" :key="standing.position" class="standing">
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
      searchQuery: ""
    };
  },

  created() {
    this.fetchStandings();
  },

  mounted() {
    this.created = true;
  },

  computed: {
    ...mapState(["standings", "filter"]),
    ...mapGetters(["ALL_STANDINGS", "GET_SEARCH", "FILTERED_STANDINGS"])
  },

  methods: {
    ...mapActions(["fetchStandings"]),
    ...mapMutations(["SET_SEARCH", "SET_FILTER"]),

    // search: function() {
    //   // set SEARCH to input
    //   this.$store.commit("SET_SEARCH", this.searchQuery);
    //   // return matches between ALL_STANDINGS and SEARCH
    //   this.SET_FILTER(
    //     this.ALL_STANDINGS.filter(standing => {
    //       return (
    //         !this.GET_SEARCH || standing.Driver.driverId.match(this.GET_SEARCH)
    //       );
    //     })
    //   );
    search: function() {
      // set SEARCH to input
      this.$store.commit("SET_SEARCH", this.searchQuery);
      // return matches between ALL_STANDINGS and SEARCH
      this.SET_FILTER(
        this.ALL_STANDINGS.filter(standing => {
          return (
            !this.GET_SEARCH || this.FILTERED_STANDINGS,
            console.log(typeof this.FILTERED_STANDINGS)
          );
        })
      );
    }
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


 
