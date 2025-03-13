import { createProject, createTask, createDefault } from "./helpers.js";

const projects = [];
let currProject = null;

export const getProjects = () => projects;
export const getCurrProject = () => currProject;
export const setCurrProject = (id) =>
  (currProject = projects.find((project) => project.id === id));

createDefault();
console.log(projects);
