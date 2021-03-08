<template>
  <div>
    <h1 class="text-uppercase fw-bold">To Do List</h1>
    <New :task="task" @reloadList="getList()" />
    <Viewer :tasks="tasks" @edit="edit" @reloadList="getList()" />
    <Progress :progress="progress" />
  </div>
</template>

<script>
import New from "./components/New";
import Viewer from "./components/Viewer";
import Progress from "./components/Progress";

export default {
  components: {
    New,
    Viewer,
    Progress,
  },
  data() {
    return {
      tasks: [],
      task: null,
      
    };
  },
  methods: {
    getList() {
      this.$api.get("api/tasks")
        .then((response) => {
          this.tasks = response.data;
        });
    },
    edit(id) {
      this.task = this.tasks.find(task => task.id === id)
    },
  },
  computed: {
    tasks_completed() {
        return this.tasks.filter((t) => {
          return parseInt(t.complete)
        })
    },
    progress() {
      const total = this.tasks.length;
      const completed = this.tasks.filter(task => task.completed).length;

      return Math.round((completed / total) * 100) || 0;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>