import {ComponentCustomProperties} from 'vue';
import {Store} from 'vuex';

declare module '@vue/runtime-core' {
  interface State {
    tasks: Task[];
    mouseIsTracked: boolean;
    mouseCoordinates: [number, number];
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
