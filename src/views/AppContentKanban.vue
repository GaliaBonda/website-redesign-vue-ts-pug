<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Kanban Board
    .content__records
      .content__table.kanban-table 
        .kanban-table__item(v-for="(item, index) in filteredKanbanTasks" v-bind:key="index") 
          AppKanbanTasks(v-bind:status="item[0].status" v-bind:tasks="item")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import Task from '@/interfaces/task.interface';
import {defineComponent} from 'vue';
import AppKanbanTasks from '../components/AppKanbanTasks.vue';

export default defineComponent({
  name: 'AppContentKanban',
  components: {
    AppKanbanTasks,
  },
  data() {
    return {};
  },
  computed: {
    stateTasks(): Task[] {
      return this.$store.state.tasks;
    },
    toDoTasks(): Task[] {
      return this.stateTasks.filter((item) => item.status === Status.TODO);
    },
    inProgressTasks(): Task[] {
      return this.$store.state.tasks.filter((item) => item.status === Status.INPROGRESS);
    },
    doneTasks(): Task[] {
      return this.$store.state.tasks.filter((item) => item.status === Status.DONE);
    },
    filteredKanbanTasks() {
      return [this.toDoTasks, this.inProgressTasks, this.doneTasks];
    },
  },
  methods: {},
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.kanban-table {
  display: flex;
  justify-content: space-between;
  outline: 4px solid $more-bg;

  &__item {
    border-left: 8px solid $more-bg;
    padding: 8px;
  }

  &__item:first-child {
    border-left: none;
  }
}

.table {
  width: 100%;
  border: 4px solid $more-bg;
  border-collapse: collapse;
  opacity: 0.7;
  font-size: 14px;
  &__head-cell {
    text-transform: uppercase;
  }
  &__cell {
    padding: 10px;
    border-bottom: 10px solid $more-bg;
    line-height: 30px;
  }
  &-cell__date {
    display: block;
    font-weight: bold;
  }
}
</style>
