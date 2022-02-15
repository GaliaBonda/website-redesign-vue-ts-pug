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
          AppKanbanTasks(v-bind:status="item[0].status" 
          v-bind:tasks="item" 
          v-bind:toDoEdge="toDoEdge" v-bind:inProgressEdge="inProgressEdge")
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import AppKanbanTasks from '../components/AppKanbanTasks.vue';
import {Calendar, DatePicker} from 'v-calendar';
import {useStore} from 'vuex';
import useTasksSearch from '@/composables/useTasksSearch';
import useTasksFilter from '@/composables/useTasksFilter';

export default defineComponent({
  name: 'AppContentKanban',
  components: {
    AppKanbanTasks,
    Calendar,
    DatePicker,
  },
  setup() {
    const store = useStore();
    let stateTasks = computed(() => store.state.main.tasks);

    const {
      taskName,
      searchedTasks,
      calendarIsOpen,
      range,
      calendarSearchIsOn,
      openCalendar,
      closeCalendar,
      runCalendarSearch,
      disableCalendarSearch,
    } = useTasksSearch(stateTasks.value);

    const {filteredKanbanTasks} = useTasksFilter(searchedTasks);

    let toDoEdge = ref(0);
    let inProgressEdge = ref(0);
    const moveCurrentCard = (event: MouseEvent) => {
      if (store.state.moving.mouseIsTracked) {
        const currentCard = store.state.moving.currentCard;
        if (currentCard) {
          currentCard.style.left = event.pageX - currentCard.offsetWidth / 2 + 'px';
          currentCard.style.top = event.pageY - currentCard.offsetHeight / 2 + 'px';
        }
      }
    };
    const calculateTableSizes = (event: MouseEvent) => {
      if (event.currentTarget) {
        const kanbanTable = event.currentTarget as HTMLElement;
        const kanbanTableWidth = kanbanTable.getBoundingClientRect().width;
        toDoEdge.value = kanbanTable.getBoundingClientRect().left + kanbanTableWidth / 3;
        inProgressEdge.value = toDoEdge.value + kanbanTableWidth / 3;
      }
    };
    return {
      toDoEdge,
      inProgressEdge,
      moveCurrentCard,
      calculateTableSizes,
      taskName,
      searchedTasks,
      stateTasks,
      filteredKanbanTasks,
      calendarIsOpen,
      range,
      calendarSearchIsOn,
      openCalendar,
      closeCalendar,
      runCalendarSearch,
      disableCalendarSearch,
    };
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
