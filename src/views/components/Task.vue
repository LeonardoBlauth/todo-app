<template>
  <div class="container">
    <div class="row d-flex align-items-center py-1 mb-3 bg-white border border-dark rounded-pill">
      <div class="col-9 text-start" :class="completedColor">
          {{ task.task }}
      </div>

      <div class="col-1">
        <input
          class="form-check-input border border-dark"
          type="checkbox"
          @click="changeState"
          :checked="task.completed"
           />
      </div>

      <div class="col-1">
        <button class="btn btn-primary border border-dark rounded-pill" @click="edit(task.id)">
          <EvaIcon name="edit-2" fill="#2c3e50" animation="flip" width="50px" />
        </button>
      </div>

      <div class="col-1">
        <button class="btn btn-danger border border-dark rounded-pill" @click="remove">
          <EvaIcon
            name="trash-2"
            fill="#2c3e50"
            animation="shake"
            width="50px"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    changeState() {
      this.$api.put('/api/task/' + this.task.id + '/toogle')
      .then(() => {
        this.$emit('taskChanged');
      })
    },
    edit(id) {
      this.$emit('edit', id)
    },
    remove() {
      this.$api.delete('/api/task/' + this.task.id)
      .then(() => {
        this.$emit('taskChanged');
      })
    },
  },
  computed: {
    completedColor() {
      if (this.task.completed) {
        return 'completedText'
      }
      return 'pendingText'
    },
    completedBorder() {
      if (this.task.completed) {
        return 'completedBorder'
      }
      return 'pendingBorder'
    }
  }
};
</script>

<style>
.completedText {
  text-decoration: line-through;
  opacity: 0.6;
}
.pendingText {
  font-weight: bold;
}
</style>