<template>
  <div class="card" :class="{ disabled: !active }" :title="title">
    <header class="card__header">
      <app-icon
        class="card__icon"
        name="close-circle"
        @click.stop="$emit('remove')"
      ></app-icon>
      <input
        v-model="active"
        :id="id"
        type="checkbox"
        @click="$emit('toggle', $event.target.checked)"
      >
    </header>
    <label :for="id" class="card__label">
      <img
        class="card__image"
        :src="icon"
        :alt="title"
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
