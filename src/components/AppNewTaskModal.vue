<template lang="pug">
.modal-background
  form.record-form
    h2.record-form__title Add new task
    .record-form__container
      .record-form__item
          label.record-form__name-label(for="name") New task name:
          input.record-form-element.record-form__name(type="text" id="name" v-model="form.name")
      .record-form__item
          label.record-form__desc-label(for="desc") New task description: 
          textarea.record-form-element.record-form__desc(id="desc" rows="4" cols="50" v-model="form.desc")
      .record-form__item
          label.record-form__date-label(for="date") New task deadline:
          input.record-form-element.record-form__date(type="date" id="date" v-model="formattedTaskDeadline")
      .record-form__item.record-form__status-item
          label.record-form__status-label(for="status-todo") TODO
            input.record-form-element.record-form__status(type="radio" id="status-todo" v-model="form.status" name="status" value='TODO')
          label.record-form__status-label(for="status-inprogress") INPROGRESS
            input.record-form-element.record-form__status(type="radio" id="status-inprogress" v-model="form.status" name="status" value='INPROGRESS')
          label.record-form__status-label(for="status-done") DONE
            input.record-form-element.record-form__status(type="radio" id="status-done" v-model="form.status" name="status" value='DONE')
      .record-form__item
          input.record-form-element.record__btn(type="submit" id="btn" value="Add task" v-on:click.prevent="addTask") 
          button.record__btn(v-on:click.prevent="closeModal") Close   
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Status from '../interfaces/status.interface';
import {createMessage} from '../mixins/createMessage';

export default defineComponent({
  name: 'AppNewTaskModal',
  mixins: [createMessage],
  data() {
    return {
      form: {
        name: '',
        desc: '',
        date: new Date(),
        status: Status.TODO,
      },
    };
  },
  computed: {
    formattedTaskDeadline: {
      get() {
        const day = this.form.date?.getDate();
        const month = this.form.date?.getMonth();
        const year = this.form.date?.getFullYear();
        if (day && month && year) {
          return new Date(year, month, day).toLocaleDateString('pt-br').split('/').reverse().join('-');
        }
        return this.deadLine;
      },
      set(newVal: string) {
        const day = Number.parseInt(newVal.slice(8));
        const month = Number.parseInt(newVal.slice(5, 7)) - 1;
        const year = Number.parseInt(newVal.slice(0, 4));
        const date: Date = new Date(year, month, day);
        this.form.date = date;
      },
    },
  },
  methods: {
    addTask(e: Event) {
      e.preventDefault();
      // const formattedDate = new Date(this.form.date).toLocaleDateString();
      const formStatus = this.form.status;
      const formattedStatus = Status[formStatus as unknown as keyof typeof Status];
      if (this.form.name && this.form.desc && this.form.date) {
        this.$store.commit('addNewTask', {
          name: this.form.name,
          desc: this.form.desc,
          deadLine: this.form.date,
          id: this.$store.state.main.tasks.length + 1,
          status: formattedStatus || Status.TODO,
        });
        this.form.name = '';
        this.form.desc = '';
        // this.form.date = '';
        this.form.date = new Date();
        this.form.status = Status.TODO;
        this.closeModal();
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
    closeModal() {
      this.$emit('close-modal');
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.record-form {
  padding: 20px 30px 30px 30px;
  margin: 20px;
  border-top: 5px solid $bg-color;
  border-bottom: 5px solid $bg-color;
  background-color: white;
  width: 700px;
  z-index: 100;
  &__status-item {
    gap: 15px;
  }
  &__status-label {
    display: flex;
    gap: 15px;
  }
  &__desc {
    width: 300px;
  }
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
</style>
