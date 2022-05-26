const BASE_URL = 'https://628b2f157886bbbb37b20caa.mockapi.io/todos';

let selectedTodo = new Todo('New todo');

// function parseUrlParams(){
//   const url = window.location.href;
//   console.log('URL', url);
//   const urlArray = url.split('?');
//   console.log('URLarray', urlArray);
//   const paramsString = urlArray[1];
//   console.log('secondo elemento di urlarray', paramsString);
//   if (paramsString) {
//     const paramsArray = paramsString.split('&');
//     console.log('array dei parametri', paramsArray)
//     const paramsObj = {};
//     for (const str of paramsArray) {
//       console.log('stringa parametro', str)
//       const strArray = str.split('=')
//       console.log('array del parametro', strArray)
//       paramsObj[strArray[0]] = decodeURIComponent(strArray[1]) ;
//     }
//     console.log('paramsObj', paramsObj)
//   } else {
//     return null;
//   }
// }

function goHome() {
    window.location.href = './'
}

function parseUrlParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
    //console.log('params', params);
}
  
const params = parseUrlParams();

console.log(params);

if (params.id) {
    changeTitle();
    loadSelectedTodo(params.id);
} else {
    fillForm(selectedTodo);
}


function changeTitle() {
    const pageTitle = document.getElementById('page-title');
    pageTitle.innerHTML = 'Modifica Todo';
}


  
function colorTags(selectedTags) {
    const tags = document.getElementsByClassName('tag')
    for (const tagSpan of tags) {
        if (selectedTags.includes(tagSpan.innerHTML)) {
            tagSpan.style.backgroundColor = 'tomato';
        } else {
            tagSpan.style.backgroundColor = 'rgb(0, 120, 120)'
        }
    }

}


function colorPriority(priority) {
    const priorities = document.getElementsByClassName('priority')
    for (const prioritySpan of priorities) {
        if (priority.name === prioritySpan.innerHTML) {
            prioritySpan.style.backgroundColor = priority.color;
        } else {
            prioritySpan.style.backgroundColor = 'rgb(0, 120, 120)'
        }
    }

}


function addOrRemoveTag(tag) {
    if (selectedTodo.tags.includes(tag)) {
        selectedTodo.tags = selectedTodo.tags.filter(t => filterTags(t, tag));
    } else {
        selectedTodo.tags.push(tag);
    }
    colorTags(selectedTodo.tags)
}


function filterTags(t1, t2) {
    return t1 !== t2;
}


function changePriority(priority) {
    selectedTodo.priorityOrder = priority;
    colorPriority(selectedTodo.priority);
}


function saveTodo() {
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();
    let url;
    let fetchOptions;

    if (name) {
        selectedTodo.name = name;
        const dbObj = selectedTodo.toDbObj();
        const dbObjJson = JSON.stringify(dbObj);

        if (params.id) {

            url = BASE_URL + '/' + params.id;

            fetchOptions =
            {
                method: 'put', body: dbObjJson, headers: {
                    'Content-Type': 'application/json'
                }
            }


        } else {
            url = BASE_URL
            fetchOptions =
            {
                method: 'post', body: dbObjJson, headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        fetch(url, fetchOptions)
            .then(resp => resp.json())
            .then(res => goHome())


    } else {
        alert('Non posso salvare un Todo anonimo');
    }
}

  function fillForm(todo) {
      const nameInput = document.getElementById('name-input');
      nameInput.value = todo.name;
      colorTags(todo.tags);
      colorPriority(todo.priority);
  }


  function loadSelectedTodo(id) {
    const todoUrl = BASE_URL + '/' + id;
    fetch(todoUrl)
    .then(resp => resp.json())
    .then(result => initSelectedTodo(result));
  }

  function initSelectedTodo(obj) {
    const todo = Todo.fromDbObj(obj);
    selectedTodo = todo;
    fillForm(selectedTodo);
  }




  
  // function getTodoFromSessionStorage(){
  //   const todoString = sessionStorage.getItem('selectedTodo');
  //   if (todoString) {
  //     const todo = JSON.parse(todoString);
  //     console.log('todo', todo)
  //   }
  // }
  
  
  // getTodoFromSessionStorage()
