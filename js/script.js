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

function updateElementsCounter() {
  const leftItemsCount = listElements.filter((e) => e.isCompleted == false)
    .length;
  // console.log(leftItemsCount);
  document.querySelector(
    ".filters__counter"
  ).innerText = `${leftItemsCount} items left`;
}

function createTodoElement({ id, text, isCompleted }) {
  let template;
  if (!isCompleted) {
    template = `
    <li class="list-element" id="${id}">
      <div class="todo-list__element not-completed"> 
        <button class="check-button">✔</button>
          <span>${text}</span>
      </div>
      <button class="remove-button">❌</button>
    </li>
  `;
  } else {
    template = `
    <li class="list-element" id="${id}">
      <div class="todo-list__element completed">
        <button class="check-button">✔</button>
        <span>${text}</span>
      </div>
      <button class="remove-button">❌</button>
    </li>`;
  }

  listNode.innerHTML = template + listNode.innerHTML;
}

const filters = {
  all: (e) => true,
  completed: (e) => e.isCompleted,
  notCompleted: (e) => !e.isCompleted,
};

function renderList(displayListElems) {
  listNode.innerHTML = "";
  displayListElems.forEach((e) => createTodoElement(e));
}

function addListElement(text) {
  const newTodo = {
    text: text,
    isCompleted: false,
    id: `${currentID++}`,
  };

  listElements.push(newTodo);
  createTodoElement(newTodo);
  // listNode.innerHTML = createTodoElement(newTodo) + listNode.innerHTML;
}

function removeElement(toDelete) {
  listElements = listElements.filter((e) => e.id !== toDelete.id);
  toDelete.remove();
}

function checkElement(toCheck) {
  const currTodo = listElements.find((e) => e.id === toCheck.id);
  currTodo.isCompleted = !currTodo.isCompleted;
  toCheck.firstElementChild.classList.remove(
    currTodo.isCompleted ? "not-completed" : "completed"
  );
  toCheck.firstElementChild.classList.add(
    currTodo.isCompleted ? "completed" : "not-completed"
  );
}

function delCompletedElems() {
  for (let i = 0; i < listElements.length; i++) {
    if (listElements[i].isCompleted) {
      listElements.splice(i, 1);
      i--;
    }
  }
}

document.querySelector(".todo-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-button")) {
    removeElement(e.target.parentElement);
    updateElementsCounter();
    // console.log(listElements);
  }

  if (e.target.classList.contains("check-button")) {
    checkElement(e.target.parentElement.parentElement);
    updateElementsCounter();
  }
});

document.querySelector(".main-form").addEventListener("submit", () => {
  if (todoNameInput.value) {
    addListElement(todoNameInput.value);
    todoNameInput.value = "";
    updateElementsCounter();
    // console.log(listElements);
  }
});

document.querySelector(".filters__show-all").addEventListener("click", () => {
  renderList(listElements);
});

document
  .querySelector(".filters__show-active")
  .addEventListener("click", () => {
    displayListElems = listElements.filter((e) => e.isCompleted !== true);
    renderList(displayListElems);
  });

document
  .querySelector(".filters__show-completed")
  .addEventListener("click", () => {
    displayListElems = listElements.filter((e) => e.isCompleted == true);
    renderList(displayListElems);
  });

document
  .querySelector(".filters__clear-completed")
  .addEventListener("click", () => {
    delCompletedElems();
    renderList(listElements);
  });
