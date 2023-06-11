<template>
  <div class="howto">
    <span class="howto__item">
      <img
        src="./assets/free-icon-mouse-left-button.png"
        alt="ЛКМ"
        title="Левая кнопка мыши"
      > — отправить в чат
    </span>
    <span class="howto__item">
      <img
        src="./assets/free-icon-mouse-right-button.png"
        alt="ПКМ"
        title="Правая кнопка мыши"
      > — добавить в поле ввода
    </span>
  </div>
  <div v-if="customStickers.list.length" class="pack">
    <h3>{{ customStickers.title }}</h3>
    <ul class="stickers">
      <li
        v-for="(sticker, key) in customStickers.list"
        :key="key"
        @click="onClick('send', sticker.icon, sticker.title, sticker.size)"
        @contextmenu.prevent="onClick('put', sticker.icon, sticker.title, sticker.size)"
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
        @click="onClick('send', sticker.icon, sticker.title, sticker.size)"
        @contextmenu.prevent="onClick('put', sticker.icon, sticker.title, sticker.size)"
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

export default {
  methods: {
    onClick(action, icon, title = 'Noname Sticker', size = this.size) {
      this.sendMessage(action, `[icon=${this.getIcon(icon)} size=${size} title=${title}]`);
    },
    sendMessage(action, message) {
      window.frameCommunicationSend({ action, message });
      window.frameCommunicationSend({ action: 'close' });
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
  name: 'app-bot',
};
</script>

<style lang="stylus">
html
  font-family Roboto, sans-serif
  overflow initial
#app
  min-width initial
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
  column-gap 20px
  list-style-type none
  padding-left 0
</style>
