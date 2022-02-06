<template lang="pug">
.modal-background
  .message-modal
    h3.message__title {{title}}
    p.record__text.message__text {{text}}
    .message-btns
      button.record__btn.message-btn(v-show="changesAllow" v-on:click="changeData") Yes
      button.record__btn.message-btn(v-on:click="closeModal") Close  
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppMessage',
  data() {
    return {};
  },
  computed: {},
  props: {
    title: String,
    text: String,
    changesAllow: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close-message-modal');
    },
    changeData() {
      if (this.changesAllow) this.$emit('change-data');
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style lang="scss" scoped>
.message-modal {
  padding: 10px;
  min-width: 200px;
  min-height: 200px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
  color: black;
}
.message-btns {
  display: flex;
  justify-content: space-around;
}
.message-btn {
  width: 70px;
}
</style>
