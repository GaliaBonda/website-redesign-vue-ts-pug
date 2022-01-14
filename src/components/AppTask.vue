<template lang="pug">
.task(v-on:mousedown.stop.prevent="startMoving"  v-on:mouseup.stop.prevent="stopCardMoving" v-on:ondragstart.stop.prevent)
  .task-name {{name}}
  .task-deadline {{deadLine}}
  button.task-details-btn.record__btn(v-on:click="showDetails") Details...
TaskDetailsModal(v-show="detailsModalIsOpen" v-on:close-details-modal="closeDetails" v-bind:name="name" v-bind:desc="desc" v-bind:deadLine="deadLine" v-bind:status="status" v-bind:id="id")
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
      // const taskCard = event.target as HTMLElement;
      // taskCard.style.position = 'absolute';
      // taskCard.style.zIndex = '1000';
      // this.shiftX = event.clientX - taskCard.getBoundingClientRect().left;
      // this.shiftY = event.clientY - taskCard.getBoundingClientRect().top;
      const currentCard = event.currentTarget as HTMLElement;
      currentCard.style.position = 'absolute';
      currentCard.style.zIndex = '1000';
      console.log('currentCard ', currentCard);
      this.$store.commit('setCurrentCard', {
        card: currentCard,
        id: this.id,
        shiftX: event.clientX - currentCard.getBoundingClientRect().left,
        shiftY: event.clientY - currentCard.getBoundingClientRect().top,
      });
      // this.$emit('move-task-card', {card: currentCard, id: this.id, shiftX: this.shiftX, shiftY: this.shiftY});
      // console.log(this.shiftX, this.shiftY);
    },
    stopCardMoving() {
      this.$store.commit('changeMouseTracking', false);
      const currentCard = this.$store.state.currentCard;
      currentCard.style.zIndex = '1';
      this.$store.commit('setCurrentCard', null);
    },
    // moveCard(event: MouseEvent) {
    //   if (this.$store.state.mouseIsTracked && event.currentTarget) {
    //     let mouseCoord = this.$store.state.mouseCoordinates;
    //     const taskCard = event.target as HTMLElement;
    //     console.log(taskCard);

    //     taskCard.style.left = mouseCoord[0] - this.shiftX + 'px';
    //     taskCard.style.top = mouseCoord[1] - this.shiftY + 'px';
    //     // console.log(mouseCoord[0], mouseCoord[1]);
    //     const todoEdge = this.toDoEdge;
    //     const inProgressEdge = this.inProgressEdge;
    //     if (todoEdge && inProgressEdge) this.relocateCard(mouseCoord, todoEdge, inProgressEdge);
    //   }
    // },
    // relocateCard(mouseCoord: [number, number], todoEdge: number, inProgressEdge: number) {
    //   if (mouseCoord[0] > todoEdge && mouseCoord[0] < inProgressEdge) {
    //     this.$store.commit('changeTaskStatus', {id: this.id, status: Status.INPROGRESS});
    //   } else if (mouseCoord[0] > inProgressEdge) {
    //     this.$store.commit('changeTaskStatus', {id: this.id, status: Status.DONE});
    //   } else if (mouseCoord[0] < todoEdge) {
    //     if (this.status !== Status.DONE) {
    //       this.$store.commit('changeTaskStatus', {id: this.id, status: Status.TODO});
    //     }
    //   }
    // },
    stopMoving(event: MouseEvent) {
      console.log('stopppp');

      this.$store.commit('changeMouseTracking', false);
      const taskCard = event.target as HTMLElement;
      taskCard.style.zIndex = '1';
      this.$store.commit('setCurrentCard', null);
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
