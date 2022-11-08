<template>
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
          :title="getTitle(sticker.title)"
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
          :title="getTitle(sticker.title)"
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
      const path = config.handler.replace('index.html', '').replace('index.php', '')
      const fullPath = [path, icon].join('');
      return icon.includes('http') ? icon : fullPath;
    },
    getTitle(title) {
      return [
        title,
        'ЛКМ — отправить в чат',
        'ПКМ — добавить в поле ввода',
      ].filter((text) => text).join('\n');
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
.pack h3
  display inline-block
  background-color #ffffff
.stickers
  display flex
  flex-wrap wrap
  column-gap 20px
  list-style-type none
  padding-left 0
</style>
