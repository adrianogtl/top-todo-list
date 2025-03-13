import { formatISO } from "date-fns";

const projects = [];
let currProject = null;

const getCurrProject = () => currProject;
const setCurrProject = (id) =>
  (currProject = projects.find((project) => project.id === id));

class Project {
  static id = 1;
  constructor(name) {
    this.id = Project.id;
    this.name = name;
    this.tasks = [];
    Project.id++;
  }

  getTasks() {
    return [...this.tasks];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

class Task {
  static id = 1;

  constructor(name, description, dueDate, priority, checklist) {
    this.id = Task.id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;

    Task.id++;
  }
}

// Create 3 projects
for (let i = 0; i < 3; i++) {
  const project = new Project(`Project #${i + 1}`);

  projects.push(project);
  setCurrProject(project.id);

  // console.log(`Project #${i + 1}:`);

  // For each project, Create 3 tasks
  for (let j = 0; j < 3; j++) {
    const task = new Task(
      `Project #${i + 1} Task #${j + 1}`,
      `Description #${j + 1}`,
      formatISO(new Date(2025, 3, j + 1)),
      j + 1,
      false
    );
    getCurrProject().addTask(task);
  }
  // console.log(project.tasks);
}
// getCurrProject().removeTask();
getCurrProject().removeTask(9);
console.log(getCurrProject().getTasks());
getCurrProject().addTask(
  new Task("New task", "New task description", formatISO(new Date()), 2, true)
);
console.log(getCurrProject().getTasks());
