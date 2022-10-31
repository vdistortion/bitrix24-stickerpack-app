<template>
  <div class="dev-panel">
    <dev-panel-reload class="dev-panel__button-icon"></dev-panel-reload>
    <dev-panel-tools v-if="isAdmin" class="dev-panel__button-icon"></dev-panel-tools>
    <dev-panel-download class="dev-panel__button-icon"></dev-panel-download>
  </div>
</template>

<script>
import DevPanelReload from './DevPanelReload.vue';
import DevPanelTools from './DevPanelTools.vue';
import DevPanelDownload from './DevPanelDownload.vue';

export default {
  computed: {
    isAdmin() {
      return this.$BX24.isAdmin();
    },
  },
  components: {
    DevPanelReload,
    DevPanelTools,
    DevPanelDownload,
  },
  inject: ['$BX24'],
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
    &:first-child
      margin-right auto
    &:hover
      opacity 1
    span
      font-size 20px
      color rgba(0, 0, 0, .5)
</style>
