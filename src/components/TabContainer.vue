<template>
  <div>
    <Tabs>
      <Tab name="Calendar" :selected="true">
        <Calendar></Calendar>
      </Tab>
      <Tab name="List">
        <List></List>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import Tab from '@/components/Tab.vue';
import Tabs from '@/components/Tabs.vue';
import Calendar from '@/components/Calendar.vue';
import List from '@/components/List.vue';

export default {
  name: 'TabContainer',
  components: {
    Tab,
    Tabs,
    Calendar,
    List,
  },
};
</script>
