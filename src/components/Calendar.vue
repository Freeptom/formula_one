<template>
  <section class="module">
    <div class="module-header">
      <h3 class="module-heading">Race Calendar</h3>
    </div>
    <div class="current-month">
      <div @click="subtractMonth"><-</div>
      <h4>{{month + ' - ' + year}}</h4>
      <div @click="addMonth">-></div>
    </div>

    <ol class="weekdays">
      <li v-for="day in days" class="weekday">{{day}}</li>
    </ol>

    <ol class="dates">
      <li v-for="blank in firstDayOfMonth">&nbsp;</li>
      {{blank}}
      <li
        v-for="date in daysInMonth"
        :class="{'current-day': date == initialDate &amp;&amp; month == initialMonth && year == initialYear}"
      >
        <span>{{date}}</span>
      </li>
    </ol>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations, around } from "vuex";
import moment from "moment";
import styles from "../styles/styles.scss";

export default {
  name: "RaceCalendar",

  data() {
    return {
      today: moment(),
      dateContext: moment(),
      days: ["S", "M", "T", "W", "T", "F", "S"]
    };
  },

  created() {
    this.fetchRaces();
  },

  computed: {
    ...mapState(["races"]),
    // view items
    year() {
      const t = this;
      return t.dateContext.format("Y");
    },
    month() {
      const t = this;
      return t.dateContext.format("MMMM");
    },
    // work out month info
    daysInMonth() {
      const t = this;
      return t.dateContext.daysInMonth();
    },
    currentDate() {
      const t = this;
      return t.dateContext.get("date");
    },
    firstDayOfMonth() {
      const t = this;
      const firstDay = moment(t.dateContext).subtract(
        t.currentDate - 1,
        "days"
      );
      return firstDay.weekday();
    },
    // set init
    initialDate() {
      const t = this;
      return t.today.get("date");
    },
    initialMonth() {
      const t = this;
      return t.today.format("MMMM");
    },
    initialYear() {
      const t = this;
      return t.today.format("Y");
    }
  },

  methods: {
    ...mapActions(["fetchRaces"]),
    addMonth() {
      const t = this;
      t.dateContext = moment(t.dateContext).add(1, "month");
    },
    subtractMonth() {
      const t = this;
      t.dateContext = moment(t.dateContext).subtract(1, "month");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables/colors.scss";
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1000ms;
}
.fade-enter-to {
  opacity: 1;
}
.weekdays,
.dates {
  padding: 0;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(7, 1fr);
  li {
    list-style-type: none;
  }
}

.dates {
  margin: 0 2rem;
}

.weekdays {
  margin: 0 2rem 1rem 2rem;
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    left: 5%;
    top: 30px;
    height: 1px;
    width: 90%; /* or 100px */
    border-bottom: 1px solid rgba(221, 226, 229, 0.4);
  }
}

.dates {
  list-style: none;
  li {
    align-items: center;
    margin: 2rem auto 2rem auto;
  }
}

.current-month {
  display: flex;
  justify-content: space-between;
  padding: 0 30rem 2rem 2rem;
  align-content: center;
  color: $gray4;
  h4 {
    margin: 0;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1px;
    color: $gray4;
  }
}

.current-day {
  position: relative;
  z-index: 1;
  color: white;
  &::before {
    content: "";
    position: absolute;
    height: 50px;
    width: 50px;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    border-radius: 50%;
    background: linear-gradient(-45deg, #00d2ff 0%, #3a47d5 100%);
    z-index: -1;
  }
}
</style>
