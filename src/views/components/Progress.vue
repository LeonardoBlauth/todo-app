<template>
  <div class="col-12 mt-5 tasksProgress rounded-pill" v-show="progress != 0">
    <span class="progressValue">{{ progress }}%</span>

    <div
      class="progressBar rounded-pill"
      :style="{ width: progress + '%' }"
    ></div>
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

  background-color: #198754;
  border-radius: 8px;

  align-self: flex-start;
}

.progressValue {
  z-index: 1;

  font-size: 1.5rem;
}
</style>