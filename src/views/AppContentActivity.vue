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
      images: [
        {
          img: 'record_img_1.png',
          id: 1,
        },
        {
          img: 'record_img_2.png',
          id: 2,
        },
        {
          img: 'record_img_3.png',
          id: 3,
        },
        {
          img: 'record_img_4.png',
          id: 4,
        },
      ],
      records: [
        {
          recordType: 'record__done',
          recordText: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
          recordDate: '8:40 PM',
          recordHasDetails: false,
          recordDetails: '',
          recordHasImg: false,
          id: 11,
        },
        {
          recordType: 'record__comment',
          recordText: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          recordDate: '7:32 PM',
          recordHasDetails: true,
          recordDetails:
            'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
          recordHasImg: false,
          id: 22,
        },
        {
          recordType: 'record__upload',
          recordText: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
          recordDate: '6:02 PM',
          recordHasDetails: false,
          recordDetails: '',
          recordHasImg: true,
          id: 33,
        },
      ],
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
