<template lang="pug">
.content__task
  h3.record__title {{name}}
  .record__info
    p.record__text(ref="record") {{desc}}
    p.record__status {{status}}
    p.record__date {{formatDate(deadLine)}}
  .record__btns
    button.record__btn(v-on:click="showDetails") Details...
    button.record__delete-btn.record__btn(v-on:click="deleteTask") Delete task
  TaskDetailsModal(v-show="detailsModalIsOpen" 
  v-on:close-details-modal="closeDetails" 
  v-bind:name="name" v-bind:desc="desc" v-bind:deadLine="deadLine" 
  v-bind:status="status" v-bind:id="id" v-bind:editAllow="true")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent, onMounted, PropType, ref} from 'vue';
import TaskDetailsModal from './TaskDetailsModal.vue';
import {formatDate} from '../mixins/formatDate';
import {useStore} from 'vuex';
import useFormatDate from '@/composables/useFormatDate';

export default defineComponent({
  name: 'AppContentTask',
  components: {
    TaskDetailsModal,
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
  setup(props) {
    const store = useStore();
    let detailsModalIsOpen = ref(false);
    const deleteTask = () => {
      store.dispatch('deleteTask', props.id);
      // store.commit('removeTask', index);
    };
    const showDetails = () => (detailsModalIsOpen.value = true);
    const closeDetails = () => (detailsModalIsOpen.value = false);
    const record = ref(null);

    const animateRecord = () => {
      const el = record.value;
      if (el) (el as HTMLElement).classList.add('grow-animation');
    };
    const animateNewTask = () => {
      const el = record.value;
      if (el) (el as HTMLElement).classList.add('blink-animation');
    };

    const formatDate = useFormatDate(props.deadLine);
    return {
      detailsModalIsOpen,
      record,
      deleteTask,
      showDetails,
      closeDetails,
      animateRecord,
      animateNewTask,
      formatDate,
    };
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
