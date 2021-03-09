<template>
  <div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input border border dark"
        type="radio"
        name="inlineRadioOptions"
        value="all"
        checked
        v-model="filter"
      />
      <label class="form-check-label" for="all">All</label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input border border-dark"
        type="radio"
        name="inlineRadioOptions"
        value="active"
        v-model="filter"
      />
      <label class="form-check-label" for="active">Active</label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input border border-dark"
        type="radio"
        name="inlineRadioOptions"
        value="completed"
        v-model="filter"
      />
      <label class="form-check-label" for="completed">Completed</label>
    </div>

    <div v-for="(task, index) in filteredTasks" :key="index">
      <Task :tasks="tasks" :task="task" @edit="edit" @taskChanged="$emit('reloadList')" />
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  components: {
    Task,
  },
  props: ["tasks"],
  data() {
    return {
      filter: "all",
    };
  },
  methods: {
    edit(id) {
      this.$emit("edit", id);
    },
  },
  computed: {
    filteredTasks() {
      if (this.filter === "all") {
        return this.tasks;
      }

      return this.tasks.filter(
        (task) => task.completed === (this.filter === "completed" ? 1 : 0)
      );
    },
  },
};
</script>

<style>
</style>