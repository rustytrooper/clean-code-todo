const taskInput = document.getElementById('new-task')
const addButton = document.getElementsByTagName('button')[0]
const incompleteTaskList = document.getElementById('incomplete-tasks')
const completedTaskList = document.getElementById('completed-tasks')

const createElement = (tag, props = {}) => {
    const el = document.createElement(tag)
    Object.assign(el, props)
    return el
}

const createTaskListItem = function (taskString) {
    const listItem = document.createElement('li')

    const checkBox = createElement('input', { type: 'checkbox' })
    const label = createElement('label', {
        className: 'task',
        innerText: taskString,
    })
    const editInput = createElement('input', {
        type: 'text',
        className: 'task',
    })
    const editButton = createElement('button', {
        className: 'edit',
        innerText: 'Edit',
    }) //innerText encodes special characters, HTML does not.
    const deleteButton = createElement('button', { className: 'delete' })
    const deleteButtonImg = createElement('img', { src: './remove.svg' })

    deleteButton.appendChild(deleteButtonImg)

    listItem.append(checkBox, label, editInput, editButton, deleteButton)
    return listItem
}

const addTask = function () {
    if (!taskInput.value) return
    const listItem = createTaskListItem(taskInput.value)

    incompleteTaskList.appendChild(listItem)
    bindTaskEvents(listItem, moveTaskToCompleted)

    taskInput.value = ''
}

const toggleTaskEditMode = function () {
    const listItem = this.parentNode

    const editInput = listItem.querySelector('input[type=text]')
    const label = listItem.querySelector('label')
    const editBtn = listItem.querySelector('.edit')
    const containsClass = listItem.classList.contains('edit-mode')

    if (containsClass) {
        label.innerText = editInput.value
        editBtn.innerText = 'Edit'
    } else {
        editInput.value = label.innerText
        editBtn.innerText = 'Save'
    }

    listItem.classList.toggle('edit-mode')
}

const deleteTask = function () {
    const listItem = this.parentNode
    const ul = listItem.parentNode
    ul.removeChild(listItem)
}

const moveTaskToCompleted = function () {
    const listItem = this.parentNode
    completedTaskList.appendChild(listItem)
    bindTaskEvents(listItem, moveTaskToIncomplete)
}

const moveTaskToIncomplete = function () {
    const listItem = this.parentNode
    incompleteTaskList.appendChild(listItem)
    bindTaskEvents(listItem, moveTaskToCompleted)
}

addButton.addEventListener('click', addTask)

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector('input[type=checkbox]')
    const editButton = taskListItem.querySelector('button.edit')
    const deleteButton = taskListItem.querySelector('button.delete')

    editButton.onclick = toggleTaskEditMode
    deleteButton.onclick = deleteTask
    checkBox.onchange = checkBoxEventHandler
}

for (let i = 0; i < incompleteTaskList.children.length; i++) {
    bindTaskEvents(incompleteTaskList.children[i], moveTaskToCompleted)
}

for (let i = 0; i < completedTaskList.children.length; i++) {
    bindTaskEvents(completedTaskList.children[i], moveTaskToIncomplete)
}
