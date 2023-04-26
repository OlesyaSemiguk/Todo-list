const dom = {
  newInput: document.getElementById('new-input'),
  newAdd: document.getElementById('new-add'),
  tasks: document.getElementById('tasks'),
  taskTemplate: document.querySelector('#task-template').content,
  messageEmptytask: document.querySelector('.todo__massage'),
}
const tasksArray = []

dom.newInput.addEventListener('keydown', function (event) {
  const taskText = dom.newInput.value
  if (event.key === 'Enter')
    if (taskText) {
      addTask(taskText)
      dom.newInput.value = ''
    }
})
dom.newAdd.addEventListener('click', function () {
  const taskText = dom.newInput.value
  if (taskText) {
    addTask(taskText)
    dom.newInput.value = ''
  }
})
function checkboxChange(task) {
  let checkbox = task.querySelector('#task-checkbox')
  console.log(checkbox)
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      task.classList.add('todo__task_complete')
    } else {
      task.classList.remove('todo__task_complete')
    }
  })
}

//Функция добавляющая задачу
function addTask(taskText) {
  let idTask = Date.now()
  tasksArray.push({
    id: idTask,
    text: taskText,
    isComplete: false,
  })

  let newTask = dom.taskTemplate.querySelector('.todo__task').cloneNode(true)
  newTask.id = idTask

  let newTaskText = newTask.querySelector('.todo__task-text')
  newTaskText.textContent = taskText
  addCheckHandler(newTask, idTask)
  dom.tasks.appendChild(newTask)
  checkboxChange(newTask)
  isTaskListEmpty()
}
//Функция добавляющая листенер на кнопку удаления задачи
function addCheckHandler(task, idTask) {
  let delButton = task.querySelector('.todo__task-del')
  delButton.addEventListener('click', function () {
    let indexTask = tasksArray.find(task => task.id === idTask)
    tasksArray.splice(indexTask, 1)
    task.remove()
    isTaskListEmpty()
  })
}

function isTaskListEmpty() {
  if (tasksArray.length === 0) {
    dom.messageEmptytask.classList.remove('hidden')
  } else {
    dom.messageEmptytask.classList.add('hidden')
  }
}
