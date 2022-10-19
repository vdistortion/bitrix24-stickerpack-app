<template>
  <button class="button">
    <app-icon v-if="icon" class="button__icon" :name="icon"></app-icon>
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import AppIcon from './Icon.vue';

export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  components: {
    AppIcon,
  },
  name: 'app-button',
};
</script>

<style lang="stylus">
@require '../assets/smartgrid.styl'

.button
  display flex
  column-gap 5px
  justify-content center
  align-items center
  cursor pointer
  height 36px
  min-width 64px
  padding 0 16px
  background-color #3f51b5
  border-color #3f51b5
  color #ffffff
  text-transform uppercase
  font-weight 500
  box-shadow 0 3px 1px -2px rgba(0,0,0,.2),
             0 2px 2px 0 rgba(0,0,0,.14),
             0 1px 5px 0 rgba(0,0,0,.12)
  &__icon
    font-size 18px
  &__text
    display none
    +from(1000px)
      display block
</style>
