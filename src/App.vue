<template lang="pug">
.all-content
  section.sidebar
    header.sidebar-header
      .sidebar-header__top
        .sidebar__container
          h2.sidebar-header__text PROJECTUS

    .person-info.sidebar__person-info
      .sidebar__container
        .person-info__main
          img.person-info__photo(v-bind:src="require('./assets/' + avatar)" alt="Person photo")
          .person-info__titles
            h3.person-info__title {{ userName }}
            h4.person-info__subtitle {{ status }}
          a.person-info__more(href="#") ...
    
    .sidebar__tasks
      .sidebar__container
        ul.tasks
          li.tasks__item(id="completed_tasks" v-on:click="changeTasksCounter" v-on:mouseover="makeTasksActive" v-on:mouseleave="makeTasksNonActive")
            span.tasks__item-num {{ completedTasks }}
            span.tasks__item-text Completed Tasks
          li.tasks__item(id="open_tasks")
            span.tasks__item-num {{ openTasks }}
            span.tasks__item-text Open Tasks

    .sidebar__navigation
      .sidebar__container
      nav.nav-container
        ul.sidebar-nav
          li.sidebar-nav__item
            a.sidebar-nav__link.sidebar-nav__link--active(href="#" class="" v-on:click="makeActive") Menu
          li.sidebar-nav__item
            a.sidebar-nav__link(href="#" v-on:click="makeActive") Home
          li.sidebar-nav__item
            a.sidebar-nav__link(href="#" v-on:click="makeActive") My Tasks
          li.sidebar-nav__item.sidebar-nav__item--notifications(id="notifications" v-bind:data-after="notifications")
            a.sidebar-nav__link(href="#" v-on:click="makeActive") Notifications

  section.main
    header.header
      .main__container
        .header__top
          .title
            h1.title__text Website Redesign
            a.title__more(href="#") ...
          .socials
            .socials__photos
              img.socials__photo(v-for="item in socialImages" v-bind:key="item.id" v-bind:src="require('./assets/' + item.img)" alt="socials photo")
            a.socials__share(href="#") Share
            a.socials__chat(href="#") Chat

        nav.header__nav
          ul.nav(id="nav")
            li.nav__item
              router-link(to="/tasks")
                a.nav__link(href="#" v-on:click="makeActive") Tasks
            li.nav__item
                a.nav__link(href="#" v-on:click="makeActive") Kanban
            li.nav__item
              router-link(to="/")
                a.nav__link.nav__link--active(href="#" v-on:click="makeActive") Activity
            li.nav__item
                a.nav__link(href="#" v-on:click="makeActive") Calendar
            li.nav__item
                a.nav__link(href="#" v-on:click="makeActive") Files
        router-view
</template>

<style lang="scss">
#app {
  font-family: Helvetica, sans-serif;
  color: #131313;
}
</style>

<style lang="scss" src="./styles/scss/styles.scss"></style>
<style lang="scss" src="./styles/scss/media.scss"></style>
<style src="./styles/css/normalize.css"></style>
<style src="./styles/css/reset.css"></style>

<script lang="ts">
import mitt from 'mitt';
import {defineComponent} from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    emitter: ReturnType<typeof mitt>;
  }
}

export default defineComponent({
  data(): Record<string, unknown> {
    return {
      userName: 'Jean Gonzales',
      status: 'Product Owner',
      avatar: 'person.png',
      completedTasks: 372,
      openTasks: 11,
      notifications: 3,
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

  methods: {
    makeActive(e: Event): void {
      const currentElement = e.target as HTMLElement;
      const selectorName = currentElement.className;
      const selectorNameActive = `${selectorName}--active`;
      const currentActive: HTMLElement | null = document.querySelector(`.${selectorNameActive}`);
      if (currentActive) {
        currentActive.classList.remove(selectorNameActive);
        currentElement.classList.add(selectorNameActive);
      }
    },
    makeTasksActive(e: Event): void {
      const currentElement = e.target as HTMLElement;
      if (currentElement.id === 'completed_tasks') {
        currentElement.style.cursor = 'pointer';
        currentElement.style.outline = '3px solid rgba(191, 191, 191, 0.2)';
        currentElement.style.outlineOffset = '4px';
      }
    },
    makeTasksNonActive(e: Event): void {
      (e.target as HTMLElement).style.outline = 'none';
    },
    changeTasksCounter(): void {
      if ((this.openTasks as number) > 0) {
        this.confirmChange();
      } else {
        const declineWindow = this.createWindow("You don't have any open tasks to set complete.");
        const okBtn = this.createButton('Ok');
        const btnBlock = this.createBtnBlock();
        btnBlock.appendChild(okBtn);
        declineWindow.appendChild(btnBlock);
        okBtn.onclick = function () {
          declineWindow.remove();
        };
      }
    },
    confirmChange(): void {
      const confirmWindow = this.createWindow('Are you sure you want to change the number of tasks?');
      const btnBlock = this.createBtnBlock();
      const yesBtn = this.createButton('Yep');
      const noBtn = this.createButton('Nope');
      btnBlock.appendChild(yesBtn);
      btnBlock.appendChild(noBtn);

      confirmWindow.appendChild(btnBlock);
      yesBtn.onclick = () => {
        this.completedTasks = (this.completedTasks as number) + 1;
        this.openTasks = (this.openTasks as number) - 1;
        confirmWindow.remove();
      };
      noBtn.onclick = () => confirmWindow.remove();
    },
    createWindow(message: string): HTMLDivElement {
      const confirmWindow = document.createElement('div');
      confirmWindow.classList.add('confirmWindowStyles');
      document.body.style.position = 'relative';
      const confirmMessage = this.createConfirmMessage(message);
      confirmWindow.appendChild(confirmMessage);
      document.body.appendChild(confirmWindow);
      return confirmWindow;
    },
    createConfirmMessage(message: string): HTMLParagraphElement {
      const confirmMessage = document.createElement('p');
      confirmMessage.classList.add('confirmMessageStyles');
      confirmMessage.innerText = message;
      return confirmMessage;
    },
    createButton(btnName: string): HTMLButtonElement {
      const btn = document.createElement('button');
      btn.innerHTML = btnName;
      btn.classList.add('btnStyles');
      return btn;
    },
    createBtnBlock(): HTMLDivElement {
      const btnBlock = document.createElement('div');
      btnBlock.classList.add('btnBlockStyles');
      return btnBlock;
    },
  },
  mounted() {
    this.emitter.on('getIndex', (index) => {
      this.notifications = index as number;
    });
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
