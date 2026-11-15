const initialItems = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


/**
 * Загружает задачи из localStorage или возвращает предустановленный массив.
 * @returns {string[]} Массив задач.
 */
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return initialItems;
}

/**
 * Сохраняет массив задач в localStorage.
 * @param {string[]} tasks - Массив задач.
 */
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Собирает задачи из DOM и возвращает их в виде массива.
 * @returns {string[]} Массив задач.
 */
function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((element) => {
    tasks.push(element.textContent);
  });
  return tasks;
}

/**
 * Создаёт готовый элемент задачи.
 * @param {string} item - Текст задачи.
 * @returns {HTMLElement} Элемент задачи.
 */
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  return clone;
}


let items = loadTasks();
items.forEach((item) => {
  const itemElement = createItem(item);
  listElement.append(itemElement);
});


formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTaskText = inputElement.value.trim();
  if (newTaskText === "") return;
  const newItem = createItem(newTaskText);
  listElement.prepend(newItem);
  inputElement.value = "";
  const currentTasks = getTasksFromDOM();
  saveTasks(currentTasks);
});