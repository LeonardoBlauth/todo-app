<template>
  <div class="container">
    <div class="row d-flex align-items-center py-1 mb-2 bg-white">
      <div class="col-9 text-start">
        {{ task.task }}
        <div class="division"></div>
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
        <button class="btn border border-dark" @click="edit(task.id)">
          <EvaIcon name="edit-2" fill="#000" animation="flip" width="50px" />
        </button>
      </div>

      <div class="col-1">
        <button class="btn border border-dark" @click="remove">
          <EvaIcon name="trash-2" fill="#000" animation="shake" width="50px" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task"],
  methods: {
    changeState() {
      this.$api.put("/api/task/" + this.task.id + "/toogle").then(() => {
        this.$emit("taskChanged");
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
    remove() {
      this.$api.delete("/api/task/" + this.task.id).then(() => {
        this.$emit("taskChanged");
      });
    },
  },
};
</script>

<style>
.division {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #adb5bd;
}
</style>