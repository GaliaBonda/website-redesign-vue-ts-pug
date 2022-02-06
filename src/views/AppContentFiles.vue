<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Activity files
    .content__records.files
      ul.files__list
        li.files-list__item(v-for="item in stateImgs") {{item.name}}
</template>

<script lang="ts">
import Task from '@/interfaces/task.interface';
import {defineComponent} from 'vue';

export default defineComponent({
  computed: {
    stateImgs(): Task[] {
      return this.$store.state.activity.images;
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>

<style lang="scss">
@import '../styles/scss/styles.scss';

.files__list {
  list-style-type: none;
}
.files-list__item {
  padding: 10px;
  font-size: 18px;
  line-height: 20px;
  color: $sidebar-accent-color;
  opacity: 0.8;
  text-transform: capitalize;
}
</style>
