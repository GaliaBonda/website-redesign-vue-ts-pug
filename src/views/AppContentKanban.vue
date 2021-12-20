<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Kanban Board
    .content__records
      table.content__table.table
        tr.table__head.table__row
            th.table__cell.table__head-cell To Do
            th.table__cell.table__head-cell In Progress 
            th.table__cell.table__head-cell Done
        tr.table__row
            td.table__cell(v-for="(item, index) in filteredTasks[0]" v-bind:key="index") {{item.name}} 
              span.table-cell__date {{item.deadLine}}
        tr.table__row
            td.table__cell(v-for="(item1, index1) in filteredTasks[1]" v-bind:key="index1") {{item1.name}} 
              span.table-cell__date {{item1.deadLine}}
        tr.table__row
            td.table__cell(v-for="(item2, index2) in filteredTasks[2]" v-bind:key="index2") {{item2.name}} 
              span.table-cell__date {{item2.deadLine}}
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import Task from '@/interfaces/task.interface';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppContentKanban',
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
    filteredTasks() {
      let columns = [];
      const rows = [];
      const emptyTask = {name: '', deadLine: ''};
      const maxLength = Math.max(this.toDoTasks.length, this.inProgressTasks.length, this.doneTasks.length);
      for (let i = 0; i < maxLength; i++) {
        if (this.toDoTasks[i]) {
          columns.push(this.toDoTasks[i]);
        } else {
          columns.push(emptyTask);
        }
        if (this.inProgressTasks[i]) {
          columns.push(this.inProgressTasks[i]);
        } else {
          columns.push(emptyTask);
        }
        if (this.doneTasks[i]) {
          columns.push(this.doneTasks[i]);
        } else {
          columns.push(emptyTask);
        }
        rows.push(columns);
        columns = [];
      }
      return rows;
    },
  },
  methods: {},
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

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
