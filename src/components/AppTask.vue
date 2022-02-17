<template lang="pug">
.task(v-bind:class="[taskClass, {expired: isExpired}, {attention: isUnderAttention}]" 
v-on:mousedown.stop.prevent="startMoving"  
v-on:mouseup.stop.prevent="stopCardMoving")
  .task-name {{name}}
  .task-deadline {{formatDate(deadLine)}}
  button.task-details-btn.record__btn(v-on:click="showDetails") Details...
TaskDetailsModal(v-show="detailsModalIsOpen" 
v-on:close-details-modal="closeDetails" 
v-bind:name="name" 
v-bind:desc="desc" v-bind:deadLine="deadLine" 
v-bind:status="status" v-bind:id="id"
v-bind:editAllow="true")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {formatDate} from '@/mixins/formatDate';
import {computed, defineComponent, ref} from 'vue';
import TaskDetailsModal from './TaskDetailsModal.vue';
import useFormatDate from '@/composables/useFormatDate';
import {useStore} from 'vuex';
import Task from '@/interfaces/task.interface';

export default defineComponent({
  name: 'AppTask',
  components: {
    TaskDetailsModal,
  },
  data: () => {
    return {
      count: 1,
    };
  },
  props: {
    name: String,
    desc: String,
    deadLine: Date,
    id: Number,
    status: {
      type: String,
    },
    toDoEdge: Number,
    inProgressEdge: Number,
  },
  // data: () => {
  //   return {
  //     count: 1,
  //   };
  // },
  setup(props) {
    let detailsModalIsOpen = ref(false);
    const formatDate = useFormatDate(props.deadLine);

    const taskClass = computed(() => {
      let taskStyle = '';
      switch (props.status) {
        case Status.TODO:
          taskStyle = 'todo';
          break;
        case Status.INPROGRESS:
          taskStyle = 'inprogress';
          break;
        case Status.DONE:
          taskStyle = 'done';
          break;
      }
      return taskStyle;
    });
    const isExpired = computed(() => {
      if (!props.deadLine) return false;
      const todayDate = new Date();
      const difference = +props.deadLine - +todayDate;
      if (difference < 0) return true;
      return false;
    });
    const isUnderAttention = computed(() => {
      const oneDayInMs = 86400000;
      if (!props.deadLine) return false;
      const todayDate = new Date();
      const diff = +props.deadLine - +todayDate;
      if (diff >= 0 && Math.abs(diff) <= oneDayInMs) return true;
      return false;
    });

    const store = useStore();
    const startMoving = (event: MouseEvent) => {
      if (store.state.moving.mouseIsTracked) return;
      store.commit('changeMouseTracking', true);
      const currentCard = event.currentTarget as HTMLElement;
      currentCard.style.position = 'absolute';
      currentCard.style.zIndex = '1000';
      store.commit('setCurrentCard', {
        card: currentCard,
        id: props.id,
      });
    };

    const stopCardMoving = (event: MouseEvent) => {
      if (props.toDoEdge && props.inProgressEdge) relocateCard(event.clientX, props.toDoEdge, props.inProgressEdge);
      store.commit('changeMouseTracking', false);
      const currentCard = store.state.moving.currentCard;
      if (currentCard) {
        currentCard.style.zIndex = '1';
        store.commit('setCurrentCard', null);
      }
    };
    const relocateCard = (x: number, todoEdge: number, inProgressEdge: number) => {
      const currentStatus = store.state.main.tasks.find((item: Task) => item.id === store.state.moving.id).status;
      if (x > todoEdge && x < inProgressEdge) {
        store.commit('changeTaskStatus', {id: store.state.moving.id, status: Status.INPROGRESS});
      } else if (x > inProgressEdge) {
        store.commit('changeTaskStatus', {id: store.state.moving.id, status: Status.DONE});
      } else if (x < todoEdge && currentStatus !== Status.DONE) {
        store.commit('changeTaskStatus', {id: store.state.moving.id, status: Status.TODO});
      }
    };
    const showDetails = () => {
      detailsModalIsOpen.value = true;
    };
    const closeDetails = () => {
      detailsModalIsOpen.value = false;
    };

    return {
      detailsModalIsOpen,
      formatDate,
      taskClass,
      isExpired,
      isUnderAttention,
      startMoving,
      stopCardMoving,
      showDetails,
      closeDetails,
    };
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.task {
  background-color: $bg-color;
  padding: 5px;
  width: calc(max(13vw, 150px));
  display: flex;
  flex-direction: column;
  gap: 10px;
  outline: 2px solid $active-font;
  &-name {
    opacity: 0.7;
    font-size: 14px;
    margin-bottom: 7px;
  }
  &-deadline {
    font-weight: bold;
    opacity: 0.7;
  }
  &-details-btn {
    width: 100px;
    border-color: $active-font;
  }
}

.todo {
  background-color: $todo-bg;
}
.inprogress {
  background-color: $inprogress-bg;
}
.done {
  background-color: $done-bg;
}
.expired {
  box-shadow: 0px 0px 15px 2px $expired-shadow;
}
.attention {
  box-shadow: 0px 0px 15px 2px $attention-shadow;
}
</style>
