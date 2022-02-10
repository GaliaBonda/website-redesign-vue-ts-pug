import Status from '@/interfaces/status.interface';
import Task from '@/interfaces/task.interface';
import {computed, ComputedRef, ref, watch} from 'vue';

export default function useTasksFilter(searchedTasks: ComputedRef<Task[]>) {
  const toDoTasks = computed(() => searchedTasks.value.filter((item: Task) => item.status === Status.TODO));
  const inProgressTasks = computed(() => searchedTasks.value.filter((item: Task) => item.status === Status.INPROGRESS));
  const doneTasks = computed(() => searchedTasks.value.filter((item: Task) => item.status === Status.DONE));

  const filteredKanbanTasks = computed(() => {
    const toDoArray = toDoTasks.value.length > 0 ? toDoTasks.value : [{status: Status.TODO}];
    const inProgressArray = inProgressTasks.value.length > 0 ? inProgressTasks.value : [{status: Status.INPROGRESS}];
    const doneArray = doneTasks.value.length > 0 ? doneTasks.value : [{status: Status.DONE}];
    return [toDoArray, inProgressArray, doneArray];
  });

  return {
    filteredKanbanTasks,
  };
}
