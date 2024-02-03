<template>
  <header class="header">
    <div class="l-wrapper">
      <app-panel
        :is-popup="popup"
        @add-sticker="onAddSticker"
        @close-popup="popup = false"
      >
        <h1 class="header__title">bitrix24-stickerpack-bot</h1>
      </app-panel>
    </div>
  </header>
  <main class="page">
    <div class="l-wrapper">
      <app-grid
        :title="customStickers.title"
        :list="customStickers.list"
        is-add
        @open-popup="popup = true"
        @remove-sticker="onRemoveSticker"
      ></app-grid>
      <app-grid
        v-for="(pack, key) in stickers"
        :key="`${pack.title}_${key}`"
        :title="pack.title"
        :list="pack.list"
        :link="pack.link"
        @toggle-sticker="onToggleSticker(key, $event)"
      ></app-grid>
    </div>
  </main>
</template>

<script>
import AppPanel from './Panel.vue';
import AppGrid from './Grid.vue';
import config from '../config';
import stickers, { marketplace } from '../packs';
import api from '../api';

export default {
  methods: {
    getIcon({ icon, size = 100, title = 'Noname' }) {
      const fullPath = [config.path, icon].join('');
      const path = icon.includes('http') ? icon : fullPath;
      return `[icon=${path} size=${size} title=${title}]`;
    },
    onSave() {
      api.set(this.customStickers.list);
    },
    onToggleSticker(key, [index, checked]) {
      this.stickers[key].list[index].visible = checked;
    },
    onAddSticker(sticker) {
      this.customStickers.list.push(sticker);
      this.popup = false;
      this.onSave();
    },
    onRemoveSticker(sticker) {
      this.customStickers.list = this.customStickers.list.filter((item) => item !== sticker);
      this.onSave();
    },
    setTitle() {
      const title = this.isMarketplace ? 'Секретный бот 🤖' : config.global.appName;
      if (this.$BX24) this.$BX24.setTitle(title);
    },
  },
  computed: {
    stickers() {
      if (this.isMarketplace) return marketplace;
      return stickers;
    },
    text() {
      const text = [];

      [this.customStickers, ...this.stickers].forEach((pack) => {
        pack.list.forEach((sticker) => {
          if (sticker.visible !== false) text.push(this.getIcon(sticker));
        });
      });

      return text.join('');
    },
    isMarketplace() {
      return this.state === 'marketplace';
    },
  },
  created() {
    if (this.$BX24) this.$BX24.setTitle(config.global.appName);

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyT') {
        e.preventDefault();
        this.setTitle();
        this.state = this.isMarketplace ? 'default' : 'marketplace';
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
      popup: false,
    };
  },
  inject: ['$BX24'],
  components: {
    AppPanel,
    AppGrid,
  },
  name: 'app-page',
};
</script>
