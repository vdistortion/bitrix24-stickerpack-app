<template>
  <header class="header">
    <div class="l-wrapper">
      <app-panel
        :is-popup="popup"
        @copy-code="onCopy"
        @add-sticker="onAddSticker"
        @open-popup="popup = true"
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
import copy from 'copy-to-clipboard';
import AppPanel from './Panel.vue';
import AppGrid from './Grid.vue';
import stickers from '../assets/stickers.json';
import api from '../api';

export default {
  methods: {
    getIcon({ icon, size = 100, title = 'Noname' }) {
      const fullPath = [window.location.origin, window.location.pathname, icon].join('');
      const path = icon.includes('http') ? icon : fullPath;
      return `[icon=${path} size=${size} title=${title}]`;
    },
    onCopy() {
      copy(this.text);
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
  },
  computed: {
    text() {
      const text = [];

      [this.customStickers, ...stickers].forEach((pack) => {
        pack.list.forEach((sticker) => {
          if (sticker.visible !== false) text.push(this.getIcon(sticker));
        });
      });

      return text.join('');
    },
  },
  data() {
    return {
      stickers,
      customStickers: {
        title: 'Свои стикеры',
        list: api.get(),
      },
      popup: false,
    };
  },
  components: {
    AppPanel,
    AppGrid,
  },
  name: 'app-page',
};
</script>
