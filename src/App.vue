<template>
  <is-dev-panel></is-dev-panel>
  <app-page></app-page>
</template>

<script>
import { mapActions } from 'pinia';
import { useRootStore } from './stores';
import IsDevPanel from './components/dev/IsDevPanel.vue';
import AppPage from './components/Page.vue';
import config from './config';
import utils from './utils/helpers';

export default {
  methods: mapActions(useRootStore, ['init']),
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
    IsDevPanel,
    AppPage,
  },
  name: 'app-layout',
};
</script>


<style lang="stylus">
@require './assets/smartgrid.styl'

html
body
#app
  margin 0
  min-height 100vh

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

.page
  flex-grow 1

.l-wrapper
  wrapper()
</style>
