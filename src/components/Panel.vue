<template>
  <div class="panel">
    <div class="panel__item left">
      <slot></slot>
    </div>
    <div v-if="$BX24 && isLoaded" class="panel__item right">
      <app-button v-if="isInstall" @click="uninstall">Удалить стикеры из чата</app-button>
      <app-button v-else @click="install">Установить стикеры в чат</app-button>
    </div>
    <teleport to="#modals">
      <app-popup
        v-if="isPopup"
        @add="$emit('add-sticker', $event)"
        @close="$emit('close-popup')"
      ></app-popup>
    </teleport>
  </div>
</template>

<script>
import AppButton from './Button.vue';
import AppPopup from './Popup.vue';
import BitrixBatch from '../api/bitrix';

export default {
  methods: {
    uninstall() {
      this.isLoaded = false;

      this.$options.batch.deleteApp().then(() => {
        this.isInstall = false;
        this.isLoaded = true;
      });
    },
    install() {
      this.isLoaded = false;

      this.$options.batch.app().then(() => {
        this.isInstall = true;
        this.isLoaded = true;
      });
    },
    init() {
      this.$options.batch.getList().then(({ list }) => {
        const isApp = list.find((item) => item.placement === 'IM_SMILES_SELECTOR');

        this.isInstall = Boolean(isApp);
        this.isLoaded = true;
      });
    },
  },
  mounted() {
    if (this.$BX24) {
      this.$options.batch = new BitrixBatch(this.$BX24, this.$BX24.isAdmin());
      this.init();
    }
  },
  data() {
    return {
      isLoaded: false,
      isInstall: false,
    };
  },
  batch: null,
  inject: ['$BX24'],
  props: {
    isPopup: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppButton,
    AppPopup,
  },
  name: 'app-panel',
};
</script>

<style lang="stylus">
@require '../assets/smartgrid.styl'

.panel
  display flex
  justify-content space-between
  align-items center
  column-gap 10px
  margin 10px 0
  &__item
    display flex
    flex-wrap wrap
    column-gap 5px
    &.right
      justify-content flex-end
</style>
