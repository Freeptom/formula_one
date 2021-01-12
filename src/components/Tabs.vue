<template
  ><article>
    <header class="tabs">
      Races
      <ul>
        <li v-for="(tab, index) in tabs" :key="index">
          <div :class="['nav-item', { 'is-active': tab.isActive }]" @click="selectTab(tab)">
            {{ tab.name }}
          </div>
        </li>
      </ul>
    </header>
    <section class="tabs-details">
      <slot></slot>
    </section>
  </article>
</template>

<script>
export default {
  name: 'Tabs',

  data: function() {
    return {
      tabs: [],
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectedTab.name;
      });
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  padding: 0;
  list-style: none;
}

li {
  margin-right: 20px;
}

.nav-item {
  cursor: pointer;
  &:hover,
  &:active,
  &.is-active {
    border-bottom: 1px solid $primary-color;
    color: $primary-color--darker;
  }
}
</style>
