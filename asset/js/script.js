/* Model */
let todos;

/* get stored todo from string to JSON and view them */
let savedTodos = JSON.parse(localStorage.getItem('todos'));

/* save todos in localstorage browser */
const saveTodos = () => {
    /* convert strings to JSON data */
    localStorage.setItem('todos', JSON.stringify(todos));
}

if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [
        { 
            title: "cooking",
            dueDate: "2023-05-20",
            id: "id1",
        },
        { 
            title: "playing", 
            dueDate: "2022-2-29",
            id: "id2",
        },
        { 
            title: "studying",
            dueDate: "2022-6-7",
            id: "id3",
        }
    ];
    
}

/* Controllers to add and delete todos */
let addTodoBtn = document.getElementById("add-todo");

const addTodo = () => {
    let todoTitleInput = document.getElementById("todo-title");
    let title = todoTitleInput.value;
    let datePicker = document.getElementById('date-picker');
    let dueDate = datePicker.value;

    createTodos(title, dueDate);
    saveTodos();
    render();
}
/* -- push todos -- */
const createTodos = (title, dueDate) => {
    let id = '' + new Date().getTime();

    todos.push(
        { 
            title: title,
            dueDate: dueDate,
            id: id,
        }
    );
}

const deleteTodo = event => {
    let deleteBtn = event.target;
    let idToDelete = deleteBtn.id;

    removeTodo(idToDelete);
    saveTodos();
    render();
}
const removeTodo = idToDelete => {
    todos = todos.filter(function (todo) {
        if (todo.id === idToDelete) {
            return false;
        } else {
            return true;
        }
    });
}

/* View */
const render = () => {
    document.getElementById("todo-list").innerHTML = "";
    let i = 1;

    todos.forEach(todo => {
        console.log(i++)

        let todoList = document.getElementById("todo-list");
        let element = document.createElement("div");

        todoList.appendChild(element);

        element.className = "todo-div";

        let headerText = document.createElement("h5");
        element.append(headerText);
        headerText.innerHTML = todo.title + " - " + todo.dueDate;

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "btn btn-danger deleteBtn";
        deleteBtn.onclick = deleteTodo;
        deleteBtn.id = todo.id;
        element.appendChild(deleteBtn);
    });

    if(i > 5) {
        i = 0;
        return console.log("limited");
    } else {
        return console.log("add more");
    }
}
render();



