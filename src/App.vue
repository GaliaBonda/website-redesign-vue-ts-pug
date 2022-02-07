<template lang="pug">
AppLayout
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AppLayout from './components/AppLayout.vue';

export default defineComponent({
  components: {
    AppLayout,
  },
  beforeMount() {
    this.$store.commit('initialiseStore');
  },
});
</script>

<style src="./styles/css/normalize.css"></style>
<style src="./styles/css/reset.css"></style>
