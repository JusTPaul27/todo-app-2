// function parseUrlParams() {
//     const url = window.location.href;
//     const urlArray = url.split('?');
//     const paramsString = urlArray[1];
//     if (paramsString) {
//        const paramsArray = paramsString.split('&');
//        const paramsObj = {};
//        for (const str of paramsArray) {
//            const strArray = str.split('=')
//         paramsObj[strArray[0]] = decodeURIComponent(strArray[1]);
//        }
//         console.log('paramsObj', paramsObj)
//     }else{
//         return null;
//     }
// }

function parseUrlParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
}

const params = parseUrlParams();

console.log(params);

// function getTodoFromSessionStorage() {
//     const todoString = sessionStorage.getItem('selectedTodo');
//     if (todoString) {
//         const todo = JSON.parse(todoString);
//         console.log('todo', todo);
//     }
// }

// getTodoFromSessionStorage();

function createEditTemplate(){
    const editTemplate = `
    <h2>nome</h2>
   <input type="text" name="todo-name" id="todo-name">
   <div>
       <h2>Tags</h2>
       <span class="tag">casa</span>
       <span class="tag">hobby</span>
       <span class="tag">spesa</span>
       <span class="tag">fumetti</span>
       <span class="tag">lavoro</span>
   </div>
       <div>
           <h2>priorità</h2>
           <span class="tag">bassa</span>
           <span class="tag">media</span>
           <span class="tag">alta</span>
           <span class="tag">molto alta</span>
       </div>`

}
