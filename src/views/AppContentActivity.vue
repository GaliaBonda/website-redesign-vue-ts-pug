<template lang="pug">
.content.main__content
  .main__container
    .content__container
      h2.content__date Today
      .content__records
        .record.content__record(v-for="item in records" v-bind:key="item.id")
          .record__info
            .record__text(v-bind:class="item.recordType") {{ item.recordText }}
            .record__date {{ item.recordDate }}
          .record__details(v-if="item.recordHasDetails")
            p.record__details-text {{ item.recordDetails }}
          .record__album(v-if="item.recordHasImg")
            img.record__album-img(v-for="(item, index) in images" 
            v-bind:key="item.id" 
            v-bind:src="require('../assets/' + item.img)" 
            v-on:click="getItemIndex(index)" alt="record-img")
</template>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useStore} from 'vuex';
// import mitt from 'mitt';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     emitter: ReturnType<typeof mitt>;
//   }
// }

export default defineComponent({
  name: 'AppContentActivity',
  setup() {
    const store = useStore();
    const stateActivity = computed(() => store.state.activity);
    let images = ref(stateActivity.value.images);
    let records = ref(stateActivity.value.records);
    const getItemIndex = (id: number) => {
      store.commit('changeCurrentImg', id);
    };
    return {
      images,
      records,
      getItemIndex,
    };
  },
});
</script>
