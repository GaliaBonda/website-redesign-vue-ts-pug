<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Today tasks
    AppNewTaskModal(v-show="modalIsOpen" v-on:close-modal="closeNewTaskModal")
    .content__records
      button.record__btn(v-on:click="openNewTaskModal") Add new task
      .record.content__record(v-for="(item, index) in this.$store.state.main.tasks" v-bind:key="item.id")
        AppContentTask(v-bind:ref="setItemRef" 
        v-bind:name="item.name" 
        v-bind:desc="item.desc" 
        v-bind:deadLine="item.deadLine" 
        v-bind:status="item.status" 
        v-bind:id="item.id")
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeUpdate, onMounted, onUpdated} from 'vue';
import {useStore} from 'vuex';
import AppContentTask from '../components/AppContentTask.vue';
import AppNewTaskModal from '../components/AppNewTaskModal.vue';
import TaskDetailsModal from '../components/TaskDetailsModal.vue';

export default defineComponent({
  name: 'AppContentTasks',
  components: {
    AppNewTaskModal,
    TaskDetailsModal,
    AppContentTask,
  },
  data() {
    return {
      modalIsOpen: false,
      detailsModalIsOpen: false,
    };
  },
  setup() {
    const store = useStore();
    let stateTasks = computed(function () {
      return store.state.main.tasks;
    });
    let itemRefs: any[] = [];
    let tasksNumber: number;
    const setItemRef = (el: any) => {
      if (el) {
        itemRefs.push(el);
      }
    };
    onMounted(() => {
      tasksNumber = stateTasks.value.length;
      itemRefs.forEach((el, index) => {
        const delay = index * 1000;
        setTimeout(() => {
          el.animateRecord();
        }, delay);
      });
    });
    onBeforeUpdate(() => {
      itemRefs = [];
    });
    onUpdated(() => {
      if (tasksNumber < stateTasks.value.length) itemRefs[itemRefs.length - 1].animateNewTask();
      tasksNumber = stateTasks.value.length;
    });
    return {
      setItemRef,
    };
  },
  methods: {
    deleteTask(index: number) {
      this.$store.commit('removeTask', index);
    },
    openNewTaskModal() {
      this.modalIsOpen = true;
    },
    closeNewTaskModal() {
      this.modalIsOpen = false;
    },
    openDetailsModal() {
      this.detailsModalIsOpen = true;
    },
    closeDetailsModal() {
      this.detailsModalIsOpen = false;
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

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
