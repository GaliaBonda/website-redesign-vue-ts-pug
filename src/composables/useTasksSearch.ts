import Status from '@/interfaces/status.interface';
import Task from '@/interfaces/task.interface';
import {computed, ref, watch} from 'vue';

export default function useTasksSearch(stateTasks: Task[]) {
  const taskName = ref('');
  const calendarIsOpen = ref(false);
  const range = ref({
    start: new Date(),
    end: new Date(),
  });
  const calendarSearchIsOn = ref(false);
  const openCalendar = () => {
    calendarIsOpen.value = true;
  };
  const closeCalendar = () => {
    calendarIsOpen.value = false;
  };
  const runCalendarSearch = () => {
    calendarSearchIsOn.value = !calendarSearchIsOn.value;
  };
  const disableCalendarSearch = () => {
    calendarSearchIsOn.value = false;
  };
  watch(range, () => (calendarSearchIsOn.value = true));

  const searchedTasks = computed(() => {
    let filteredTasks = stateTasks.filter((item: Task) =>
      item.name.toLowerCase().includes(taskName.value.toLowerCase()),
    );

    if (calendarSearchIsOn.value) {
      filteredTasks = filteredTasks.filter((item: Task) => {
        return item.deadLine >= range.value.start && item.deadLine <= range.value.end;
      });
    }
    return filteredTasks;
  });

  return {
    taskName,
    searchedTasks,
    stateTasks,
    calendarIsOpen,
    range,
    calendarSearchIsOn,
    openCalendar,
    closeCalendar,
    runCalendarSearch,
    disableCalendarSearch,
  };
}
