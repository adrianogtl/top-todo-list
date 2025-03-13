import { formatISO } from "date-fns";
import { Project, Task } from "./classes.js";
import { getProjects, getCurrProject, setCurrProject } from "./script.js";

export default function createDefault(
  numOfProjects = 1,
  numOfTasksPerProject = 1
) {
  // Priority: 1 or 2 or 3
  const getRandomPriority = () => Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numOfProjects; i++) {
    const project = new Project(`Project #${i + 1}`);

    getProjects().push(project);
    setCurrProject(project.id);

    for (let j = 0; j < numOfTasksPerProject; j++) {
      const task = new Task(
        `Project #${i + 1} Task #${j + 1}`,
        `This is the Task #${j + 1} of the Project #${i + 1}`,
        formatISO(new Date(2025, 3, j + 1, 12)),
        getRandomPriority(),
        false
      );

      getCurrProject().addTask(task);
    }
  }
}
