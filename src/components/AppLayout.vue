<template lang="pug">
.all-content
  TheSidebar
  section.main
    TheHeader
    AppContent
</template>

<style scoped lang="scss">
.all-content {
  display: flex;
  justify-content: center;
}

.main {
  width: 80%;
  min-height: 100vh;
  &__content {
    padding: 30px 220px 30px 220px;
  }
  &__container {
    max-width: 1170px;
    margin: 0 auto;
  }
}
</style>

<style lang="scss" src="../styles/scss/styles.scss"></style>
<style lang="scss" src="../styles/scss/media.scss"></style>

<script lang="ts">
import mitt from 'mitt';
import {defineComponent} from 'vue';
import TheSidebar from './TheSidebar.vue';
import TheHeader from './TheHeader.vue';
import AppContent from './AppContent.vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    emitter: ReturnType<typeof mitt>;
  }
}

export default defineComponent({
  name: 'AppLayout',
  components: {
    TheSidebar,
    TheHeader,
    AppContent,
  },
});
</script>

<style lang="scss">
.btnBlockStyles {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 70px;
}
.btnStyles {
  width: 70px;
  height: 40px;
  color: black;
  background-color: white;
  border: white;
  border-radius: 5px;
  font-size: 20px;
}
.confirmMessageStyles {
  padding: 30px 30px 50px 30px;
  font-size: 24px;
  color: white;
}
.confirmWindowStyles {
  position: fixed;
  top: 50vh;
  left: 50vw;
  width: 350px;
  height: 250px;
  transform: translate(-50%, -50%);
  background-color: black;
  border-radius: 5px;
}
</style>
