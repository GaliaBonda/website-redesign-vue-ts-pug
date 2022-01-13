<template lang="pug">
.task(v-on:mousedown.stop.prevent="startMoving" v-on:mouseup.stop.prevent="stopMoving" v-on:mousemove="moveCard" v-on:ondragstart.stop.prevent)
  .task-name {{name}}
  .task-deadline {{deadLine}}
  button.task-details-btn.record__btn(v-on:click="showDetails") Details...
  TaskDetailsModal(v-show="detailsModalIsOpen" v-on:close-details-modal="closeDetails")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent} from 'vue';
import TaskDetailsModal from './TaskDetailsModal.vue';

export default defineComponent({
  name: 'AppTask',
  components: {
    TaskDetailsModal,
  },
  data() {
    return {
      shiftX: 0,
      shiftY: 0,
      detailsModalIsOpen: false,
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
        // console.log(mouseCoord[0], mouseCoord[1]);
        const todoEdge = this.toDoEdge;
        const inProgressEdge = this.inProgressEdge;
        if (todoEdge && inProgressEdge) this.relocateCard(mouseCoord, todoEdge, inProgressEdge);
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
      taskCard.style.zIndex = '1';
    },
    showDetails() {
      this.detailsModalIsOpen = true;
    },
    closeDetails() {
      this.detailsModalIsOpen = false;
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.task {
  background-color: $bg-color;
  padding: 5px;
  width: 13vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  outline: 2px solid $active-font;
  &-name {
    opacity: 0.7;
    font-size: 14px;
    margin-bottom: 7px;
  }
  &-deadline {
    font-weight: bold;
    opacity: 0.7;
  }
  &-details-btn {
    width: 100px;
    border-color: $active-font;
  }
}
</style>
