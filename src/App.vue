<template>
  <dev-panel></dev-panel>
  <app-page></app-page>
</template>

<script>
import DevPanel from './components/dev/DevPanel.vue';
import AppPage from './components/Page.vue';
import BitrixBatch from './api/bitrix';

export default {
  methods: {
    init() {
      const batch = new BitrixBatch(this.$BX24, this.$BX24.isAdmin());

      return batch.getList().then(({ list }) => {
        const isApp = list.find((item) => item.placement === 'IM_SMILES_SELECTOR');

        if (!isApp) return batch.app();
        return Promise.resolve();
      });
    },
  },
  mounted() {
    if (this.$BX24) this.init().catch(window.console.warn);
  },
  inject: ['$BX24'],
  components: {
    DevPanel,
    AppPage,
  },
  name: 'app',
};
</script>

<style lang="stylus">
@require './assets/smartgrid.styl'

html
body
#app
  margin 0

#app
  font-family Roboto, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  display flex
  flex-direction column
  min-width 320px

.header
  background-color #3f51b5
  &__title
    color #ffffff
    font-size 20px
    font-weight 400

.l-wrapper
  wrapper()
</style>
