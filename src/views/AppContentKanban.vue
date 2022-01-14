<template lang="pug">
.content.main__content(v-on:mousemove="moveCurrentCard")
  .content__container
    h2.content__date Kanban Board
    .content__records
      .content__table.kanban-table(v-on:mousemove="calculateTableSizes") 
        .kanban-table__item(v-for="(item, index) in filteredKanbanTasks" v-bind:key="index") 
          AppKanbanTasks(v-bind:status="item[0].status" v-bind:tasks="item" v-bind:toDoEdge="toDoEdge" v-bind:inProgressEdge="inProgressEdge")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import Task from '@/interfaces/task.interface';
import {defineComponent} from 'vue';
import AppKanbanTasks from '../components/AppKanbanTasks.vue';

export default defineComponent({
  name: 'AppContentKanban',
  components: {
    AppKanbanTasks,
  },
  data() {
    return {
      toDoEdge: 0,
      inProgressEdge: 0,
    };
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
    filteredKanbanTasks(): Task[][] | {status: Status}[][] {
      const toDoArray = this.toDoTasks.length > 0 ? this.toDoTasks : [{status: Status.TODO}];
      const inProgressArray = this.inProgressTasks.length > 0 ? this.inProgressTasks : [{status: Status.INPROGRESS}];
      const doneArray = this.doneTasks.length > 0 ? this.doneTasks : [{status: Status.DONE}];
      return [toDoArray, inProgressArray, doneArray];
    },
  },
  methods: {
    // defineMouseCoord(event: MouseEvent) {
    //   if (this.$store.state.mouseIsTracked) {
    //     this.$store.commit('trackMouseCoordinates', [event.clientX, event.clientY]);
    //     // console.log(this.$store.state.mouseCoordinates);
    //   }
    // },
    moveCurrentCard(event: MouseEvent) {
      if (this.$store.state.mouseIsTracked) {
        const currentCard = this.$store.state.currentCard;
        const shiftX = this.$store.state.shiftX;
        const shiftY = this.$store.state.shiftY;
        // currentCard.style.left = event.clientX - shiftX + 'px';
        // currentCard.style.top = event.clientY - shiftY + 'px';
        currentCard.style.left = event.pageX - currentCard.offsetWidth / 2 + 'px';
        currentCard.style.top = event.pageY - currentCard.offsetHeight / 2 + 'px';
        if (this.toDoEdge && this.inProgressEdge) this.relocateCard(event.clientX, this.toDoEdge, this.inProgressEdge);
      }
    },
    relocateCard(x: number, todoEdge: number, inProgressEdge: number) {
      if (x > todoEdge && x < inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.id, status: Status.INPROGRESS});
      } else if (x > inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.id, status: Status.DONE});
      } else if (x < todoEdge) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.id, status: Status.TODO});
      }
      // this.stopCardMoving();
    },
    stopCardMoving() {
      const currentCard = this.$store.state.currentCard;
      currentCard.style.zIndex = '1';
      this.$store.commit('changeMouseTracking', false);
      this.$store.commit('setCurrentCard', null);
    },
    calculateTableSizes(event: MouseEvent) {
      if (this.$store.state.mouseIsTracked && event.currentTarget) {
        const kanbanTable = event.currentTarget as HTMLElement;
        const kanbanTableWidth = kanbanTable.getBoundingClientRect().width;
        this.toDoEdge = kanbanTable.getBoundingClientRect().left + kanbanTableWidth / 3;
        this.inProgressEdge = this.toDoEdge + kanbanTableWidth / 3;
        // console.log('to do edge ', this.toDoEdge);
        // console.log('in progress edge ', this.inProgressEdge);
      }
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.kanban-table {
  display: flex;
  justify-content: center;
  outline: 4px solid $more-bg;
  min-height: 50vh;

  &__item {
    border-left: 8px solid $more-bg;
    width: calc(100% / 3);
    padding: 8px;
  }

  &__item:first-child {
    border-left: none;
  }
}

.table {
  width: 100%;
  border: 4px solid $more-bg;
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
