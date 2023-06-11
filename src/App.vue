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
      const { member_id: memberId } = this.$BX24.getAuth();
      this.hash = memberId;
      this.batch = new BitrixBatch(this.$BX24, this.$BX24.isAdmin());

      return this.batch.getBotId().then((result) => {
        this.botId = result.botId;

        if (result.botId) {
          return this.batch.app(result.botId, this.hash)
            .then((data) => this.batch.appUpdate(data.app, this.hash));
        }
        return this.batch.add()
          .then((data) => this.batch.app(data.add, this.hash))
          .then((data) => this.batch.appUpdate(data.app, this.hash));
      });
    },
  },
  mounted() {
    this.init().then(window.console.info).catch(window.console.warn);
  },
  data() {
    return {
      batch: null,
      botId: null,
      hash: '',
    };
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
