import { createList, createTask, createDefault } from "./helpers.js";

const lists = [];
let currList = null;

export const getLists = () => lists;
export const getCurrList = () => currList;
export const setCurrList = (id) =>
  (currList = lists.find((list) => list.id === id));

createDefault();
console.log(lists);
