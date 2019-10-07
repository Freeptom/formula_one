

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header" class="title">
            {{title}}
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal"
            >x</button>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body" id="modalDescription">I'm the default body!</slot>
        </section>
        <footer class="modal-footer">
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">Close</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",

  data() {
    return {
      title: "I am a dynamic title"
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables/colors.scss";
@import "../mixins/drop-shadows.scss";
.modal-backdrop {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(-45deg, #00d0ffde 0%, #3a47d5de 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  @include box_shadow(4);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: $gray4;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  color: #3a47d5;
  background: none;
  padding: 0.4rem 1rem;
  border: 1px solid #3a47d5;
  border-radius: 20px;
  cursor: pointer;
}

/* transition */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>