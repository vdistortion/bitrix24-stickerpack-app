<template>
  <a href="#" title="Настройки встраивания">
    <span class="mdi mdi-tools"></span>
  </a>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.code === 'KeyS') {
        console.log('open tools');
      }
    });
  },
  name: 'dev-panel-tools',
};
</script>
