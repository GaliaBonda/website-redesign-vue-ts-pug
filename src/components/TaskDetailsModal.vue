<template lang="pug">
.modal-background
  .details-modal
    h3.record__title {{name}}
    p.record__text.details__text {{desc}}
    p.record__status {{status}}
    p.record__date {{deadLine}}
    button.record__btn.details-btn(v-on:click="closeModal") Close 
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Status from '../interfaces/status.interface';

export default defineComponent({
  name: 'TaskDetailsModal',
  data() {
    return {};
  },
  props: {
    name: String,
    desc: String,
    deadLine: String,
    id: Number,
    status: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-details-modal');
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.details-modal {
  padding: 10px;
  min-width: 200px;
  height: 200px;
  background-color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.details__text {
  padding: 0;
  margin: 0;
}
.details-btn {
  width: 100px;
}
</style>
