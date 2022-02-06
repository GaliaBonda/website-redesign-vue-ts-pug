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
    p.record__date(v-if="!editModeIsOn") {{formatDate(taskDeadLine)}}
    input.record__date(type="date" v-else="editModeIsOn" v-model="formattedTaskDeadline")
    button.record__btn.details-btn(v-if="!editModeIsOn" v-on:click="openEditMode") Edit
    button.record__btn.details-btn(v-else="editModeIsOn" v-on:click="closeModal") Close
    button.record__btn.details-btn(v-show="editModeIsOn" v-on:click="saveChanges") Save  
</template>

<script lang="ts">
import {formatDate} from '@/mixins/formatDate';
import {defineComponent} from 'vue';
import Status from '../interfaces/status.interface';

export default defineComponent({
  name: 'TaskDetailsModal',
  data() {
    return {
      editModeIsOn: false,
      taskName: this.name,
      taskDesc: this.desc,
      taskStatus: this.status,
      taskDeadLine: this.deadLine,
      statuses: [Status.TODO, Status.INPROGRESS, Status.DONE],
    };
  },
  mixins: [formatDate],
  computed: {
    formattedTaskDeadline: {
      get() {
        const day = this.deadLine?.getDate();
        const month = this.deadLine?.getMonth();
        const year = this.deadLine?.getFullYear();
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
        this.taskDeadLine = date;
      },
    },
  },
  props: {
    name: String,
    desc: String,
    deadLine: Date,
    id: Number,
    status: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-details-modal');
      this.editModeIsOn = false;
    },
    openEditMode() {
      if (this.$store.state.mouseIsTracked) return;
      this.editModeIsOn = true;
    },
    saveChanges() {
      const updatedTask = {
        id: this.id,
        name: this.taskName,
        desc: this.taskDesc,
        status: Status[this.taskStatus?.toUpperCase() as unknown as keyof typeof Status],
        deadLine: this.taskDeadLine,
      };
      this.$store.commit('changeTask', updatedTask);
      this.closeModal();
    },
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
