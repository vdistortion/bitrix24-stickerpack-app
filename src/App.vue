<template>
  <div>
    <dev-panel></dev-panel>
    <sticker-list></sticker-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import DevPanel from './components/dev/Panel.vue';
import StickerList from './components/StickerList.vue';
import config from './config';
import utils from './utils/helpers';

export default {
  methods: mapActions(['init']),
  created() {
    this.$BX24.appInfo().then((info) => {
      utils.verifyScopeLog(config.scope, info.scope);
    });
  },
  mounted() {
    this.init().catch(console.warn);
  },
  inject: ['$BX24'],
  components: {
    DevPanel,
    StickerList,
  },
};
</script>

<style lang="stylus">
html
  font-family Roboto, sans-serif
  overflow initial
</style>
