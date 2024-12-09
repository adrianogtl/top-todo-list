export class Project {
  static id = 1;
  constructor(name) {
    this.id = Project.id;
    this.name = name;
    this.todoList = [];

    Project.id++;
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  removeTodo(todo) {
    this.todoList = this.todoList.filter((currTodo) => currTodo !== todo);
  }
}

export class Todo {
  static id = 1;
  constructor(name, description, dueDate, priority, status) {
    this.id = Todo.id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;

    Todo.id++;
  }
}
