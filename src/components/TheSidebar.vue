<template lang="pug">
section.sidebar
    header.sidebar-header
      .sidebar-header__top
        .sidebar__container
          h2.sidebar-header__text PROJECTUS

    .person-info.sidebar__person-info
      .sidebar__container
        .person-info__main
          img.person-info__photo(v-bind:src="require('../assets/' + avatar)" alt="Person photo")
          .person-info__titles
            h3.person-info__title {{ userName }}
            h4.person-info__subtitle {{ status }}
          a.person-info__more(href="#") ...
    
    .sidebar__tasks
      .sidebar__container
        ul.tasks
          li.tasks__item(id="completed_tasks" 
          v-on:click="openMessageModal" 
          v-on:mouseover="makeTasksActive" 
          v-on:mouseleave="makeTasksNonActive")
            span.tasks__item-num {{ completedTasks }}
            span.tasks__item-text Completed Tasks
          AppMessage(v-show="modalIsOpen" v-on:close-message-modal="closeMessageModal" 
          v-on:change-data="changeTaskCounter"
          title="Change tasks counter" 
          v-bind:text="messageText"
          v-bind:changesAllow="openTasksAvailable")
          li.tasks__item(id="open_tasks" v-on:click="goToTasks"  
          v-on:mouseover="makeTasksActive" v-on:mouseleave="makeTasksNonActive")
            span.tasks__item-num {{ openTasks }}
            span.tasks__item-text Open Tasks
          AppMessage(v-show="declineModalIsOpen" v-on:close-message-modal="closeDeclineModal" 
          title="Sorry, no can do" 
          text="There are no open tasks to show."
          v-bind:changesAllow="false")

    .sidebar__navigation
      .sidebar__container
      nav.nav-container
        ul.sidebar-nav
          li.sidebar-nav__item
            a.sidebar-nav__link.sidebar-nav__link--active(href="#" v-on:click="makeActive") Menu
          li.sidebar-nav__item
            a.sidebar-nav__link(href="#" v-on:click="makeActive") Home
          li.sidebar-nav__item
            a.sidebar-nav__link(href="#" v-on:click="makeActive") My Tasks
          li.sidebar-nav__item.sidebar-nav__item--notifications(id="notifications" 
          v-bind:data-after="notifications")
            a.sidebar-nav__link(href="#" v-on:click="makeActive") Notifications
</template>

<style scoped lang="scss">
@import '../styles/scss/styles';

.sidebar {
  width: 20%;
  min-height: 100vh;
  background-color: $sidebar-bg-color;
  color: $sidebar-font-color;
  &__person-info {
    padding: 16px 7% 15px 10%;
  }
  &__tasks,
  &__navigation {
    padding: 20px 11% 30px 10%;
  }
  &__container {
    max-width: 270px;
    margin: 0 auto;
  }
}

.sidebar-header {
  &__top {
    padding: 30px 7% 30px 10%;
  }
  &__text {
    text-transform: uppercase;
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 4.8%;
    line-height: 24px;
  }
  &__text::before {
    content: url('../assets/Logo@3x.svg');
  }
  &__text::after {
    content: url('../assets/Search@3x.svg');
    margin-left: 25%;
  }
}

.person-info {
  background-color: $sidebar-accent-color;
  &__main {
    display: flex;
    flex-wrap: wrap;
    gap: 4.8%;
  }
  &__photo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  &__titles {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  &__title {
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 2px;
  }
  &__subtitle {
    font-size: 12px;
    color: $sidebar-font-subtext-color;
    line-height: 14px;
  }
  &__more {
    width: 16px;
    color: $more-font;
    font-size: 20px;
    font-weight: bold;
    margin-left: 12%;
  }
}

.tasks {
  list-style-type: none;
  display: flex;
  column-gap: 20px;
  &__item {
    font-size: 12px;
    line-height: 18px;
  }
  &__item-text {
    opacity: 0.5;
  }
  &__item-num {
    font-size: 20px;
    display: block;
  }
}

.sidebar-nav {
  &__item {
    font-size: 14px;
    line-height: 22px;
    padding-bottom: 16px;
  }
  &__link--active {
    color: $active-font;
    text-transform: uppercase;
  }
  &__item--notifications::after {
    content: attr(data-after);
    width: 20px;
    height: 20px;
    background-color: $notifications-bg;
    border-radius: 50%;
    padding: 2px 6px;
    color: $font-color;
    margin-left: 9px;
  }
}
</style>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import AppMessage from './AppMessage.vue';
import useElementActivator from '@/composables/useElementActivator';

export default defineComponent({
  name: 'TheSidebar',
  components: {
    AppMessage,
  },
  setup() {
    let userName = ref('Jean Gonzales');
    let status = ref('Product Owner');
    let avatar = ref('person.png');
    let completedTasks = ref(372);
    let openTasks = ref(11);

    const store = useStore();
    const currentImgId = computed(() => store.state.activity.currentImgId);

    let notifications = ref(currentImgId);
    let modalIsOpen = ref(false);
    let declineModalIsOpen = ref(false);

    const openTasksAvailable = computed((): boolean => {
      return openTasks.value > 0;
    });
    const messageText = computed((): string => {
      return openTasksAvailable.value
        ? 'Are you sure you want to change the number of tasks?'
        : 'You have no open tasks to set complete.';
    });

    const changeTaskCounter = () => {
      completedTasks.value = completedTasks.value + 1;
      openTasks.value = openTasks.value - 1;
      modalIsOpen.value = false;
    };
    const closeMessageModal = () => {
      modalIsOpen.value = false;
    };
    const openMessageModal = () => {
      modalIsOpen.value = true;
    };
    const makeTasksActive = (e: Event): void => {
      const currentElement = e.target as HTMLElement;
      if (currentElement.id === 'completed_tasks' || currentElement.id === 'open_tasks') {
        currentElement.style.cursor = 'pointer';
        currentElement.style.outline = '3px solid rgba(191, 191, 191, 0.2)';
        currentElement.style.outlineOffset = '4px';
      }
    };
    const makeTasksNonActive = (e: Event): void => {
      (e.target as HTMLElement).style.outline = 'none';
    };
    const router = useRouter();
    const goToTasks = (): void => {
      if (openTasks.value > 0) {
        router.push('/tasks');
      } else {
        declineModalIsOpen.value = true;
      }
    };
    const closeDeclineModal = () => {
      declineModalIsOpen.value = false;
    };
    const makeActive = useElementActivator();

    return {
      userName,
      status,
      avatar,
      completedTasks,
      openTasks,
      notifications,
      modalIsOpen,
      declineModalIsOpen,
      openTasksAvailable,
      messageText,
      changeTaskCounter,
      closeMessageModal,
      openMessageModal,
      makeTasksActive,
      makeTasksNonActive,
      goToTasks,
      closeDeclineModal,
      makeActive,
    };
  },
});
</script>
