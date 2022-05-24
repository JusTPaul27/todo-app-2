
const BASE_URL = 'https://628b2f157886bbbb37b20caa.mockapi.io/todos'

let todosArray = [];

function goTodoPage() {
  window.location.href = "./todo.html"
}

function populateTagContainer(container, tags) {
  for (const tag of tags) {
    const span = document.createElement('span')
    span.classList.add('tag');
    const node = document.createTextNode('#' + tag);
    span.appendChild(node);
    container.appendChild(span);
  }
}

function createTodoCard(todo) {


  const cardTemplate = `
<span class="todo-name">#NAME</span>
<div class="tag-container"></div>
<span>#CREATIONDATE</span>
<div class="divider"></div>
<div class="buttons-container">
  <button class="delete-button"><img width="24px" src="./assets/delete.svg" alt=""></button>
  <button class="edit-button"><img width="24px" src="./assets/edit.svg" alt=""></button>
  <button class="check-button"><img width="24px" src="./assets/check.svg" alt=""></button>
</div>
`
  const todoHtml = cardTemplate.replace('#NAME', todo.name)
    .replace('#CREATIONDATE', todo.creationDate.toLocaleString())

  return todoHtml;
}

function startLoading() {
  const loader = document.getElementById('loader')
  loader.style.display = 'inline-block'
  const refresh = document.getElementById('refresh-button');
  refresh.style.display = 'none';
}

function stopLoading() {
  const loader = document.getElementById('loader')
  loader.style.display = 'none'
  const refresh = document.getElementById('refresh-button');
  refresh.style.display = 'inline-block';
}

function filterTodos(t1, t2) {
  return t1.id !== t2.id;
}

function removeTodoAndRefesh(todo) {
  stopLoading()
  todosArray = todosArray.filter(t1 => filterTodos(t1, todo))
  displayTodos(todosArray);
}


function confirmDelete() {
  const retVal = confirm('Vuoi davvero cancellare questo promemoria?')
  if (retVal === true) {
    alert('Il promemoria è stato cancellato correttamente!');
    deleteTodo(todo.id);
    return true;
  } else{
    alert('Il promemoria è non stato cancellato');
    return false
  }
}

function deleteTodo(id) {
  startLoading()
  const deleteUrl = BASE_URL + '/' + id;
  const fetchOptions = { method: 'delete' };
  fetch(deleteUrl, fetchOptions)
    .then(response => response.json())
    .then(result => removeTodoAndRefesh(result))
    .catch(error => stopLoading())
}


function orderByPriority() {
  toDoList.sort(compareByPriority);
}

function compareByPriority(todo1, todo2) {
  return todo2.priority - todo1.priority;
}

function displayTodos(todos) {

  const todosContainer = document.getElementById('todos-container');

  todosContainer.innerHTML = '';

  for (const todo of todos) {

    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');
    todoCard.innerHTML = createTodoCard(todo);


    const tagContainer = todoCard.querySelector('.tag-container');


    populateTagContainer(tagContainer, todo.tags)


    const deleteButton = todoCard.querySelector('.delete-button');
    deleteButton.onclick = () => confirmDelete();


    const divider = todoCard.querySelector('.divider');
    divider.style.backgroundColor = todo.priority.color;
    


    // const span = document.createElement('span');
    // const nameNode = document.createTextNode(todo.name);
    // span.appendChild(nameNode);

    // todoCard.appendChild(span);

    // const button = document.createElement('button');
    // button.onclick = () => deleteTodo(todo.id)
    // const deleteNode = document.createTextNode('delete');
    // button.appendChild(deleteNode);

    // todoCard.appendChild(button);

    
    todosContainer.appendChild(todoCard);
    

  }
  // orderByPriority();
}


function initTodos(todos) {
  stopLoading();
  todosArray = todos.map(obj => Todo.fromDbObj(obj));
  displayTodos(todosArray);
}

function loadTodos() {
  startLoading()
  fetch(BASE_URL)
    .then(response => response.json())
    .then(result => initTodos(result))
    .catch(error => stopLoading())
}

loadTodos()


