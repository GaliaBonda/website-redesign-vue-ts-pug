<template lang="pug">
.task(v-on:mousedown.stop.prevent="startMoving" v-on:mouseup.stop.prevent="stopMoving" v-on:mousemove="moveCard")
  .task-name {{name}}
  .task-deadline {{deadLine}}
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppTask',
  data() {
    return {
      shiftX: 0,
      shiftY: 0,
    };
  },
  props: {
    name: String,
    desc: String,
    deadLine: String,
    id: Number,
    status: {
      type: String,
    },
    toDoEdge: Number,
    inProgressEdge: Number,
  },
  methods: {
    startMoving(event: MouseEvent) {
      this.$store.commit('changeMouseTracking', true);
      this.$store.commit('trackMouseCoordinates', [event.clientX, event.clientY]);
      const taskCard = event.currentTarget as HTMLElement;
      taskCard.style.position = 'absolute';
      taskCard.style.zIndex = '1000';
      this.shiftX = event.clientX - taskCard.getBoundingClientRect().left;
      this.shiftY = event.clientY - taskCard.getBoundingClientRect().top;
      // console.log(this.shiftX, this.shiftY);
    },
    moveCard(event: MouseEvent) {
      if (this.$store.state.mouseIsTracked && event.currentTarget) {
        let mouseCoord = this.$store.state.mouseCoordinates;
        const taskCard = event.currentTarget as HTMLElement;

        taskCard.style.left = mouseCoord[0] - this.shiftX + 'px';
        taskCard.style.top = mouseCoord[1] - this.shiftY + 'px';
        console.log(mouseCoord[0], mouseCoord[1]);
        const todoEdge = this.toDoEdge;
        const inProgressEdge = this.inProgressEdge;
        if (todoEdge && inProgressEdge) this.relocateCard(mouseCoord, todoEdge, inProgressEdge);
        // if (
        //   this.toDoEdge &&
        //   this.inProgressEdge &&
        //   mouseCoord[0] > this.toDoEdge &&
        //   mouseCoord[0] < this.inProgressEdge
        // ) {
        //   console.log('make task status in progress');
        //   this.$store.commit('changeTaskStatus', {id: this.id, status: Status.INPROGRESS});
        //   console.log(this.$store.state.tasks);
        // }
        // console.log(this.inProgressEdge, this.toDoEdge);
      }
    },
    relocateCard(mouseCoord: [number, number], todoEdge: number, inProgressEdge: number) {
      if (mouseCoord[0] > todoEdge && mouseCoord[0] < inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.id, status: Status.INPROGRESS});
      } else if (mouseCoord[0] > inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.id, status: Status.DONE});
      } else if (mouseCoord[0] < todoEdge) {
        if (this.status !== Status.DONE) {
          this.$store.commit('changeTaskStatus', {id: this.id, status: Status.TODO});
        }
      }
    },
    stopMoving(event: MouseEvent) {
      this.$store.commit('changeMouseTracking', false);
      const taskCard = event.currentTarget as HTMLElement;
      taskCard.style.zIndex = '2';
    },
  },
});
</script>

<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.task {
  background-color: $bg-color;
  padding: 5px;
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
