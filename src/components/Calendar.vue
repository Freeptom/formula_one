<template>
  <div>
    <Loader v-if="loading" :loading="loading"></Loader>
    <section v-else class="module calendar-module">
      <div class="module-header">
        <h3 class="module-heading">Race Calendar</h3>
      </div>

      <div class="current-month">
        <div class="arrow-selector" @click="subtractMonth">
          <img
            class="icon-arrow icon-arrow--nav"
            src="../assets/icons/chevron-left-solid.svg"
            alt="chevron-left"
          />
        </div>
        <h4>{{ month + ' - ' + year }}</h4>
        <div class="arrow-selector" @click="addMonth">
          <img
            class="icon-arrow icon-arrow--nav"
            src="../assets/icons/chevron-right-solid.svg"
            alt="chevron-right"
          />
        </div>
      </div>

      <div class="calendar">
        <ol class="weekdays">
          <li v-for="day in days" :key="day.index" class="weekday">{{ day }}</li>
        </ol>

        <ol class="dates">
          <li v-for="dates in firstDayOfMonth" :key="dates.index">&nbsp;</li>
          <li
            v-for="date in daysInMonth"
            :key="date.index"
            :class="{ 'current-day': raceDates.includes(buildDate(date)) }"
            @click="getRaceInfo(buildDate(date))"
          >
            <span>{{ date }}</span>
          </li>
        </ol>
        <modal v-show="isModalVisible" @close="closeModal">
          <template v-slot:header>
            <p>{{ raceDate }}</p>
            <p class="modal-header__round-meta">Round {{ roundNum }}</p>
            <p v-if="lapNum" class="modal-header__round-meta">{{ lapNum }} Laps</p>
            <p v-if="raceWinner" class="modal-header__round-meta">Winner: {{ raceWinner }}</p>
            <h2 class="modal-header__title">{{ raceCountry }}</h2>
            <p>{{ circuitName }}</p>
          </template>
          <template v-slot:body></template>
        </modal>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import modal from '@/components/Modal.vue';
import moment from 'moment';
import Loader from '@/components/Loader.vue';

export default {
  name: 'RaceCalendar',
  components: {
    modal,
    Loader,
  },
  data() {
    return {
      // race vars
      raceDate: '',
      raceCountry: '',
      raceName: '',
      circuitName: '',
      roundNum: '',
      raceWinner: '',
      lapNum: '',

      // date vars
      isSameVar: '',
      today: moment(),
      dateContext: moment(),
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

      // general vars
      loading: true,
      isModalVisible: false,
    };
  },

  computed: {
    ...mapGetters(['allRaces', 'raceDates', 'lapNumber', 'winner']),
    // view items
    year() {
      const t = this;
      return t.dateContext.format('Y');
    },
    month() {
      const t = this;
      return t.dateContext.format('MMMM');
    },

    // work out info for each month
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
      const firstDay = moment(t.dateContext).subtract(t.currentDate - 1, 'days');
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

  created() {
    // this.fetchRaces();

    this.fetchRaces().then(() => (this.loading = false));
  },

  methods: {
    ...mapActions(['fetchRaces', 'fetchRoundResults']),
    // date formatters
    prependUnderTen(day) {
      return day < 10 ? `0${day}` : day;
    },

    buildDate(day) {
      // format month to num
      const selMonth = moment()
        .month(this.month)
        .format('MM');
      // format day to include '0' if under 10
      const selDay = this.prependUnderTen(day);
      // build date
      const fullDate = `${this.year}-${selMonth}-${selDay}`;
      return fullDate;
    },

    async getRaceInfo(date) {
      let showModal = false;
      let findCountry = '';
      let findRaceName = '';
      let findCircuitName = '';
      let findRound = '';
      let findLapNum = '';
      let findWinner = '';
      // iterate through each race to match date of current
      for await (let el of this.allRaces) {
        if (el.date == date) {
          // if date match then give variables values
          findCountry = el.Circuit.Location.country;
          findRaceName = el.raceName;
          findCircuitName = el.Circuit.circuitName;
          findRound = el.round;
          await this.$store.dispatch('fetchSingleRoundResults', findRound);
          findLapNum = this.lapNumber;
          findWinner = this.winner;
          showModal = true;
        }
      }
      // assign the variables to corresponding data properties
      this.raceDate = date
        .split('-')
        .reverse()
        .join('/');
      this.raceCountry = findCountry;
      this.raceName = findRaceName;
      this.circuitName = findCircuitName;
      this.roundNum = findRound;
      this.lapNum = findLapNum;
      this.raceWinner = findWinner;
      return showModal ? (this.isModalVisible = true) : '';
    },

    // change month view
    addMonth() {
      const t = this;
      t.dateContext = moment(t.dateContext).add(1, 'month');
    },
    subtractMonth() {
      const t = this;
      t.dateContext = moment(t.dateContext).subtract(1, 'month');
    },

    closeModal() {
      this.isModalVisible = false;
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
.weekdays,
.dates {
  padding: 0;
  display: grid;
  justify-content: space-between;
  align-content: center;
  grid-template-columns: repeat(7, 1fr);
  li {
    list-style-type: none;
  }
}

.calendar {
  margin: 0 2rem 1rem 2rem;
  @media screen and (max-width: 900px) {
    margin: 0 1rem 1rem 1rem;
  }
}

.weekdays {
  position: relative;
  z-index: 1;
  &:before {
    content: '';
    position: absolute;
    left: 5%;
    top: 30px;
    height: 1px;
    width: 90%; /* or 100px */
    border-bottom: 1px solid rgba(221, 226, 229, 0.4);
  }
}

.weekday {
  text-align: center;
}

.dates {
  list-style: none;
  padding: 0 0 2rem 0;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    @media screen and (max-width: 900px) {
      padding: 0.5rem;
    }
  }
}

.current-month {
  text-align: center;
  display: flex;
  justify-content: space-around;
  padding: 0 2rem 2rem 2rem;
  .arrow-selector {
    cursor: pointer;
  }
  @media screen and (min-width: 750px) {
    justify-content: center;
    .arrow-selector {
      padding: 0 2rem;
    }
  }
  align-content: center;
  color: $gray4;

  h4 {
    margin: 0;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1px;
    color: $gray4;
    min-width: 180px;
  }
}

.current-day {
  position: relative;
  z-index: 1;
  color: white;
  cursor: pointer;
  &::before {
    @include box_shadow(2);
    content: '';
    position: absolute;
    height: 30px;
    width: 30px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    background: linear-gradient(-160deg, #00d2ff 0%, #3a47d5 100%);
    z-index: -1;
    @media screen and (min-width: 750px) {
      height: 40px;
      width: 40px;
    }
  }
}

/* modal */

.modal-header {
  &__round-meta {
    font-size: 14px;
    font-weight: 300;
  }
  &__title {
    margin: 0;
    text-align: left;
  }
  p {
    margin: 0;
  }
}
</style>
