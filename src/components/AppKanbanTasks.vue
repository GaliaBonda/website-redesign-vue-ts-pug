<template lang="pug">
.kanban-tasks
  .kanban-tasks-title {{status}}
  .kanban-tasks-list
    .kanban-tasks-list__item(v-for="(item, index) in tasks" v-bind:key="index")
      AppTask(v-if="item.id" v-bind:name="item.name" v-bind:desc="item.desc" v-bind:deadLine="item.deadLine" v-bind:status="item.status" v-bind:id="item.id" v-bind:toDoEdge="toDoEdge" v-bind:inProgressEdge="inProgressEdge") 
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent} from 'vue';
import AppTask from './AppTask.vue';

export default defineComponent({
  name: 'AppKanbanTasks',
  components: {
    AppTask,
  },
  props: {
    status: {
      type: String,
    },
    tasks: Array,
    toDoEdge: Number,
    inProgressEdge: Number,
  },
  methods: {},
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
  gap: 20px;
}
</style>
