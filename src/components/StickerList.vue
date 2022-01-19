<template>
  <div>
    <div
      v-for="(pack, key) in stickers"
      :key="key"
    >
      <h3>{{ pack.title }}</h3>
      <ul>
        <li
          v-for="(sticker, key) in pack.list"
          :key="key"
          @click="onClick(sticker.icon, sticker.title, sticker.size)"
        >
          <img
            :src="sticker.icon"
            :alt="sticker.title"
            :style="getStyle(sticker.size)"
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import stickers from '../stickers';

export default {
  methods: {
    onClick(icon, title = 'Noname Sticker', size = this.size) {
      this.sendMessage(`[icon=${icon} size=${size} title=${title}]`);
    },
    sendMessage(message) {
      window.frameCommunicationSend({ action: 'send', message });
      window.frameCommunicationSend({ action: 'close' });
    },
    getStyle(size = this.size) {
      return {
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
      };
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
