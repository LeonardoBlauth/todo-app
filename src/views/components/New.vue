<template>
  <div class="row my-5">
    <div class="col-5 offset-3">
      <input
        v-model="data.task"
        @keydown.enter="add"
        class="form-control"
        type="text"
        placeholder="What do you need to do?"
      />
    </div>

    <div class="col-1 d-grid">
      <button @click="add" class="btn btn-success"><EvaIcon name="plus" fill="#2c3e50" animation="pulse" /></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task', 'id'],
  data() {
    return {
      data: {
        task: '',
        id: null,
      }
    }
  },
  methods: {
    add() {
      let {id, task} = this.data;

      if (String(task).length === 0) return;

      if (id) {
        this.$api.put('api/task/' + id, {
          task: {task}
        }).then(() => {
          this.reset()
          this.$emit('reloadList');
        })
      } else {
        this.$api.post('api/task/store/', {
          task: {task}
        }).then(() => {
          this.reset()
          this.$emit('reloadList');
        })
      }
    },
    reset() {
      this.data = {
        id: null, 
        task: ''
      }
    }
  },
  watch: {
    task(newTaskValue) {
      this.data = {
        ...newTaskValue
      }
    }
  }
};
</script>

<style>
</style>