<template>
  <div class="row my-5">
    <div class="col-9 offset-1">
      <input
        v-model="data.task"
        @keydown.enter="add"
        class="form-control border border-dark rounded-pill"
        type="text"
        placeholder="What do you need to do?"
      />
    </div>

    <div class="col-1 d-grid">
      <button @click="add" class="btn border border-dark rounded-pill">
        <EvaIcon name="plus" fill="#000" animation="pulse" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task", "id"],
  data() {
    return {
      data: {
        task: "",
        id: null,
      },
    };
  },
  methods: {
    add() {
      let { id, task } = this.data;

      if (String(task).length === 0) return;

      if (id) {
        this.$api
          .put("api/task/" + id, {
            task: task,
          })
          .then(() => {
            this.$notify({
              group: 'foo',
              title: '<h5 class="text-light fw-bold">Success</h5>',
              text: "<p class='text-light text-center'>Task successfully edited!</p>",
              type: 'success',
            });
            this.reset();
            this.$emit("reloadList");
          })
          .catch(error => {
            if (error.message === 'Request failed with status code 403') {
              this.$notify({
                group: 'foo',
                title: '<h5 class="text-light fw-bold">Warning</h5>',
                text: "<p class='text-light text-center'>You can't edit a completed task, unless it has the tag (edit)!</p>",
                type: 'warn',
              })
              this.reset();
            } else if (error.message === 'Request failed with status code 422') {
              this.$notify({
                group: 'foo',
                title: '<h5 class="text-light fw-bold">Warning</h5>',
                text: '<p class="text-light text-center">This task already exists!</p>',
                type: 'warn',
              })
              this.reset();
            }
          })
      } else {
        this.$api
          .post("api/task/store/", {
            task: task,
          })
          .then(() => {
            this.$notify({
              group: 'foo',
              title: '<h5 class="text-light fw-bold">Success</h5>',
              text: "<p class='text-light text-center'>Task successfully added!</p>",
              type: 'success',
            });
            this.reset();
            this.$emit("reloadList");
          })
          .catch (error => {
            if (error.message === 'Request failed with status code 422') {
              this.$notify({
                group: 'foo',
                title: '<h5 class="text-light fw-bold">Warning</h5>',
                text: '<p class="text-light text-center">This task already exists!</p>',
                type: 'warn',
              })
              this.reset();
            } else if (error.message === 'Request failed with status code 403') {
              this.$notify({
                group: 'foo',
                title: '<h5 class="text-light fw-bold">Warning</h5>',
                text: '<p class="text-light text-center">There can be a maximun of 5 incompleted tasks to add a new task!</p>',
                type: 'warn',
              });
            }
          })
      }
    },
    reset() {
      this.data = {
        id: null,
        task: "",
      };
    },
  },
  watch: {
    task(newTaskValue) {
      this.data = {
        ...newTaskValue,
      };
    },
  },
};
</script>

<style>
</style>