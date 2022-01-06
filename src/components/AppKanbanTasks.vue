<template lang="pug">
.kanban-tasks
  .kanban-tasks-title {{status}}
  .kanban-tasks-list
    .kanban-tasks-list__item(v-for="(item, index) in tasks" v-bind:key="index") 
      .kanban-task-name {{item.name}}
      .kanban-task-deadline {{item.deadLine}}
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppKanbanTasks',
  props: {
    status: String,
    tasks: Array,
  },
});
</script>

<style scoped lang="scss">
@import '../styles/scss/styles';

.kanban-tasks-title {
  text-transform: uppercase;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.kanban-tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kanban-task {
  &-name {
    opacity: 0.7;
    font-size: 14px;
    margin-bottom: 7px;
  }
  &-deadline {
    font-weight: bold;
    opacity: 0.7;
  }
}
</style>
