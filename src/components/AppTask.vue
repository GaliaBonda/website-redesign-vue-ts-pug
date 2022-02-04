<template lang="pug">
.task(v-bind:class="[taskClass, {expired: isExpired}, {attention: isUnderAttention}]" v-on:mousedown.stop.prevent="startMoving"  v-on:mouseup.stop.prevent="stopCardMoving" v-on:ondragstart.stop.prevent)
  .task-name {{name}}
  .task-deadline {{formattedDate}}
  button.task-details-btn.record__btn(v-on:click="showDetails") Details...
TaskDetailsModal(v-show="detailsModalIsOpen" 
v-on:close-details-modal="closeDetails" 
v-bind:name="name" 
v-bind:desc="desc" v-bind:deadLine="deadLine" 
v-bind:status="status" v-bind:id="id"
v-bind:editAllow="true")
</template>

<script lang="ts">
import Status from '@/interfaces/status.interface';
import {defineComponent} from 'vue';
import TaskDetailsModal from './TaskDetailsModal.vue';

export default defineComponent({
  name: 'AppTask',
  components: {
    TaskDetailsModal,
  },
  data() {
    return {
      detailsModalIsOpen: false,
    };
  },
  props: {
    name: String,
    desc: String,
    deadLine: String,
    id: Number,
    status: {
      type: String,
    },
    toDoEdge: Number,
    inProgressEdge: Number,
  },
  computed: {
    taskClass() {
      let taskStyle = '';
      switch (this.status) {
        case Status.TODO:
          taskStyle = 'todo';
          break;
        case Status.INPROGRESS:
          taskStyle = 'inprogress';
          break;
        case Status.DONE:
          taskStyle = 'done';
          break;
      }
      return taskStyle;
    },
    date() {
      if (!this.deadLine) return this.deadLine;
      const day = Number.parseInt(this.deadLine.slice(0, 2));
      const month = Number.parseInt(this.deadLine.slice(3, 5)) - 1;
      const year = Number.parseInt(this.deadLine.slice(6));
      const date = new Date(year, month, day);
      return date;
    },
    formattedDate() {
      let options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      };
      return this.date?.toLocaleString('en', options);
    },
    isExpired() {
      if (!this.date) return false;
      const todayDate = new Date();
      const difference = +this.date - +todayDate;
      if (difference < 0) return true;
      return false;
    },
    isUnderAttention() {
      const oneDayInMs = 86400000;
      if (!this.date) return false;
      const todayDate = new Date();
      const diff = +this.date - +todayDate;
      if (diff >= 0 && Math.abs(diff) <= oneDayInMs) return true;
      return false;
    },
  },
  methods: {
    startMoving(event: MouseEvent) {
      if (this.$store.state.moving.mouseIsTracked) return;
      this.$store.commit('changeMouseTracking', true);
      const currentCard = event.currentTarget as HTMLElement;
      currentCard.style.position = 'absolute';
      currentCard.style.zIndex = '1000';
      this.$store.commit('setCurrentCard', {
        card: currentCard,
        id: this.id,
      });
    },

    stopCardMoving(event: MouseEvent) {
      if (this.toDoEdge && this.inProgressEdge) this.relocateCard(event.clientX, this.toDoEdge, this.inProgressEdge);
      this.$store.commit('changeMouseTracking', false);
      const currentCard = this.$store.state.moving.currentCard;
      if (currentCard) {
        currentCard.style.zIndex = '1';
        this.$store.commit('setCurrentCard', null);
      }
    },
    relocateCard(x: number, todoEdge: number, inProgressEdge: number) {
      const currentStatus = this.$store.state.main.tasks.find((item) => item.id === this.$store.state.moving.id).status;
      if (x > todoEdge && x < inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.moving.id, status: Status.INPROGRESS});
      } else if (x > inProgressEdge) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.moving.id, status: Status.DONE});
      } else if (x < todoEdge && currentStatus !== Status.DONE) {
        this.$store.commit('changeTaskStatus', {id: this.$store.state.moving.id, status: Status.TODO});
      }
    },
    showDetails() {
      this.detailsModalIsOpen = true;
    },
    closeDetails() {
      this.detailsModalIsOpen = false;
    },
  },
});
</script>

<style scoped lang="scss" src="../styles/scss/content.scss"></style>
<style scoped lang="scss">
@import '../styles/scss/styles.scss';

.task {
  background-color: $bg-color;
  padding: 5px;
  width: calc(max(13vw, 150px));
  display: flex;
  flex-direction: column;
  gap: 10px;
  outline: 2px solid $active-font;
  &-name {
    opacity: 0.7;
    font-size: 14px;
    margin-bottom: 7px;
  }
  &-deadline {
    font-weight: bold;
    opacity: 0.7;
  }
  &-details-btn {
    width: 100px;
    border-color: $active-font;
  }
}

.todo {
  background-color: $todo-bg;
}
.inprogress {
  background-color: $inprogress-bg;
}
.done {
  background-color: $done-bg;
}
.expired {
  box-shadow: 0px 0px 15px 2px $expired-shadow;
}
.attention {
  box-shadow: 0px 0px 15px 2px $attention-shadow;
}
</style>
