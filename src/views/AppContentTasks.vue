<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Today tasks
    AppNewTaskModal(v-show="modalIsOpen" v-on:close-modal="closeNewTaskModal")
    .content__records
      button.record__btn(v-on:click="openNewTaskModal") Add new task
      .record.content__record(v-for="(item, index) in this.$store.state.tasks" v-bind:key="item.id")
        h3.record__title {{item.name}}
        .record__info
          p.record__text(v-bind:ref="setItemRef") {{item.desc}}
          p.record__status {{item.status}}
          p.record__date {{item.deadLine}}
        button.record__btn(v-on:click="openDetailsModal") Details...
        button.record__delete-btn.record__btn(v-on:click="deleteTask(index)") Delete task
        TaskDetailsModal(v-show="detailsModalIsOpen" v-on:close-details-modal="closeDetailsModal")
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, onUpdated} from 'vue';
import {useStore} from 'vuex';
import AppNewTaskModal from '../components/AppNewTaskModal.vue';
import TaskDetailsModal from '../components/TaskDetailsModal.vue';

export default defineComponent({
  name: 'AppContentTasks',
  components: {
    AppNewTaskModal,
    TaskDetailsModal,
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
      return store.state.tasks;
    });
    let itemRefs: HTMLElement[] = [];
    let tasksNumber: number;
    const setItemRef = (el: HTMLElement) => {
      if (el) {
        itemRefs.push(el);
      }
    };
    const animateNewTask = () => {
      itemRefs[itemRefs.length - 1].classList.add('blink-animation');
    };
    onMounted(() => {
      tasksNumber = stateTasks.value.length;
      itemRefs.forEach((el, index) => {
        const delay = index * 1000;
        setTimeout(() => {
          el.classList.add('grow-animation');
        }, delay);
      });
    });
    onUpdated(() => {
      if (tasksNumber < stateTasks.value.length) animateNewTask();
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

.record__title {
  padding: 10px;
  opacity: 0.5;
  font-size: 12px;
  text-transform: uppercase;
}
</style>
