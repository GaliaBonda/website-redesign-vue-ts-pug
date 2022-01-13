<template lang="pug">
.task(v-on:mousedown.stop="startMoving" v-on:mouseup.stop="stopMoving" v-on:mousemove="moveCard")
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
      this.$store.commit('changeMouseTracking');
      this.$store.commit('trackMouseCoordinates', [event.pageX, event.pageY]);
      const taskCard = event.currentTarget as HTMLElement;
      //   document.body.appendChild(taskCard);
      taskCard.style.position = 'absolute';
      taskCard.style.zIndex = '1000';
    },
    moveCard(event: MouseEvent) {
      if (this.$store.state.mouseIsTracked && event.currentTarget) {
        let mouseCoord = this.$store.state.mouseCoordinates;
        const taskCard = event.currentTarget as HTMLElement;
        taskCard.style.left = mouseCoord[0] - taskCard.offsetWidth / 2 + 'px';
        taskCard.style.top = mouseCoord[1] - taskCard.offsetHeight / 2 + 'px';
      }
    },
    stopMoving(event: MouseEvent) {
      this.$store.commit('changeMouseTracking');
      const taskCard = event.currentTarget as HTMLElement;
      taskCard.style.zIndex = '2';
    },
  },
});
</script>

<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.task {
  outline: 2px solid red;
  width: 13vw;
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
