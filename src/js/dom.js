import { setCurrentList } from "./main.js";
import { parseISO, format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

export function toggleTheme() {
  const toggleClasses = () => {
    document.querySelector("#theme-icon").classList.toggle("bi-sun-fill");
    document
      .querySelector("#theme-icon")
      .classList.toggle("bi-moon-stars-fill");
  };
  const rootElement = document.documentElement;
  const currentTheme = rootElement.getAttribute("data-bs-theme");
  if (currentTheme === "light") {
    rootElement.setAttribute("data-bs-theme", "dark");
    toggleClasses();
  } else {
    rootElement.setAttribute("data-bs-theme", "light");
    toggleClasses();
  }
}

export function renderLists(lists) {
  const userLists = document.querySelector("#user-lists");
  userLists.innerHTML = "";
  lists.forEach((list) => {
    const btnEl = document.createElement("button");
    btnEl.textContent = list.name;
    btnEl.classList.add("btn", "text-start");
    btnEl.addEventListener("click", () => {
      setCurrentList(list);
      list.name;
      renderTasks(list.tasks, list.name);
    });
    userLists.appendChild(btnEl);
  });
}

export function renderTasks(tasks, listName) {
  document.querySelector("#list-title").textContent =
    listName.charAt(0).toUpperCase() + listName.slice(1);
  const listPreview = document.querySelector("#task-preview");
  listPreview.innerHTML = tasks
    .map((list) => {
      const priorities = ["bg-success", "bg-warning", "bg-danger"];
      const date = parseISO(list.dueDate);
      const isPastDate = date.getTime() < Date.now();
      let locale;
      if (navigator.language === "pt-BR") {
        locale = ptBR;
      } else {
        locale = enUS;
      }
      return `
        <div class="d-flex justify-content-between border rounded ${
          isPastDate ? "text-decoration-line-through" : ""
        }">
        <div class="${
          priorities[list.priority]
        } rounded-start" style="width: 20px; height: auto;"></div>
          <h4 class="p-2 ">${list.name}</h4>
          <p class="p-2">${list.description}</p>
          <p class="p-2">${format(date, "PPp", { locale })}</p>
        </div>
        `;
    })
    .join("");
}
