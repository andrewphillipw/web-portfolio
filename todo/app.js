//this is equivalent to ToDo.js
//Selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document
    .querySelector('ul')
    .addEventListener('click', handleClickDeleteOrCheck);

//Event Handlers
function handleSubmitForm(e) {
    //overide the default browser submit behavior
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '') addTodo(input.value);
    input.value = '';
}

function handleClickDeleteOrCheck(e) {
    if (e.target.name == 'checkButton') checkTodo(e);

    if (e.target.name == 'deleteButton') deleteTodo(e);
}

//Helpers
function addTodo(todo) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    //be sure to close the elements to avoid duplicates <i> needs </i>
    li.innerHTML = `
    <button name="checkButton"><i class="far fa-check-square"></i></button>
    <span class="todo-item">${todo}</span>

    <button name="deleteButton"><i class="far fa-window-close"></i></button>
    `;

    li.classList.add('todo-list-item');
    ul.appendChild(li);
}

function checkTodo(e) {
    let item = e.target.parentNode;
    if (item.style.textDecoration == 'line-through')
        item.style.textDecoration = 'none';
    else item.style.textDecoration = 'line-through';
}

function deleteTodo(e) {
    let item = e.target.parentNode;
    item.remove();
}
