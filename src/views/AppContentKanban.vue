<template lang="pug">
.content.main__content(v-on:mousemove="moveCurrentCard")
  .content__container
    h2.content__date Kanban Board
    .content__records
      .content__search
        label.search-label Task name search:
          input.search(type="text" v-model="taskName")
        .content-search__calendar 
          p.calendar-search__label.search-label(v-on:click="openCalendar") Calendar search:
          .calendar(v-if="calendarIsOpen")
            DatePicker.calendar__date-picker(v-model="range" is-range )
            
            button.calendar-btn.record__btn(v-on:click="disableCalendarSearch") Show all tasks
            button.calendar-btn.record__btn.close-btn(v-on:click="closeCalendar") x
      .content__table.kanban-table(v-on:mousemove="calculateTableSizes") 
        .kanban-table__item(v-for="(item, index) in filteredKanbanTasks" v-bind:key="index") 
          AppKanbanTasks(v-bind:status="item[0].status" v-bind:tasks="item" v-bind:toDoEdge="toDoEdge" v-bind:inProgressEdge="inProgressEdge")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import Task from '@/interfaces/task.interface';
import {defineComponent} from 'vue';
import AppKanbanTasks from '../components/AppKanbanTasks.vue';
import {Calendar, DatePicker} from 'v-calendar';

export default defineComponent({
  name: 'AppContentKanban',
  components: {
    AppKanbanTasks,
    Calendar,
    DatePicker,
  },
  data() {
    return {
      toDoEdge: 0,
      inProgressEdge: 0,
      taskName: '',
      calendarIsOpen: false,
      range: {
        start: new Date(),
        end: new Date(),
      },
      calendarSearchIsOn: false,
    };
  },
  computed: {
    stateTasks(): Task[] {
      return this.$store.state.main.tasks;
    },
    searchedTasks(): Task[] {
      let filteredTasks = this.stateTasks.filter((item) =>
        item.name.toLowerCase().includes(this.taskName.toLowerCase()),
      );
      if (this.calendarSearchIsOn) {
        filteredTasks = filteredTasks.filter((item) => {
          const day = Number.parseInt(item.deadLine.slice(0, 2));
          const month = Number.parseInt(item.deadLine.slice(3, 5)) - 1;
          const year = Number.parseInt(item.deadLine.slice(6));
          const date = new Date(year, month, day);
          return date >= this.range.start && date <= this.range.end;
        });
      }
      return filteredTasks;
    },
    toDoTasks(): Task[] {
      return this.searchedTasks.filter((item) => item.status === Status.TODO);
    },
    inProgressTasks(): Task[] {
      return this.searchedTasks.filter((item) => item.status === Status.INPROGRESS);
    },
    doneTasks(): Task[] {
      return this.searchedTasks.filter((item) => item.status === Status.DONE);
    },
    filteredKanbanTasks(): Task[][] | {status: Status}[][] {
      const toDoArray = this.toDoTasks.length > 0 ? this.toDoTasks : [{status: Status.TODO}];
      const inProgressArray = this.inProgressTasks.length > 0 ? this.inProgressTasks : [{status: Status.INPROGRESS}];
      const doneArray = this.doneTasks.length > 0 ? this.doneTasks : [{status: Status.DONE}];
      return [toDoArray, inProgressArray, doneArray];
    },
  },
  methods: {
    filterTasks() {
      let filteredTasks = this.stateTasks.filter((item) => item.name.includes(this.taskName));

      if (this.calendarSearchIsOn) {
        filteredTasks = filteredTasks.filter((item) => {
          const day = Number.parseInt(item.deadLine.slice(0, 2));
          const month = Number.parseInt(item.deadLine.slice(3, 5)) - 1;
          const year = Number.parseInt(item.deadLine.slice(6));
          const date = new Date(year, month, day);
          console.log(date >= this.range.start);
          return date >= this.range.start && date <= this.range.end;
        });
      }
      return filteredTasks;
    },
    moveCurrentCard(event: MouseEvent) {
      if (this.$store.state.moving.mouseIsTracked) {
        const currentCard = this.$store.state.moving.currentCard;
        if (currentCard) {
          currentCard.style.left = event.pageX - currentCard.offsetWidth / 2 + 'px';
          currentCard.style.top = event.pageY - currentCard.offsetHeight / 2 + 'px';
        }
      }
    },
    calculateTableSizes(event: MouseEvent) {
      if (event.currentTarget) {
        const kanbanTable = event.currentTarget as HTMLElement;
        const kanbanTableWidth = kanbanTable.getBoundingClientRect().width;
        this.toDoEdge = kanbanTable.getBoundingClientRect().left + kanbanTableWidth / 3;
        this.inProgressEdge = this.toDoEdge + kanbanTableWidth / 3;
      }
    },
    openCalendar() {
      this.calendarIsOpen = true;
    },
    closeCalendar() {
      this.calendarIsOpen = false;
    },
    runCalendarSearch() {
      this.calendarSearchIsOn = !this.calendarSearchIsOn;
    },
    disableCalendarSearch() {
      this.calendarSearchIsOn = false;
    },
  },
  watch: {
    range(newVal, oldVal) {
      this.calendarSearchIsOn = true;
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

.search-label {
  opacity: 0.7;
  font-size: 16px;
}

.search {
  width: 100%;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 5px;
  border: none;
  outline: 4px solid $more-bg;
}

.content__search {
  margin-bottom: 20px;
  margin-top: 20px;
}

.content-search__calendar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calendar-search__label {
  padding: 10px;
  outline: 4px solid $more-bg;
  margin-bottom: 20px;
  background-color: $more-bg;
}

.calendar-search__label:hover {
  background-color: white;
  color: $active-font;
  cursor: pointer;
}

.calendar {
  display: flex;
  gap: 50px;
  align-items: center;
  position: relative;
}

.calendar-btn {
  display: block;
  height: 50px;
}

.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 35px;
  width: 35px;
  font-family: Arial, Helvetica, sans-serif;
  opacity: 0.7;
  font-size: 20px;
}
</style>
