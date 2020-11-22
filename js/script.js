let currentID = 0;
let listElements = [];
let displayListElems = [];

// let listElement = {
//   text: "",
//   isCompleted: true,
//   id: 1,
// };

const listNode = document.querySelector(".todo-list");
const todoNameInput = document.querySelector(".main-form__input");

function createTodoElement({ id, text, isCompleted }) {
  const div = document.createElement("div");
  div.innerHTML = `
    <li class="list-element not-completed" id="${id}">
      <div class="todo-list__element"> 
        <button class="check-button">✔</button>
          <span></span>
      </div>
      <button class="remove-button">❌</button>
    </li>
  `;
  div.querySelector("span").innerText = text;
  return div.innerHTML;
}

const filters = {
  all: (e) => true,
  completed: (e) => e.isCompleted,
  notCompleted: (e) => !e.isCompleted,
};

function renderList() {
  listNode.innerHTML = "";
  displayListElems
    .map(createTodoElement)
    .forEach((html) => (listNode.innerHTML += html));
}

function addListElement(text) {
  const newTodo = {
    text: text,
    isCompleted: false,
    id: `${currentID++}`,
  };

  listElements.unshift(newTodo);
  listNode.innerHTML = createTodoElement(newTodo) + listNode.innerHTML;
}

document.querySelector(".todo-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    const li = event.target.parentElement;
    listElements = listElements.filter((e) => e.id !== li.id);
    li.remove();
    // console.log(listElements);
  }

  if (event.target.classList.contains("check-button")) {
    const li = event.target.parentElement.parentElement;
    const currTodo = listElements.find((e) => (e.id = li.id));
    currTodo.isCompleted = !currTodo.isCompleted;
    li.classList.remove(currTodo.isCompleted ? "not-completed" : "completed");
    li.classList.add(currTodo.isCompleted ? "completed" : "not-completed");
  }
});

document.querySelector(".main-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (todoNameInput.value) {
    addListElement(todoNameInput.value);
    todoNameInput.value = "";
  }
});
