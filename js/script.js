let currentID = 0;
let currentFilter = "All";
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
    <label class="todo-label" for="check-${id}">
      <li class="list-element" id="${id}">
        <div class="todo-list__element not-completed"> 
          <input class="check-button" id="check-${id}" type="checkbox"></input>
            <span>${text}</span>
        </div>
        <button class="remove-button">❌</button>
     </li>
    </label>
  `;
  } else {
    template = `
    <label class="todo-label" for="check-${id}">
      <li class="list-element" id="${id}">
        <div class="todo-list__element completed"> 
          <input class="check-button" id="check-${id}" type="checkbox" checked></input>
            <span>${text}</span>
        </div>
        <button class="remove-button">❌</button>
      </li>
    </label>
  `;
  }

  listNode.innerHTML = template + listNode.innerHTML;
}

function renderList(filter) {
  listNode.innerHTML = "";

  if (filter === "All") displayListElems = listElements;

  if (filter === "Active")
    displayListElems = listElements.filter((e) => e.isCompleted !== true);

  if (filter === "Completed")
    displayListElems = listElements.filter((e) => e.isCompleted == true);

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
  for (let i = 0; i < listElements.length; i++) {
    if (listElements[i].id == toDelete.id) {
      listElements.splice(i, 1);
      return;
    }
  }
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
    renderList(currentFilter);
    // console.log(listElements);
  }

  if (e.target.classList.contains("check-button")) {
    checkElement(e.target.parentElement.parentElement);
    updateElementsCounter();
    renderList(currentFilter);
  }
});

document.querySelector(".main-form").addEventListener("submit", () => {
  if (todoNameInput.value) {
    addListElement(todoNameInput.value);
    todoNameInput.value = "";
    updateElementsCounter();
    renderList(currentFilter);
    // console.log(listElements);
  }
});

document.querySelector(".filters__show-all").addEventListener("click", () => {
  currentFilter = "All";
  renderList(currentFilter);
});

document
  .querySelector(".filters__show-active")
  .addEventListener("click", () => {
    currentFilter = "Active";
    renderList(currentFilter);
  });

document
  .querySelector(".filters__show-completed")
  .addEventListener("click", () => {
    currentFilter = "Completed";
    renderList(currentFilter);
  });

document
  .querySelector(".filters__clear-completed")
  .addEventListener("click", () => {
    delCompletedElems();
    renderList(currentFilter);
  });
