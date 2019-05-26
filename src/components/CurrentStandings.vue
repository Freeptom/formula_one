<template>
  <transition
    appear
    appear-class="fade-enter"
    appear-to-class="fade-enter-to"
    appear-active-class="fade-enter-active"
  >
    <div>
      <h3>Current Standings</h3>

      <table class="standings">
        <thead>
          <th>Position</th>
          <th>Driver Name</th>
          <th>Nationality</th>
          <th>Team</th>
          <th>Wins</th>
        </thead>
        <transition
          appear
          appear-class="fade-enter"
          appear-to-class="fade-enter-to"
          appear-active-class="fade-enter-active"
        >
          <tbody>
            <tr v-for="standing in allStandings" :key="standing.position" class="standing">
              <td>{{standing.position}}</td>
              <td>{{standing.Driver.driverId}}</td>
              <td>{{standing.Driver.nationality}}</td>
              <td>{{standing.Constructors[0].constructorId}}</td>
              <td>{{standing.wins}}</td>
            </tr>
          </tbody>
        </transition>
      </table>
    </div>
  </transition>
</template>

<script>
import styles from "../styles/styles.scss";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CurrentStandings",

  methods: {
    ...mapActions(["fetchStandings"])
  },

  computed: mapGetters(["allStandings"]),

  created() {
    this.fetchStandings();
  },

  mounted() {
    this.created = true;
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
</style>


 
