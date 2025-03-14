import { formatISO } from "date-fns";
import { Project, Task } from "./classes.js";
import { getProjects, getCurrProject, setCurrProject } from "./main.js";

const isValidPriority = (priority) => priority >= 1 && priority <= 3;

export function createProject(name = "Untitled Project") {
  const project = new Project(name);
  getProjects().push(project);
  setCurrProject(project.id);
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
  getCurrProject().addTask(task);
}

export function createDefault(numOfProjects = 1, numOfTasksPerProject = 1) {
  // Priority: 1 or 2 or 3
  const getRandomPriority = () => Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numOfProjects; i++) {
    createProject(`Project #${i + 1}`);

    for (let j = 0; j < numOfTasksPerProject; j++) {
      createTask(
        `Project #${i + 1} Task #${j + 1}`,
        `This is the Task #${j + 1} of the Project #${i + 1}`,
        new Date(2025, 3, j + 1, 12),
        getRandomPriority(),
        false
      );
    }
  }
}
