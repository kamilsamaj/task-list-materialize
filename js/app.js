// UI consts
const form = document.querySelector('#task-form'); // form
const taskList = document.querySelector('.collection');  // ul
const clearBtn = document.querySelector('.clear-tasks'); // clear-tasks <a>
const filter = document.querySelector('#filter'); // input field
const taskInput = document.querySelector('#task'); // input field

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // add task event
  form.addEventListener('submit', addTask);

  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear all tasks
  clearBtn.addEventListener('click', clearTasks);

  // filter tasks as you type in the filter
  filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Cannot add an empty task, please set a task');
    return;
  }

  // create new item
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  // a tag within the item
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  // append li to ul
  console.log(li);
  taskList.appendChild(li);

  // clear the input field
  taskInput.value = '';

  e.preventDefault();
}

// Remove task event handler
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    const task = e.target.parentElement.parentElement;
    if (confirm(`Do you really want to remove the task "${task.innerText}"?`)) {
      task.remove();
    }
  }
}

// clear all tasks
function clearTasks(e) {
  if (confirm('Do you really want to remove all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
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
