<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle" class="modal-header">
          <slot name="header" class="title">
            {{ title }}
            <button type="button" class="btn-close" aria-label="Close modal" @click="close">
              x
            </button>
          </slot>
        </header>
        <section class="modal-body">
          <slot id="modalDescription" name="body">I'm the default body!</slot>
        </section>
        <footer class="modal-footer">
          <button type="button" class="btn-close" aria-label="Close modal" @click="close">
            Close
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  data() {
    return {
      title: 'I am a dynamic title',
    };
  },
  created() {
    document.onkeydown = evt => {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
        this.close();
      }
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/variables/colors.scss';
@import '../mixins/drop-shadows.scss';

$modal-lr-padding: 60px;
$modal-tb-padding: 30px;

.modal-backdrop {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(-160deg, #00d0ffde 0%, #3a47d5de 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: $modal-tb-padding 0;
  background: #ffffff;
  @include box_shadow(4);
  overflow-x: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px;
}

.modal-header {
  padding: 0 $modal-lr-padding;
  color: $gray4;
  justify-content: space-between;
}

.modal-body {
  padding: 0 $modal-lr-padding;
  position: relative;
  width: 100%;
}

.modal-footer {
  padding: $modal-tb-padding $modal-lr-padding 0 $modal-lr-padding;
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.btn-close {
  color: #3a47d5;
  background: none;
  padding: 0.4rem 1rem;
  border: 1px solid #3a47d5;
  border-radius: 24px;
  cursor: pointer;
  &:hover {
    background: #3a47d5;
    color: white;
  }
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
