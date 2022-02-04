<template lang="pug">
.content.main__content
  .main__container
    .content__container
      h2.content__date Tasks Calendar
      .calendar.main-calendar
        Calendar(v-bind:attributes="attributes" v-bind:rows="2")
          template(v-slot:day-content="{ day, attributes }")
            div(class="flex flex-col h-full z-10 overflow-hidden")
              span {{ day.day }}
              .flex-grow.overflow-y-auto.overflow-x-auto
                p.day-title(v-for="attr in attributes"
                v-bind:key="attr.key" v-on:click="openDetails(attr.key)") {{ attr.customData.title }}
                TaskDetailsModal(v-show="detailsModalIsOpen" 
                  v-on:close-details-modal="closeDetails" 
                  v-bind:name="name" v-bind:desc="desc" v-bind:deadLine="deadLine" 
                  v-bind:status="status" v-bind:id="id" v-bind:editAllow="false")
            
</template>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style lang="scss">
$day-border: #b8c2cc;
$day-border-highlight: #b8c2cc;
$day-width: 90px;
$day-height: 90px;
$weekday-bg: #f8fafc;
$weekday-border: #eaeaea;

.calendar {
  display: flex;
  justify-content: center;
}
.main-calendar .vc-day {
  padding: 0 5px 3px 5px;
  text-align: left;
  min-height: $day-height;
  min-width: $day-width;
  background-color: white;
  &.weekday-1,
  &.weekday-7 {
    background-color: #eff8ff;
  }
  &:not(.on-bottom) {
    border-bottom: 1px solid $day-border;
    &.weekday-1 {
      border-bottom: 1px solid $day-border-highlight;
    }
  }
  &:not(.on-right) {
    border-right: 1px solid $day-border;
  }
}
.day-title:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>

<script lang="ts">
import {defineComponent} from 'vue';
import {Calendar, DatePicker} from 'v-calendar';
import Task from '@/interfaces/task.interface';
import TaskDetailsModal from '../components/TaskDetailsModal.vue';

export default defineComponent({
  name: 'AppContentCalendar',
  data() {
    return {
      detailsModalIsOpen: false,
      name: '',
      status: '',
      desc: '',
      deadLine: '',
      id: 0,
    };
  },
  computed: {
    stateTasks(): Task[] {
      return this.$store.state.main.tasks;
    },
    attributes() {
      let attributes: unknown[] = [];
      this.stateTasks.forEach((item) => {
        const day = Number.parseInt(item.deadLine.slice(0, 2));
        const month = Number.parseInt(item.deadLine.slice(3, 5)) - 1;
        const year = Number.parseInt(item.deadLine.slice(6));
        const date = new Date(year, month, day);
        attributes.push({
          key: item.id,
          customData: {
            title: item.name,
          },
          dates: date,
        });
      });
      return attributes;
    },
  },
  components: {
    Calendar,
    DatePicker,
    TaskDetailsModal,
  },
  methods: {
    openDetails(key: number) {
      this.detailsModalIsOpen = true;
      let currentTask = this.stateTasks.find((item) => item.id === key);
      if (currentTask) {
        this.name = currentTask.name;
        this.status = currentTask.status;
        this.desc = currentTask.desc;
        this.deadLine = currentTask.deadLine;
        this.id = currentTask.id;
      }
    },
    closeDetails() {
      this.detailsModalIsOpen = false;
    },
  },
});
</script>
