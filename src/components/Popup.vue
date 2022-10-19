<template>
  <div class="popup">
    <div
      class="popup__overlay"
      @click="onClose"
    ></div>
    <div class="popup__window">
      <div class="popup__header">
        <app-icon
          name="close-circle"
          @click="onClose"
        ></app-icon>
      </div>
      <div class="popup__body">
        <table>
          <thead>
            <tr>
              <th colspan="2">
                <div class="popup__image">
                  <img
                    :src="icon"
                    :alt="title"
                    :title="title"
                    :style="`width: ${sizes[size]}px`"
                  >
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Адрес:</td>
              <td>
                <input type="text" v-model="icon">
              </td>
            </tr>
            <tr>
              <td>Описание:</td>
              <td>
                <input type="text" v-model="title">
              </td>
            </tr>
            <tr>
              <td>Размер ({{ sizes[size] }}):</td>
              <td>
                <input type="range" min="0" step="1" max="2" v-model.number="size">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="popup__footer">
        <app-button icon="plus" @click="onAdd">Добавить стикер</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from './Button.vue';
import AppIcon from './Icon.vue';

export default {
  methods: {
    onClose() {
      this.$emit('close');
    },
    onAdd() {
      this.$emit('add', {
        icon: this.icon,
        title: this.title,
        size: this.sizes[this.size],
      });
      this.onClose();
    },
  },
  data() {
    return {
      sizes: [100, 32, 27],
      size: 0,
      icon: '',
      title: '',
    };
  },
  components: {
    AppButton,
    AppIcon,
  },
  name: 'app-popup',
};
</script>

<style lang="stylus">
.popup
  &__overlay
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(#000000, .7)
  &__window
    position fixed
    top 50%
    left 50%
    padding 10px
    transform translate(-50%, -50%)
    background-color #FFFFFF
  &__body
    margin 10px 0
  &__image
    min-height 100px
  &__footer
    display flex
    column-gap 10px
    justify-content flex-end
</style>
