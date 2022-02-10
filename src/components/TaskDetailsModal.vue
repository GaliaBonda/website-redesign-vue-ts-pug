<template lang="pug">
.modal-background
  .details-modal
    h3.record__title(v-if="!editModeIsOn") {{name}}
    input.record-title(type="text" v-else="editModeIsOn" v-model="taskName")
    p.record__text.details__text(v-if="!editModeIsOn") {{desc}}
    textarea.record__text.details__text(v-else="editModeIsOn" v-model="taskDesc")
    p.record__status(v-if="!editModeIsOn") {{status}}
    select(v-else="editModeIsOn" v-model="taskStatus")
      option(v-for="item in statuses") {{item}}
    p.record__date(v-if="!editModeIsOn") {{formattedTaskDeadline}}
    input.record__date(type="date" v-else="editModeIsOn" v-model="formattedTaskDeadline")
    .details-btns(v-show="editAllow")
      button.record__btn.details-btn(v-if="!editModeIsOn" v-on:click="openEditMode") Edit
      button.record__btn.details-btn(v-else="editModeIsOn" v-on:click="closeModal") Close
      button.record__btn.details-btn(v-show="editModeIsOn" v-on:click="saveChanges") Save
    button.record__btn.details-btn(v-show="!editAllow" v-on:click="closeModal") Close
</template>

<script lang="ts">
import {formatDate} from '@/mixins/formatDate';
import {computed, defineComponent, ref, WritableComputedRef} from 'vue';
import Status from '../interfaces/status.interface';
import useFormatDate from '@/composables/useFormatDate';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'TaskDetailsModal',
  props: {
    name: String,
    desc: String,
    deadLine: Date,
    id: Number,
    status: {
      type: String,
    },
    editAllow: Boolean,
  },
  setup(props, context) {
    const formatDate = useFormatDate(props.deadLine);
    let editModeIsOn = ref(false);
    let taskName = ref(props.name);
    let taskDesc = ref(props.desc);
    let taskStatus = ref(props.status);
    let taskDeadLine = ref(props.deadLine);
    let statuses = ref([Status.TODO, Status.INPROGRESS, Status.DONE]);
    let formattedTaskDeadline: WritableComputedRef<string> = computed({
      get(): string {
        if (!props.deadLine) return '';
        return props.deadLine.toLocaleDateString('pt-br').split('/').reverse().join('-');
      },
      set(newVal: string) {
        const day = Number.parseInt(newVal.slice(8));
        const month = Number.parseInt(newVal.slice(5, 7)) - 1;
        const year = Number.parseInt(newVal.slice(0, 4));
        const newDate: Date = new Date(year, month, day);
        taskDeadLine.value = newDate;
      },
    });

    const closeModal = () => {
      context.emit('close-details-modal');
      editModeIsOn.value = false;
    };

    const store = useStore();
    let stateMoving = computed(function () {
      return store.state.moving;
    });
    const openEditMode = () => {
      if (stateMoving.value.mouseIsTracked) return;
      editModeIsOn.value = true;
    };
    const saveChanges = () => {
      const updatedTask = {
        id: props.id,
        name: taskName.value,
        desc: taskDesc.value,
        status: Status[taskStatus.value?.toUpperCase() as unknown as keyof typeof Status],
        deadLine: taskDeadLine.value,
      };
      store.commit('changeTask', updatedTask);
      closeModal();
    };
    return {
      formatDate,
      editModeIsOn,
      taskName,
      taskDesc,
      taskStatus,
      taskDeadLine,
      statuses,
      formattedTaskDeadline,
      closeModal,
      openEditMode,
      saveChanges,
    };
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.details-modal {
  padding: 10px;
  min-width: 200px;
  min-height: 200px;
  background-color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
}
.details__text {
  padding: 0;
  margin: 0;
}
.details-btn {
  width: 100px;
}
</style>
