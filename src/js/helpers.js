import { formatISO } from "date-fns";
import { List, Task } from "./classes.js";
import { getLists, getCurrList, setCurrList } from "./main.js";

const isValidPriority = (priority) => priority >= 1 && priority <= 3;

export function createList(name = "Untitled List") {
  const list = new List(name);
  getLists().push(list);
  setCurrList(list.id);
}

export function createTask(
  name = "Untitled Task",
  description = "No description",
  dueDate = new Date(),
  priority = 1,
  checklist = false
) {
  const task = new Task(
    name,
    description,
    formatISO(dueDate),
    isValidPriority(priority),
    checklist
  );
  getCurrList().addTask(task);
}

export function createDefault(numOfLists = 1, numOfTasksPerList = 1) {
  // Priority: 1 or 2 or 3
  const getRandomPriority = () => Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numOfLists; i++) {
    createList(`List #${i + 1}`);

    for (let j = 0; j < numOfTasksPerList; j++) {
      createTask(
        `List #${i + 1} Task #${j + 1}`,
        `This is the Task #${j + 1} of the List #${i + 1}`,
        new Date(2025, 3, j + 1, 12),
        getRandomPriority(),
        false
      );
    }
  }
}
