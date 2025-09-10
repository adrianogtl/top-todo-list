import { Modal } from "bootstrap";
import { renderTasks, toggleTheme } from "./dom.js";
import { createList, createTask, filterTasks, getCurrentList } from "./main.js";

function handleForm(e) {
  e.preventDefault();

  if (e.target.id === "new-list-form") {
    const listName = document.querySelector("#list-name");
    createList(listName.value);
    listName.value = "";
    const modal = Modal.getOrCreateInstance(newListModal);
    modal.hide();
  }

  if (e.target.id === "new-task-form") {
    const taskName = document.querySelector("#task-name");
    const taskDescription = document.querySelector("#task-description");
    const taskDueDate = document.querySelector("#task-due-date");
    const taskPriority = document.querySelector("#task-priority");

    createTask(
      taskName.value,
      taskDescription.value,
      taskDueDate.value,
      taskPriority.value
    );
    taskName.value = "";
    taskDescription.value = "";
    taskDueDate.value = "";
    taskPriority.value = "";
    const modal = Modal.getOrCreateInstance(newTaskModal);
    modal.hide();
    renderTasks(getCurrentList().tasks, "");
  }
}

function renderFiltered(filter) {
  const tasks = filterTasks(filter);
  renderTasks(tasks, filter);
}

const toggleThemeBtn = document.querySelector("#toggle-theme-btn");
const todayBtn = document.querySelector("#today-btn");
const upcomingBtn = document.querySelector("#upcoming-btn");
const importantBtn = document.querySelector("#important-btn");
const allBtn = document.querySelector("#all-btn");
const newListModal = document.querySelector("#new-list-modal");
const newListForm = document.querySelector("#new-list-form");
const newTaskModal = document.querySelector("#new-task-modal");
const newTaskForm = document.querySelector("#new-task-form");
toggleThemeBtn.addEventListener("click", toggleTheme);
todayBtn.addEventListener("click", () => renderFiltered("today"));
upcomingBtn.addEventListener("click", () => renderFiltered("upcoming"));
importantBtn.addEventListener("click", () => renderFiltered("important"));
allBtn.addEventListener("click", () => renderFiltered("all Tasks"));
newListModal.addEventListener("shown.bs.modal", () => {
  document.querySelector("#list-name").focus();
});
newTaskModal.addEventListener("shown.bs.modal", () => {
  document.querySelector("#task-name").focus();
});
newListForm.addEventListener("submit", (e) => handleForm(e));
newTaskForm.addEventListener("submit", (e) => handleForm(e));
