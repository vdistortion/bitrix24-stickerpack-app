<template>
  <a :href="dirname" :title="'Скачать последнюю версию '+filename" :download="filename">
    <span class="mdi mdi-download"></span>
  </a>
</template>

<script>
import config from '../../config';

export default {
  computed: {
    dirname() {
      return [config.path, config.global.archiveName].join('');
    },
    filename() {
      return config.global.archiveHashName;
    },
  },
  name: 'dev-panel-download',
};
</script>
