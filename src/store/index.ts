import {createStore} from 'vuex';
import Task from '@/interfaces/task.interface';
import Status from '@/interfaces/status.interface';
import {State} from 'vue';

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
    deadLine: '27.01.2022',
    id: 2,
    status: Status.INPROGRESS,
  },
  {
    name: 'Application Testing',
    desc: 'Identify errors in a website, provide unit, system and functional testing',
    deadLine: '21.11.2022',
    id: 3,
    status: Status.DONE,
  },
];

export default createStore({
  state(): State {
    return {
      tasks: initialState,
      mouseIsTracked: false,
      currentCard: null,
      id: 0,
    };
  },
  mutations: {
    addNewTask(state: State, payload: Task) {
      state.tasks.push(payload);
    },
    removeTask(state: State, index: number) {
      state.tasks.splice(index, 1);
    },
    filterTasksByNames(state: State, name: string) {
      state.tasks = state.tasks.filter((item) => item.name.includes(name));
    },
    changeTaskStatus(state: State, payload: {id: number; status: Status}) {
      state.tasks.map((item) => {
        if (item.id === payload.id) {
          item.status = payload.status;
        }
      });
    },
    changeTask(state: State, payload: Task) {
      state.tasks.map((item) => {
        if (item.id === payload.id) {
          item.name = payload.name;
          item.desc = payload.desc;
          item.status = payload.status;
          item.deadLine = payload.deadLine;
        }
      });
    },
    setCurrentCard(state: State, payload) {
      if (payload) {
        state.currentCard = payload.card;
        state.id = payload.id;
      } else {
        state.currentCard = null;
        state.id = 0;
      }
    },
    changeMouseTracking(state: State, payload: boolean) {
      state.mouseIsTracked = payload;
    },
  },
  actions: {},
  modules: {},
});
