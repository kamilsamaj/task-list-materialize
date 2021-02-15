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
    let task = e.target.parentElement.parentElement;
    //console.log(task);
    task.remove();
  }
}
