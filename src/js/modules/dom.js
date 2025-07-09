const toggleThemeBtn = document.querySelector("#toggle-theme-btn");

const toggleTheme = () => {
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
};

toggleThemeBtn.addEventListener("click", toggleTheme);
