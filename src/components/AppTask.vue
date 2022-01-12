<template lang="pug">
.task(v-on:mousedown.stop="startMoving" v-on:mouseup.stop="stopMoving")
  .task-name {{name}}
  .task-deadline {{deadLine}}
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppTask',
  props: {
    name: String,
    desc: String,
    deadLine: String,
    id: Number,
    status: {
      type: Object as () => Status,
    },
  },
  methods: {
    startMoving(event: MouseEvent) {
      if (event.target) (event.target as HTMLElement).style.color = 'red';
    },
    stopMoving(event: MouseEvent) {
      if (event.target) (event.target as HTMLElement).style.color = 'black';
    },
  },
});
</script>

<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.task {
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
