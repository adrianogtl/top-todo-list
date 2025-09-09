import { formatISO } from "date-fns";
export class List {
  static id = 0;
  constructor(name) {
    this.id = List.id;
    this.name = name;
    this.tasks = [];
    List.id++;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}

export class Task {
  static id = 0;
  constructor(name, description, dueDate, priority) {
    this.id = Task.id;
    this.name = name;
    this.description = description;
    this.dueDate = formatISO(dueDate);
    this.priority = priority;
    this.completed = false;
    Task.id++;
  }
}
