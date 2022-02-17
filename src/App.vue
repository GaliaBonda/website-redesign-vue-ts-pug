<template lang="pug">
AppLayout
</template>

<script lang="ts">
import {defineComponent, onBeforeMount} from 'vue';
import {useStore} from 'vuex';
import AppLayout from './components/AppLayout.vue';
import Status from './interfaces/status.interface';
import {addTask} from './service/taskApi';

export default defineComponent({
  components: {
    AppLayout,
  },
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch('loadTasks');
    });
  },
  // beforeMount() {
  //   // this.$store.commit('initialiseStore');
  //   this.$store.dispatch('loadTasks');
  // },
});
</script>

<style src="./styles/css/normalize.css"></style>
<style src="./styles/css/reset.css"></style>
