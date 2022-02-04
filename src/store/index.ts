import {createStore, Module, Mutation} from 'vuex';
import Task from '@/interfaces/task.interface';
import Status from '@/interfaces/status.interface';
import {State, StateModules} from 'vue';

const initialState: Task[] = [
  {
    name: 'Design mockup',
    desc: "Create full rendering of design for client's web-product. Client K&H Science",
    deadLine: '12.03.2022',
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
    deadLine: '06.02.2022',
    id: 3,
    status: Status.DONE,
  },
];

const mainModule: Module<any, unknown> = {
  state: () => ({
    tasks: initialState,
  }),
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
    initialiseStore(state) {
      const mainState = localStorage.getItem('main');
      if (mainState) {
        state = Object.assign(state, JSON.parse(mainState));
      }
    },
  },
  actions: {},
  getters: {},
};

const cardMovingModule: Module<any, unknown> = {
  state: () => ({
    mouseIsTracked: false,
    currentCard: null,
    id: 0,
  }),
  mutations: {
    setCurrentCard(state: State, payload: {card: HTMLElement; id: number}) {
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
  getters: {},
};

const activityModule: Module<any, unknown> = {
  state: () => ({
    images: [
      {
        img: 'record_img_1.png',
        id: 1,
      },
      {
        img: 'record_img_2.png',
        id: 2,
      },
      {
        img: 'record_img_3.png',
        id: 3,
      },
      {
        img: 'record_img_4.png',
        id: 4,
      },
    ],
    records: [
      {
        recordType: 'record__done',
        recordText: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        recordDate: '8:40 PM',
        recordHasDetails: false,
        recordDetails: '',
        recordHasImg: false,
        id: 11,
      },
      {
        recordType: 'record__comment',
        recordText: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        recordDate: '7:32 PM',
        recordHasDetails: true,
        recordDetails:
          'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
        recordHasImg: false,
        id: 22,
      },
      {
        recordType: 'record__upload',
        recordText: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
        recordDate: '6:02 PM',
        recordHasDetails: false,
        recordDetails: '',
        recordHasImg: true,
        id: 33,
      },
    ],
  }),
};

export default createStore<StateModules>({
  modules: {
    main: mainModule,
    moving: cardMovingModule,
    activity: activityModule,
  },
});

// export default createStore({
//   state(): State {
//     return {
//       tasks: initialState,
//       mouseIsTracked: false,
//       currentCard: null,
//       id: 0,
//     };
//   },
//   mutations: {
//     addNewTask(state: State, payload: Task) {
//       state.tasks.push(payload);
//     },
//     removeTask(state: State, index: number) {
//       state.tasks.splice(index, 1);
//     },
//     filterTasksByNames(state: State, name: string) {
//       state.tasks = state.tasks.filter((item) => item.name.includes(name));
//     },
//     changeTaskStatus(state: State, payload: {id: number; status: Status}) {
//       state.tasks.map((item) => {
//         if (item.id === payload.id) {
//           item.status = payload.status;
//         }
//       });
//     },
//     changeTask(state: State, payload: Task) {
//       state.tasks.map((item) => {
//         if (item.id === payload.id) {
//           item.name = payload.name;
//           item.desc = payload.desc;
//           item.status = payload.status;
//           item.deadLine = payload.deadLine;
//         }
//       });
//     },
//     setCurrentCard(state: State, payload) {
//       if (payload) {
//         state.currentCard = payload.card;
//         state.id = payload.id;
//       } else {
//         state.currentCard = null;
//         state.id = 0;
//       }
//     },
//     changeMouseTracking(state: State, payload: boolean) {
//       state.mouseIsTracked = payload;
//     },
//   },
//   actions: {},
//   modules: {},
// });
