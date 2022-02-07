<template lang="pug">
.content__task
  h3.record__title {{name}}
  .record__info
    p.record__text(ref="record") {{desc}}
    p.record__status {{status}}
    p.record__date {{formatDate(deadLine)}}
  .record__btns
    button.record__btn(v-on:click="showDetails") Details...
    button.record__delete-btn.record__btn(v-on:click="deleteTask(index)") Delete task
  TaskDetailsModal(v-show="detailsModalIsOpen" 
  v-on:close-details-modal="closeDetails" 
  v-bind:name="name" v-bind:desc="desc" v-bind:deadLine="deadLine" 
  v-bind:status="status" v-bind:id="id" v-bind:editAllow="true")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent, PropType} from 'vue';
import TaskDetailsModal from './TaskDetailsModal.vue';
import {formatDate} from '../mixins/formatDate';

export default defineComponent({
  name: 'AppContentTask',
  components: {
    TaskDetailsModal,
  },
  mixins: [formatDate],
  data() {
    return {
      detailsModalIsOpen: false,
    };
  },
  props: {
    name: String,
    desc: String,
    deadLine: Date,
    id: Number,
    status: {
      type: String as PropType<Status>,
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
    animateRecord() {
      const el = this.$refs.record as HTMLElement;
      if (el) el.classList.add('grow-animation');
    },
    animateNewTask() {
      const el = this.$refs.record as HTMLElement;
      if (el) el.classList.add('blink-animation');
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

@keyframes grow {
  0% {
  }
  50% {
    transform: scale(1.15, 1.15);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes blink {
  0% {
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.blink-animation {
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: 3;
}

.grow-animation {
  animation-name: grow;
  animation-duration: 2s;
}
</style>
