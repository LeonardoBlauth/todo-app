<template>
  <div class="container">
    <div class="row d-flex align-items-center bg-white">
      <div class="col-9 text-start division py-4" :class="completedClass">
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
  props: ["tasks","task"],
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
  computed: {
    completedClass() {
      if (this.task.completed) {
        return 'completedClass'
      } else {
        return ''
      }
    }
  }
};
</script>

<style>
.completedClass {
  text-decoration: line-through;
  opacity: 0.6;
}

.division {
  border-bottom: 1px solid #adb5bd;
}
</style>