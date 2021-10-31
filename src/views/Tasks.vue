<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Today tasks
    .content__records
      .record.content__record(v-for="item in tasks" v-bind:key="item.id")
        h3.record__title {{item.name}}
        .record__info
          p.record__text {{item.desc}}
          p.record__date {{item.deadLine}}
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Task from '../interfaces/task.interface';

const tasks: Task[] = [
  {
    name: 'Design mockup',
    desc: "Create full rendering of design for client's web-product. Client K&H Science",
    deadLine: '12.11',
    id: 111,
  },
  {
    name: 'Analysis of requirements and outcomes',
    desc: 'Evaluate the product design and development against project requirements and outcomes',
    deadLine: '14.12',
    id: 222,
  },
  {
    name: 'Application Testing',
    desc: 'Identify errors in a website, provide unit, system and functional testing',
    deadLine: '21.11',
    id: 333,
  },
];

export default defineComponent({
  name: 'Tasks',
  data() {
    return {
      tasks: tasks,
    };
  },
});
</script>

<style scoped lang="scss">
.record__title {
  padding: 10px;
  opacity: 0.5;
  font-size: 12px;
  text-transform: uppercase;
}
</style>
