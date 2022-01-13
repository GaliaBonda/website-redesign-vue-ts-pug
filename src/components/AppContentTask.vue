<template lang="pug">
.content__task
  h3.record__title {{name}}
  .record__info
    p.record__text(v-bind:ref="setItemRef") {{desc}}
    p.record__status {{status}}
    p.record__date {{deadLine}}
  .record__btns
    button.record__btn(v-on:click="showDetails") Details...
    button.record__delete-btn.record__btn(v-on:click="deleteTask(index)") Delete task
  TaskDetailsModal(v-show="detailsModalIsOpen" v-on:close-details-modal="closeDetails" v-bind:name="name" v-bind:desc="desc" v-bind:deadLine="deadLine" v-bind:status="status" v-bind:id="id")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent} from 'vue';
import TaskDetailsModal from './TaskDetailsModal.vue';

export default defineComponent({
  name: 'AppContentTask',
  components: {
    TaskDetailsModal,
  },
  data() {
    return {
      detailsModalIsOpen: false,
    };
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
    deleteTask(index: number) {
      this.$store.commit('removeTask', index);
    },
    showDetails() {
      this.detailsModalIsOpen = true;
    },
    closeDetails() {
      this.detailsModalIsOpen = false;
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';
.record__btns {
  display: flex;
  justify-content: space-between;
}
</style>
