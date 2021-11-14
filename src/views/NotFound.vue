<template lang="pug">
div
  h2.content__date Oops, page doesn't exist... Try: 
    router-link.content__link(to="/") Home
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NotFound',
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
.content__link {
  text-decoration: underline;
  font-weight: bold;
}
.content__link:hover {
  opacity: 0.5;
}
</style>
