<template>
  <div class="container">
    <div class="row d-flex align-items-center py-1 mb-3">
      <div class="col-9 text-start">
          {{ task.task }}
      </div>

      <div class="col-1">
        <input
          class="form-check-input"
          type="checkbox"
          @click="changeState" />
      </div>

      <div class="col-1">
        <button class="btn btn-primary" @click="edit(task.id)">
          <EvaIcon name="edit-2" fill="#2c3e50" animation="flip" width="50px" />
        </button>
      </div>

      <div class="col-1">
        <button class="btn btn-danger" @click="remove">
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
      this.$api.put('/api/task/' + this.task.id + '/toggle-completed', {
        task: parseInt(this.task.completed) ? 0 : 1,
      })
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
};
</script>

<style>
</style>