<template lang="pug">
header.header
      .main__container
        .header__top
          router-link(to="/")
            .title
              h1.title__text Website Redesign
              a.title__more(href="#") ...
          .socials
            .socials__photos
              img.socials__photo(v-for="item in socialImages" v-bind:key="item.id" v-bind:src="require('../assets/' + item.img)" alt="socials photo")
            a.socials__share(href="#") Share
            a.socials__chat(href="#") Chat

        nav.header__nav
          ul.nav(id="nav")
            li.nav__item
              router-link(to="/tasks")
                a.nav__link(href="#") Tasks
            li.nav__item
              router-link(to="/kanban")
                a.nav__link(href="#") Kanban
            li.nav__item
              router-link(to="/activity")
                a.nav__link(href="#") Activity
            li.nav__item
              router-link(to="/calendar")
                a.nav__link(href="#") Calendar
            li.nav__item
              router-link(to="/files")
                a.nav__link(href="#") Files
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import makeActive from '../scripts/makeActive';

export default defineComponent({
  name: 'TheHeader',
  data(): Record<string, unknown> {
    return {
      socialImages: [
        {
          img: 'socials_1.png',
          id: 1,
        },
        {
          img: 'socials_2.png',
          id: 2,
        },
        {
          img: 'socials_3.png',
          id: 3,
        },
      ],
    };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/scss/styles';

.header {
  &__top {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    justify-content: space-between;
    padding: 40px 30px 20px 30px;
  }
  &__nav {
    padding-left: 30px;
    padding-bottom: 15px;
  }
}

.nav {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  &__item {
    position: relative;
  }
}

.router-link-active::after {
  content: '';
  width: 100%;
  background-color: $notifications-bg;
  height: 2px;
  position: absolute;
  left: 0px;
  bottom: -15px;
}

.title {
  display: flex;
  align-items: center;
  &__text {
    margin-right: 10px;
    font-size: 32px;
  }
  &__text::before {
    content: '';
    display: inline-block;
    margin-right: 15px;
    width: 40px;
    height: 40px;
    background-color: $pic-bg;
    background-image: url('../assets/Shapes@2x.png');
    background-size: 40px 40px;
    border-radius: 8px;
    vertical-align: middle;
  }
  &__more {
    color: $more-font;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    background-color: $more-bg;
    border-radius: 50% 50%;
    display: block;
    height: 30px;
    width: 30px;
  }
}

.socials {
  display: flex;
  align-items: center;
  column-gap: 25px;
  &__photo {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  &__share {
    background-color: $share-bg;
    padding: 6px 15px;
    border-radius: 15px;
  }
  &__chat {
    padding: 6px 15px;
    background-color: $chat-bg;
    border-radius: 15px;
    color: $pic-bg;
  }
  &__chat::before {
    content: url(../assets/Combined_Shape@1x.svg);
    margin-right: 5px;
  }
}
</style>
