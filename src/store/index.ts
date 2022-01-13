import {createStore} from 'vuex';
import Task from '@/interfaces/task.interface';
import Status from '@/interfaces/status.interface';
import {State} from 'vue';
import {IfStatement} from '@vue/compiler-core';

const initialState: Task[] = [
  {
    name: 'Design mockup',
    desc: "Create full rendering of design for client's web-product. Client K&H Science",
    deadLine: '12.11.2021',
    id: 1,
    status: Status.TODO,
  },
  {
    name: 'Analysis of requirements and outcomes',
    desc: 'Evaluate the product design and development against project requirements and outcomes',
    deadLine: '14.12.2021',
    id: 2,
    status: Status.INPROGRESS,
  },
  {
    name: 'Application Testing',
    desc: 'Identify errors in a website, provide unit, system and functional testing',
    deadLine: '21.11.2021',
    id: 3,
    status: Status.DONE,
  },
];

export default createStore({
  state: {
    tasks: initialState,
    mouseIsTracked: false,
    mouseCoordinates: [0, 0],
  },
  mutations: {
    addNewTask(state, payload: Task) {
      state.tasks.push(payload);
    },
    removeTask(state, index: number) {
      state.tasks.splice(index, 1);
    },
    changeTaskStatus(state, payload: {id: number; status: Status}) {
      // const currentTask = state.tasks.find((item: Task) => item.id === payload.id);
      // if (currentTask) currentTask.status = payload.status;
      state.tasks.map((item) => {
        if (item.id === payload.id) item.status = payload.status;
      });
    },
    changeMouseTracking(state, payload: boolean) {
      state.mouseIsTracked = payload;
    },
    trackMouseCoordinates(state, payload: [number, number]) {
      state.mouseCoordinates = payload;
    },
  },
  actions: {},
  modules: {},
});
