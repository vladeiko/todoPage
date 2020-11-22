let currentID = 0;
let listElements = [];

// let listElement = {
//   text: "",
//   isCompleted: true,
//   id: 1,
// };

const listNode = document.querySelector(".todo-list");
const todoNameInput = document.querySelector(".main-form__input");

function createTodoElement({ id, text, isCompleted }) {
  return `
    <li class="list-element" id="${id}">
      <div class="todo-list__element">
        ${text}
        <button class="remove-button">X</button>
      </div>
    </li>
  `;
}

// function renderList() {
//   listNode.innerHTML = "";
//   listElements.forEach(
//     (e) =>
//       (listNode.innerHTML += `
//         `)
//   );
// }

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
    const li = event.target.parentNode.parentNode;
    listElements = listElements.filter((e) => e.id !== li.id);
    li.remove();
    console.log(listElements);
  }
});

document.querySelector(".main-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (todoNameInput.value) {
    addListElement(todoNameInput.value);
    todoNameInput.value = "";
  }
});
