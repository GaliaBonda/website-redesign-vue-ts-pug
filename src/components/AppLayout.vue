<template lang="pug">
.all-content
  TheSidebar(v-if="sidebarIsOpen")
  button.sidebar-btn(v-else="!sidebarIsOpen" v-on:click="openSidebar") &#9660;
  section.main
    TheHeader
    router-view
</template>

<style scoped lang="scss">
@import '../styles/scss/styles';
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

.sidebar-btn {
  background-color: $sidebar-bg-color;
  color: $sidebar-font-color;
  padding: 10px;
}
</style>

<style lang="scss" src="../styles/scss/styles.scss"></style>
<style scoped lang="scss" src="../styles/scss/media.scss"></style>
<style lang="scss" src="../styles/scss/media.scss"></style>

<script lang="ts">
import mitt from 'mitt';
import {defineComponent} from 'vue';
import TheSidebar from './TheSidebar.vue';
import TheHeader from './TheHeader.vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    emitter: ReturnType<typeof mitt>;
  }
}

export default defineComponent({
  name: 'AppLayout',
  data() {
    return {
      sidebarIsOpen: true,
    };
  },
  components: {
    TheSidebar,
    TheHeader,
  },
  // watch: {
  //   screenSize(newSize: number, oldSize: number) {
  //     console.log(newSize);

  //     if (newSize <= 768) {
  //       this.sidebarIsOpen = false;
  //     } else {
  //       this.sidebarIsOpen = true;
  //     }
  //   },
  // },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      if (window.innerWidth <= 768) {
        this.sidebarIsOpen = false;
      } else {
        this.sidebarIsOpen = true;
      }
    },
    openSidebar() {
      this.sidebarIsOpen = true;
    },
  },
});
</script>
