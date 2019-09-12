<template>
  <section class="module">
    <div class="module-header">
      <h3 class="module-heading">Race Calendar</h3>
    </div>
    <div class="current-month">
      <div @click="subtractMonth">
        <
          </div>
          <h4
        >{{month + ' - ' + year}}</h4>
          <div @click="addMonth">></div>

      </div>

      <ol class="weekdays">
        <li v-for="day in days">
          {{day}}
        </li>
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
import {
  mapState, mapGetters, mapActions, mapMutations, around,
} from 'vuex';
import moment from 'moment';
import styles from '../styles/styles.scss';


export default {
  name: 'RaceCalendar',

  data() {
    return {
      today: moment(),
      dateContext: moment(),
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    };
  },

  created() {
    this.fetchRaces();
  },

  computed: {
    ...mapState(['races']),
    // view items
    year() {
      const t = this;
      return t.dateContext.format('Y');
    },
    month() {
      const t = this;
      return t.dateContext.format('MMMM');
    },
    // work out month info
    daysInMonth() {
      const t = this;
      return t.dateContext.daysInMonth();
    },
    currentDate() {
      const t = this;
      return t.dateContext.get('date');
    },
    firstDayOfMonth() {
      const t = this;
      const firstDay = moment(t.dateContext).subtract((t.currentDate - 1), 'days');
      return firstDay.weekday();
    },
    // set init
    initialDate() {
      const t = this;
      return t.today.get('date');
    },
    initialMonth() {
      const t = this;
      return t.today.format('MMMM');
    },
    initialYear() {
      const t = this;
      return t.today.format('Y');
    },
  },

  methods: {
    ...mapActions(['fetchRaces']),
    addMonth() {
      const t = this;
      t.dateContext = moment(t.dateContext).add(1, 'month');
    },
    subtractMonth() {
      const t = this;
      t.dateContext = moment(t.dateContext).subtract(1, 'month');
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
.dates, .weekdays {

}
.weekdays, .dates {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  li {
    list-style-type: none;
  }
}

.dates {
  list-style: none;
}

.current-month {
  background-color: #6c7ae0;
  display: flex;
  justify-content: space-between;
  padding: 0 30rem 2rem 2rem;
  align-content: center;
  color: white;
  h4 {
    margin: 0;
     text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1px;
    color: white;
  }
}


</style>
