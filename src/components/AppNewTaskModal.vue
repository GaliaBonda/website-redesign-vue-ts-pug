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
          input.record-form-element.record__btn(type="submit" id="btn" 
          value="Add task" v-on:click.prevent="addTask") 
          button.record__btn(v-on:click.prevent="closeModal") Close
      AppMessage(v-show="declineModalIsOpen" v-on:close-message-modal="closeDeclineModal" 
      title="Sorry, no can do" 
      text="No empty fields. Please, fill them all."
      v-bind:changesAllow="false")  
</template>

<script lang="ts">
import {computed, defineComponent, ref, WritableComputedRef} from 'vue';
import {useStore} from 'vuex';
import Status from '../interfaces/status.interface';
import AppMessage from './AppMessage.vue';

export default defineComponent({
  name: 'AppNewTaskModal',
  components: {
    AppMessage,
  },
  setup(props, context) {
    let form = ref({
      name: '',
      desc: '',
      date: new Date(),
      status: Status.TODO,
    });
    let declineModalIsOpen = ref(false);
    let formattedTaskDeadline: WritableComputedRef<string> = computed({
      get(): string {
        const day = form.value.date.getDate();
        const month = form.value.date.getMonth();
        const year = form.value.date?.getFullYear();
        return new Date(year, month, day).toLocaleDateString('pt-br').split('/').reverse().join('-');
      },
      set(newVal: string) {
        const day = Number.parseInt(newVal.slice(8));
        const month = Number.parseInt(newVal.slice(5, 7)) - 1;
        const year = Number.parseInt(newVal.slice(0, 4));
        const newDate: Date = new Date(year, month, day);
        form.value = {...form.value, date: newDate};
      },
    });
    const store = useStore();
    let stateTasks = computed(function () {
      return store.state.main.tasks;
    });
    const addTask = (e: Event) => {
      e.preventDefault();
      const formStatus = form.value.status;
      const formattedStatus = Status[formStatus as unknown as keyof typeof Status];

      if (form.value.name && form.value.desc && form.value.date) {
        store.dispatch('addTask', {
          name: form.value.name,
          desc: form.value.desc,
          deadLine: form.value.date,
          id: stateTasks.value.length + 10,
          status: formattedStatus || Status.TODO,
          openingDate: new Date(),
        });
        // store.commit('addNewTask', {
        //   name: form.value.name,
        //   desc: form.value.desc,
        //   deadLine: form.value.date,
        //   id: stateTasks.value.length + 1,
        //   status: formattedStatus || Status.TODO,
        //   openingDate: new Date(),
        // });
        form.value.name = '';
        form.value.desc = '';
        form.value.date = new Date();
        form.value.status = Status.TODO;
        closeModal();
      } else {
        declineModalIsOpen.value = true;
      }
    };
    const closeModal = () => {
      context.emit('close-modal');
    };
    const closeDeclineModal = () => {
      declineModalIsOpen.value = false;
    };
    return {
      form,
      declineModalIsOpen,
      formattedTaskDeadline,
      addTask,
      closeModal,
      closeDeclineModal,
    };
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
