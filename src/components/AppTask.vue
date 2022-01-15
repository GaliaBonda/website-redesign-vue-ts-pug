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
      if (this.$store.state.mouseIsTracked) return;
      this.$store.commit('changeMouseTracking', true);
      const currentCard = event.currentTarget as HTMLElement;
      currentCard.style.position = 'absolute';
      currentCard.style.zIndex = '1000';
      this.$store.commit('setCurrentCard', {
        card: currentCard,
        id: this.id,
      });
    },

    stopCardMoving(event: MouseEvent) {
      if (this.toDoEdge && this.inProgressEdge) this.relocateCard(event.clientX, this.toDoEdge, this.inProgressEdge);
      this.$store.commit('changeMouseTracking', false);
      const currentCard = this.$store.state.currentCard;
      currentCard.style.zIndex = '1';
      this.$store.commit('setCurrentCard', null);
    },
    relocateCard(x: number, todoEdge: number, inProgressEdge: number) {
      const currentStatus = this.$store.state.tasks.find((item) => item.id === this.$store.state.id).status;
      if (x > todoEdge && x < inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.id, status: Status.INPROGRESS});
      } else if (x > inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.id, status: Status.DONE});
      } else if (x < todoEdge && currentStatus !== Status.DONE) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.id, status: Status.TODO});
      }
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
