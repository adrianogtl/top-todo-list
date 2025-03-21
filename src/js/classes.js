export class Project {
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

export class Task {
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
