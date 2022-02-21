import {ComponentCustomProperties} from 'vue';
import {Module, ModuleTree, Store} from 'vuex';
import Activity from './interfaces/activity.interface';

declare module '@vue/runtime-core' {
  interface State {
    tasks: Task[];
    mouseIsTracked: boolean;
    currentCard: HTMLElement | null;
    id: number;
    images: Img[];
    records: Activity[];
    currentImgId: number;
  }

  interface StateModules {
    main: State;
    moving: State;
    activity: State;
  }

  interface ComponentCustomProperties {
    // $store: Store<State>;
    $store: Store<StateModules>;
  }
}
