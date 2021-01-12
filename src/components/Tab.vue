<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    name: { required: true, type: String },
    selected: { default: false, type: Boolean },
  },
  data: function() {
    return {
      isActive: false,
    };
  },
  created() {
    this.isActive = this.selected;
  },
};
</script>
