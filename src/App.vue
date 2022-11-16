<template>
  <is-dev-panel></is-dev-panel>
  <app-page></app-page>
</template>

<script>
import { mapActions } from 'pinia';
import { useRootStore } from './stores';
import IsDevPanel from './components/dev/IsDevPanel.vue';
import AppPage from './components/Page.vue';

export default {
  methods: mapActions(useRootStore, ['init']),
  mounted() {
    this.init().catch(console.warn);
  },
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
