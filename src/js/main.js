import { addDays } from "date-fns";
import "../scss/styles.scss";
import "./events.js";
import { List, Task } from "./classes.js";
import { renderLists, renderTasks } from "./dom.js";

const LISTS = [];
let currentList = null;

export function getCurrentList() {
  if (currentList) {
    return currentList;
  }
}

export function setCurrentList(newList) {
  currentList = newList;
}

function createDefault() {
  createList("Default List");
  setCurrentList(LISTS[0]);
  createTask("First Task", "This is a description.", addDays(new Date(), 5), 0);
  createTask(
    "Second Task",
    "This is another description.",
    addDays(new Date(), 2),
    1
  );
  createTask(
    "Third Task",
    "This is yet another description.",
    addDays(new Date(), 1),
    2
  );
}

export function createList(name) {
  if (isDuplicatedName(LISTS, name)) {
    return;
  }

  const list = new List(name.trim() || "Untitled List");
  LISTS.push(list);
  renderLists(LISTS);
}

export function createTask(name, description, dueDate, priority) {
  const task = new Task(
    name.trim() || "Untitled Task",
    description,
    dueDate,
    priority
  );
  getCurrentList().addTask(task);
  renderTasks(getCurrentList());
}

function isDuplicatedName(list, name) {
  return list.some((list) => list.name.toLowerCase() === name.toLowerCase());
}

function init() {
  if (LISTS.length === 0) {
    createDefault();
  }
  setCurrentList(LISTS[0]);
  renderLists(LISTS);
}

window.addEventListener("DOMContentLoaded", init);
