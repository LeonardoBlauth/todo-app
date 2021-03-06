<template>
  <div class="container mt-5 tasksProgress" v-show="progress != 0">
    <span class="progressValue">{{ progress }}%</span>

    <div class="progressBar" :class="changeColor" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    changeColor() {
      if (this.progress >= 80) {
        return 'progressDone'
      } else {
        return 'progressBar'
      }
    }
  }
};
</script>

<style>
.tasksProgress {
  position: relative;

  width: 80%;
  margin-bottom: 15px;

  color: #000;

  border: 1px solid #000;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.progressBar {
  position: absolute;
  left: 0;

  height: 100%;

  background-color: #f0f015;
  border-radius: 8px;

  align-self: flex-start;
}

.progressDone {
  background-color: #198754;
}

.progressValue {
  z-index: 1;

  font-size: 1.5rem;
}
</style>