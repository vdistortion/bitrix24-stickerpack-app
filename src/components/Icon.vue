<template>
  <span class="mdi" :class="`mdi-${name}`"></span>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  name: 'app-icon',
};
</script>
