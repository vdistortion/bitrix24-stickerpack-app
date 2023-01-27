<template>
  <div class="card" :class="{ disabled: !active }" :title="title">
    <header class="card__header">
      <app-icon
        v-if="isCustom"
        class="card__icon"
        name="close-circle"
        title="Удалить стикер из вашего браузера"
        @click.stop="$emit('remove')"
      ></app-icon>
      <input
        v-else
        v-model="active"
        :id="id"
        type="checkbox"
        title="Отключить стикер при копировании кода"
        @click="$emit('toggle', $event.target.checked)"
      >
    </header>
    <label :for="id" class="card__label">
      <img
        class="card__image"
        :src="icon"
        :alt="title"
        :style="{
          width: `${size}px`,
          height: `${size}px`,
        }"
      >
    </label>
  </div>
</template>

<script>
import utils from '../utils/helpers.js';
import AppIcon from './Icon.vue';

export default {
  data() {
    return {
      id: utils.uuid(),
      active: this.selected,
    };
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppIcon,
  },
  name: 'app-card',
};
</script>

<style lang="stylus">
@require '../assets/smartgrid.styl'

.card
  text-align center
  &:hover
  &.disabled
    opacity .5
  &__header
    display flex
    justify-content space-between
    align-content center
    margin-bottom 5px
  &__icon
    cursor pointer
  &__label
    display inline-block
    max-width 200px
  &__image
    max-width 100%
    height auto
    cursor pointer
</style>
