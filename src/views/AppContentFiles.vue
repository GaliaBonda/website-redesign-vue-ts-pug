<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Activity files
    .content__records.files
      ul.files__list
        li.files-list__item(v-for="item in stateImgs") {{item.name}}
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'AppContentFiles',
  setup() {
    const store = useStore();
    const stateImgs = computed(() => {
      return store.state.activity.images;
    });
    return {
      stateImgs,
    };
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
