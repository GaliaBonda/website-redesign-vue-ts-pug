<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Today tasks
    form.record-form
      h2.record-form__title Add new task
      .record-form__container
        .record-form__item
          label.record-form__name-label(for="name") New task name:
          input.record-form-element.record-form__name(type="text" id="name")
        .record-form__item
          label.record-form__desc-label(for="desc") New task description:
          textarea.record-form-element.record-form__desc(id="desc" rows="4" cols="50")
        .record-form__item
          label.record-form__date-label(for="date") New task deadline:
          input.record-form-element.record-form__date(type="date" id="date")
        .record-form__item
          input.record-form-element.record__btn(type="submit" id="btn" value="Add task" v-on:click="addTask")
    .content__records
      .record.content__record(v-for="item in tasks" v-bind:key="item.id")
        h3.record__title {{item.name}}
        .record__info
          p.record__text {{item.desc}}
          p.record__date {{item.deadLine}}
        button.record__delete-btn.record__btn(v-on:click="deleteTask" v-bind:data-id="item.id") Delete task
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Task from '../interfaces/task.interface';

const tasks: Task[] = [
  {
    name: 'Design mockup',
    desc: "Create full rendering of design for client's web-product. Client K&H Science",
    deadLine: '12.11.2021',
    id: 111,
  },
  {
    name: 'Analysis of requirements and outcomes',
    desc: 'Evaluate the product design and development against project requirements and outcomes',
    deadLine: '14.12.2021',
    id: 112,
  },
  {
    name: 'Application Testing',
    desc: 'Identify errors in a website, provide unit, system and functional testing',
    deadLine: '21.11.2021',
    id: 113,
  },
];

export default defineComponent({
  name: 'AppContentTasks',
  data() {
    return {
      tasks: tasks,
    };
  },
  methods: {
    addTask(e: Event) {
      e.preventDefault();
      const recordName = document.getElementById('name') as HTMLInputElement;
      const recordDesc = document.getElementById('desc') as HTMLTextAreaElement;
      const recordDate = document.getElementById('date') as HTMLInputElement;
      const date = new Date(recordDate.value).toLocaleDateString();
      if (recordName.value && recordDesc.value && recordDate.value) {
        this.tasks.push({
          name: recordName.value,
          desc: recordDesc.value,
          deadLine: date,
          id: tasks[tasks.length - 1].id + 1,
        });
        recordName.value = '';
        recordDesc.value = '';
        recordDate.value = '';
      }
    },
    deleteTask(e: Event) {
      const recordId = Number((e.target as HTMLElement).getAttribute('data-id'));
      this.tasks = this.tasks.filter((item) => item.id !== recordId);
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.record__title {
  padding: 10px;
  opacity: 0.5;
  font-size: 12px;
  text-transform: uppercase;
}
.record-form {
  padding: 20px 30px 30px 30px;
  border-top: 5px solid $bg-color;
  border-bottom: 5px solid $bg-color;
}
.record-form__title {
  padding: 10px 0;
  opacity: 0.5;
  font-size: 12px;
  text-transform: uppercase;
}
.record-form__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
}
.record-form__item {
  display: flex;
  justify-content: space-between;
}
.record-form-element {
  padding: 5px;
  font-family: Helvetica, sans-serif;
  border-radius: 3px;
  border: 2px solid $share-bg;
}
.record__btn {
  background-color: $bg-color;
  border-radius: 3px;
  border: 2px solid $share-bg;
  padding: 5px;
}

.record__btn:hover {
  border: 2px solid $bg-color;
  color: $more-font;
  cursor: pointer;
}
.record__delete-btn {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
