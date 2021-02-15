// UI consts
const form = document.querySelector('#task-form'); // form
const taskList = document.querySelector('.collection');  // ul
const clearBtn = document.querySelector('.clear-tasks'); // clear-tasks <a>
const filter = document.querySelector('#filter'); // input field
const taskInput = document.querySelector('#task'); // input field
const tasksLSVarName = 'tasks';

// assign all event listeners
function loadEventListeners() {
  // DOM load() event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);

  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear all tasks
  clearBtn.addEventListener('click', clearTasks);

  // filter tasks as you type in the filter
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from localStorage and transform them to <li> elements
function getTasks() {
  let tasks = loadFromLocalStorage();
  tasks.forEach(taskCaption => {
    // create a new HTML <li> with the task
    let li = createTaskListItem(taskCaption);

    // append li to ul
    taskList.appendChild(li);
  });
}

// load tasks from local storage
function loadFromLocalStorage() {
  if (localStorage.getItem(tasksLSVarName) === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(tasksLSVarName));
  }
}

// Store Task in localStorage
function storeTaskInLocalStorage(task) {
  let tasks = loadFromLocalStorage();

  // add the new task to a local storage
  tasks.push(task);
  localStorage.setItem(tasksLSVarName, JSON.stringify(tasks));
}

// Sync visible tasks to "Add Task" buttonr
function syncTasksToLocalStorage() {
  let tasks = [];
  Array.from(taskList.children).forEach(taskItem => {
    tasks.push(taskItem.textContent);
  });
  localStorage.setItem(tasksLSVarName, JSON.stringify(tasks));
}

// // Remove an item based on an index from the localStorage
// function removeFromLocalStorage(index) {
//
// }

// create task list HTML element from a given text
function createTaskListItem(taskCaption) {
  // create new item
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskCaption));

  // a tag within the item
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  return li;
}

// event listener for
function addTask(e) {
  if (taskInput.value === '') {
    alert('Cannot add an empty task, please set a task');
    return;
  }

  // create a new HTML <li> with the task
  let li = createTaskListItem(taskInput.value);

  // append li to ul
  taskList.appendChild(li);

  // store task in localStorage
  storeTaskInLocalStorage(taskInput.value);

  // clear the input field
  taskInput.value = '';

  e.preventDefault();
}

// Remove task event handler
function removeTask(e) {
  // <a> element has the 'delete-item' class
  if (e.target.parentElement.classList.contains('delete-item')) {
    const task = e.target.parentElement.parentElement;
    if (confirm(`Do you really want to remove the task "${task.innerText}"?`)) {
      task.remove();
      syncTasksToLocalStorage();  // sync UI with localStorage
    }
  }
}

// clear all tasks
function clearTasks(e) {
  if (confirm('Do you really want to remove all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    syncTasksToLocalStorage();
  }
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// load all event listeners
loadEventListeners();
