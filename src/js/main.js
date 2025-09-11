import { parseISO, addDays, addHours } from "date-fns";
import "../scss/styles.scss";
import "./events.js";
import { List, Task } from "./classes.js";
import { renderLists, renderTasks } from "./dom.js";

const LISTS = JSON.parse(localStorage.getItem("lists")) || [];
let currentList = JSON.parse(localStorage.getItem("currentList")) || null;

export function getCurrentList() {
  if (currentList) {
    return currentList;
  }
}

export function setCurrentList(newList) {
  currentList = newList;
  localStorage.setItem("currentList", JSON.stringify(currentList));
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
  createTask("Third Task", "This is yet another description.", new Date(), 1);
  createTask(
    "Fourth Task",
    "This is yet yet another description.",
    addHours(new Date(), 1),
    2
  );
}

export function createList(name) {
  if (isDuplicatedName(LISTS, name)) {
    return;
  }

  const list = new List(name.trim() || "Untitled List");
  LISTS.push(list);
  localStorage.setItem("lists", JSON.stringify(LISTS));
  renderLists(LISTS);
}

function addTask(task) {
  getCurrentList().tasks.push(task);
}

export function createTask(name, description, dueDate, priority) {
  const task = new Task(
    name.trim() || "Untitled Task",
    description,
    dueDate,
    priority
  );
  addTask(task);
  localStorage.setItem("lists", JSON.stringify(LISTS));
}

function isDuplicatedName(list, name) {
  return list.some((list) => list.name.toLowerCase() === name.toLowerCase());
}

export function filterTasks(filter) {
  let filterFunction;
  if (filter === "today") {
    filterFunction = (task) =>
      parseISO(task.dueDate).getDate() === new Date().getDate();
  } else if (filter === "upcoming") {
    filterFunction = (task) =>
      parseISO(task.dueDate).getDate() > new Date().getDate();
  } else if (filter === "important") {
    filterFunction = (task) => task.priority === 2;
  } else {
    filterFunction = (task) => task;
  }

  return LISTS.reduce((acc, list) => {
    return acc.concat(list.tasks.filter(filterFunction));
  }, []);
}

function init() {
  if (LISTS.length === 0) {
    createDefault();
  }
  setCurrentList(LISTS[0]);
  renderLists(LISTS);
  const tasks = filterTasks("today");
  renderTasks(tasks, "Today");
}

window.addEventListener("DOMContentLoaded", init);
