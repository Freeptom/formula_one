<template>
  <transition name="modal-fade">
    <div class="modal-scrim">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle" class="modal-header">
          <slot name="header">
            {{ title }}
            <button type="button" class="btn-close" aria-label="Close modal" @click="close">
              x
            </button>
          </slot>
        </header>
        <section class="modal-body">
          <slot id="modalDescription" name="body"></slot>
        </section>
        <footer class="modal-footer">
          <button type="button" class="btn-close" aria-label="Close modal" @click="close">
            Close
          </button>
        </footer>
        <span class="decoration">{{ circuit }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    circuit: { type: String, required: true },
  },
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
$modal-lr-padding--sml: 2rem;
$modal-tb-padding--sml: 2rem;
$modal-lr-padding--lg: 40px;
$modal-tb-padding--lg: 40px;

.modal-scrim {
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

.decoration {
  position: absolute;
  top: 0.5rem;
  left: -8px;
  height: 100%;
  color: rgba(73, 80, 87, 8%);
  font-size: 90px;
  font-weight: 900;
  z-index: 0;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
}
// modal and modal item spacing and margins
.modal {
  overflow: hidden;
  position: relative;
  margin: 0 0.5rem;
  line-height: 1;
  min-width: 90%;
  padding: $modal-tb-padding--sml $modal-lr-padding--sml;
  background: #ffffff;
  color: $gray4;
  @include box_shadow(4);
  overflow-x: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px;
  @media screen and (min-width: 768px) {
    min-width: 30%;
    padding: $modal-tb-padding--lg $modal-lr-padding--lg;
  }
}

header,
.modal-body,
.modal-footer {
  z-index: 1;
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.modal-footer {
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
  transition: opacity 150ms ease-in;
}
</style>
