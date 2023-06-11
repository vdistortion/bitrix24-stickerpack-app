<template>
  <div v-if="isVisible" class="dev-panel">
    <dev-panel-reload class="dev-panel__button-icon"></dev-panel-reload>
    <dev-panel-download class="dev-panel__button-icon"></dev-panel-download>
  </div>
</template>

<script>
import DevPanelReload from './DevPanelReload.vue';
import DevPanelDownload from './DevPanelDownload.vue';
import env from '../../env';

export default {
  computed: {
    isVisible() {
      return env.get('TEST_DOMAINS').includes(this.$BX24.getDomain());
    },
  },
  inject: ['$BX24'],
  components: {
    DevPanelReload,
    DevPanelDownload,
  },
  name: 'dev-panel',
};
</script>

<style lang="stylus">
.dev-panel
  display flex
  align-items center
  justify-content space-between
  &__button-icon
    text-decoration none
    transition opacity .4s
    opacity .4
    color rgba(0, 0, 0, .5)
    font-size 30px
    &:first-child
      margin-right auto
    &:hover
      opacity 1
</style>
