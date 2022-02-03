import {ComponentCustomProperties} from 'vue';
import {Module, ModuleTree, Store} from 'vuex';

declare module '@vue/runtime-core' {
  interface State {
    tasks: Task[];
    mouseIsTracked: boolean;
    currentCard: HTMLElement | null;
    id: number;
  }

  interface StateModules {
    main: State;
    moving: State;
  }

  interface ComponentCustomProperties {
    // $store: Store<State>;
    $store: Store<StateModules>;
  }
}
