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
            img.record__album-img(v-for="item in images" v-bind:key="item.id" v-bind:src="require('../assets/' + item.img)" v-on:click="getItemIndex(item.id)" alt="record-img")
</template>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>

<script lang="ts">
import {defineComponent} from 'vue';
import mitt from 'mitt';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    emitter: ReturnType<typeof mitt>;
  }
}

export default defineComponent({
  name: 'AppContentActivity',
  data() {
    return {
      images: this.$store.state.activity.images,
      records: this.$store.state.activity.records,
    };
  },
  methods: {
    getItemIndex(id: number) {
      const index = this.images.findIndex((i) => i.id === id);
      this.emitter.emit('getIndex', index);
    },
  },
});
</script>
