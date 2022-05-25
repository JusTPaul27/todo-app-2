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