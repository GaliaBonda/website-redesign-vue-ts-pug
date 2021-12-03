<template lang="pug">
.content.main__content
  .content__container
    h2.content__date Today tasks
    form.record-form
      h2.record-form__title Add new task
      .record-form__container
        .record-form__item
          label.record-form__name-label(for="name") New task name:
          input.record-form-element.record-form__name(type="text" id="name" v-model="form.name")
        .record-form__item
          label.record-form__desc-label(for="desc") New task description:
          textarea.record-form-element.record-form__desc(id="desc" rows="4" cols="50" v-model="form.desc" )
        .record-form__item
          label.record-form__date-label(for="date") New task deadline:
          input.record-form-element.record-form__date(type="date" id="date" v-model="form.date")
        .record-form__item
          input.record-form-element.record__btn(type="submit" id="btn" value="Add task" v-on:click="addTask")
    .content__records
      .record.content__record(v-for="(item, index) in tasks" v-bind:key="item.id")
        h3.record__title {{item.name}}
        .record__info
          p.record__text(v-bind:ref="setItemRef") {{item.desc}}
          p.record__date {{item.deadLine}}
        button.record__delete-btn.record__btn(v-on:click="deleteTask(index)") Delete task
</template>

<script lang="ts">
import {defineComponent, onBeforeUpdate, onMounted, onUpdated} from 'vue';
import Task from '../interfaces/task.interface';
import {createWindow, createButton, createBtnBlock, createBlocker} from '../scripts/createMessageWindow';

const tasks: Task[] = [
  {
    name: 'Design mockup',
    desc: "Create full rendering of design for client's web-product. Client K&H Science",
    deadLine: '12.11.2021',
    id: 1,
  },
  {
    name: 'Analysis of requirements and outcomes',
    desc: 'Evaluate the product design and development against project requirements and outcomes',
    deadLine: '14.12.2021',
    id: 2,
  },
  {
    name: 'Application Testing',
    desc: 'Identify errors in a website, provide unit, system and functional testing',
    deadLine: '21.11.2021',
    id: 3,
  },
];

export default defineComponent({
  name: 'AppContentTasks',
  data() {
    return {
      tasks: [
        {
          name: '',
          desc: '',
          deadLine: '',
          id: 0,
        },
      ],
      form: {
        name: '',
        desc: '',
        date: '',
      },
    };
  },
  setup() {
    let itemRefs: HTMLElement[] = [];
    let tasksNumber: number;
    const setItemRef = (el: HTMLElement) => {
      if (el) {
        itemRefs.push(el);
      }
    };
    const animateNewTask = () => {
      console.log('new item added');
      console.log(itemRefs[itemRefs.length - 1]);
      itemRefs[itemRefs.length - 1].classList.add('blink-animation');
    };
    onMounted(() => {
      tasksNumber = tasks.length;
      itemRefs.forEach((el, index) => {
        const delay = index * 1000;
        setTimeout(() => {
          el.classList.add('grow-animation');
        }, delay);
      });
    });
    onUpdated(() => {
      if (tasksNumber < tasks.length) animateNewTask();
      tasksNumber = tasks.length;
    });
    return {
      setItemRef,
    };
  },
  methods: {
    createWindow,
    createButton,
    createBtnBlock,
    createBlocker,
    addTask(e: Event) {
      e.preventDefault();
      const formattedDate = new Date(this.form.date).toLocaleDateString();
      if (this.form.name && this.form.desc && this.form.date) {
        this.tasks.push({
          name: this.form.name,
          desc: this.form.desc,
          deadLine: formattedDate,
          id: tasks.length + 1,
        });
        this.form.name = '';
        this.form.desc = '';
        this.form.date = '';
      } else {
        const blocker = this.createBlocker();
        const errorWindow = this.createWindow(
          'No empty fields. Please, fill them all.',
          'confirmWindowStyles',
          'confirmMessageStyles',
        );
        blocker.appendChild(errorWindow);
        const okBtn = this.createButton('Ok', 'btnStyles');
        const btnBlock = this.createBtnBlock('btnBlockStyles');
        btnBlock.appendChild(okBtn);
        errorWindow.appendChild(btnBlock);
        okBtn.onclick = function () {
          blocker.remove();
        };
      }
    },
    deleteTask(index: number) {
      this.tasks.splice(index, 1);
    },
  },
  created() {
    this.tasks = tasks;
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

@keyframes grow {
  0% {
  }
  50% {
    transform: scale(1.15, 1.15);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes blink {
  0% {
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.blink-animation {
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: 3;
}

.grow-animation {
  animation-name: grow;
  animation-duration: 2s;
}

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
