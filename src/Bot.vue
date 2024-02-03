<template>
  <div class="howto">
    <span class="howto__item">
      <img
        src="./assets/free-icon-mouse-left-button.png"
        alt="ЛКМ"
        title="Левая кнопка мыши"
      > — отправить в чат
    </span>
  </div>
  <div v-if="customStickers.list.length" class="pack">
    <h3>{{ customStickers.title }}</h3>
    <ul class="stickers">
      <li
        v-for="(sticker, key) in customStickers.list"
        :key="key"
        @click="sendMessage(sticker.icon, sticker.title, sticker.size)"
      >
        <img
          :src="getIcon(sticker.icon)"
          :alt="sticker.title"
          :title="sticker.title"
          :style="getStyle(sticker.size)"
        >
      </li>
    </ul>
  </div>
  <div
    v-for="(pack, key) in stickers"
    :key="key"
    class="pack"
  >
    <h3>{{ pack.title }}</h3>
    <ul class="stickers">
      <li
        v-for="(sticker, key) in pack.list"
        :key="key"
        @click="sendMessage(sticker.icon, sticker.title, sticker.size)"
      >
        <img
          :src="getIcon(sticker.icon)"
          :alt="sticker.title"
          :title="sticker.title"
          :style="getStyle(sticker.size)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import config from './config';
import stickers, { marketplace } from './packs';
import api from './api';
import BitrixBatch from './api/bitrix';

export default {
  methods: {
    sendMessage(icon, title = 'Noname Sticker', size = this.size) {
      const batch = new BitrixBatch(this.$BX24, this.$BX24.isAdmin());
      return batch.sendMessage(`[icon=${this.getIcon(icon)} size=${size} title=${title}]`)
        .then(window.console.info)
        .catch(window.console.warn);
    },
    getStyle(size = this.size) {
      return {
        height: `${size}px`,
        cursor: 'pointer',
      };
    },
    getIcon(icon) {
      const fullPath = [config.path, icon].join('');
      return icon.includes('http') ? icon : fullPath;
    },
  },
  computed: {
    stickers() {
      if (this.state === 'marketplace') return marketplace;
      return stickers;
    },
  },
  created() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyT') {
        e.preventDefault();
        this.state = this.state === 'marketplace' ? 'default' : 'marketplace';
      }
    });
  },
  data() {
    return {
      state: 'marketplace', // default,marketplace
      customStickers: {
        title: 'Свои стикеры',
        list: api.get(),
      },
      size: 100,
    };
  },
  inject: ['$BX24'],
  name: 'app-bot',
};
</script>

<style lang="stylus">
html
  font-family Roboto, sans-serif
  overflow initial
#app
  min-width initial
  margin 5px
.howto
  background-color #ffffff
  &__item
    display flex
    align-items center
.pack
  h3
    display inline-block
    background-color #ffffff
  a.link
    padding 10px
    border-radius 4px
    box-shadow 0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f
    height 70px
    width 70px
    display inline-block
    text-align center
    line-height 2
    color #000
    background-color rgba(#fff, .4)
    text-decoration none
    font-size 35px
    &:hover
      background-color #fff
.stickers
  display flex
  flex-wrap wrap
  column-gap 5px
  list-style-type none
  padding-left 0
</style>
