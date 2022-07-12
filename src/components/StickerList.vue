<template>
  <div>
    <div
      v-for="(pack, key) in stickers"
      :key="key"
      class="pack"
    >
      <h3>
        {{ pack.title }} <a v-if="pack.link" :href="pack.link" target="_blank">🔗</a>
      </h3>
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
  </div>
</template>

<script>
import config from '../config';
import stickers from '../stickers';

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
        // width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
      };
    },
    getIcon(icon) {
      const fullPath = [config.path, 'dist', icon].join('/');
      return icon.includes('http') ? icon : fullPath;
    },
  },
  data() {
    return {
      stickers,
      size: 100,
    };
  },
};
</script>

<style lang="stylus">
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
