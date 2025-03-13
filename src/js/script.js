import { formatISO } from "date-fns";
import { Project, Task } from "./classes.js";
import createDefault from "./default.js";

const projects = [];
let currProject = null;

export const getProjects = () => projects;
export const getCurrProject = () => currProject;
export const setCurrProject = (id) =>
  (currProject = projects.find((project) => project.id === id));

createDefault(5, 10);
console.log(projects);
