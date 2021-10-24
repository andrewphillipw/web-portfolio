//this is equivalent to ToDo.js
//for hi-liting selected button
let btns = document.getElementsByClassName('target');
console.log('btns', btns);
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        let current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
    });
}

//Selectors
document.querySelector('#all').addEventListener('click', filterAll);
document.querySelector('#active').addEventListener('click', filterActive);
document.querySelector('#completed').addEventListener('click', filterCompleted);
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
    <button id="checkButton" name="checkButton"><i class="far fa-check-square"></i></button>
    <span class="todo-item">${todo}</span>

    <button class="deleteButton" name="deleteButton"><i class="far fa-window-close"></i></button>
    `;

    li.classList.add('todo-list-item');
    ul.appendChild(li);
    countTodo();
}

function checkTodo(e) {
    let item = e.target.parentNode;
    if (item.style.textDecoration == 'line-through')
        item.style.textDecoration = 'none';
    else item.style.textDecoration = 'line-through';
    countTodo();
}

function deleteTodo(e) {
    let item = e.target.parentNode;
    item.remove();
    countTodo();
}

// TODO task is added or checked/unchecked or deleted call count function
function filterActive(e) {
    // alert('hello');
    // console.log('e', e); //sometimes too complex
    let todos = document.getElementsByClassName('todo-list-item');
    //console.log('todos', todos);
    console.log('todos', typeof todos);
    for (todo of todos) {
        console.log('todo', todo);
        if (todo.style.textDecoration == 'line-through') {
            todo.style.display = 'none';
        } else if (todo.style.display == 'none') {
            todo.style.display = 'block';
        }
    }
}

function filterCompleted(e) {
    // alert('hello'); //use when only alert
    // console.log('e', e); //sometimes too complex
    let todos = document.getElementsByClassName('todo-list-item');
    //console.log('todos', todos);
    console.log('todos', typeof todos);
    for (todo of todos) {
        console.log('todo', todo);
        if (todo.style.textDecoration != 'line-through') {
            todo.style.display = 'none';
        } else if (todo.style.display == 'none') {
            todo.style.display = 'block';
        }
    }
}

function filterAll(e) {
    // alert('hello'); //use when only alert
    // console.log('e', e); //sometimes too complex
    let todos = document.getElementsByClassName('todo-list-item');
    //console.log('todos', todos);
    console.log('todos', typeof todos);
    for (todo of todos) {
        // console.log('todo', todo);
        if (
            todo.style.textDecoration == 'line-through' ||
            todo.style.display == 'none'
        ) {
            todo.style.display = 'block';
        }
    }
    //bug from having countTodo in the conditions
    // countTodo(); //not needed here
}

function countTodo() {
    let count = 0;
    let todos = document.getElementsByClassName('todo-list-item');
    console.log('todo all', todos);
    // console.log('todos', todos);
    for (todo of todos) {
        if (todo.style.textDecoration != 'line-through') {
            count += 1;
        }
    }
    //better to increment and make small steps
    //sometimes the browser gets tired
    //just double check code and refresh
    let b = document.querySelector('b');
    // console.log(b);
    b.innerHTML = count;
}
