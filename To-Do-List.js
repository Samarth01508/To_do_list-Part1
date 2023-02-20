const INCOMPLETE_TASK_LIST = document.getElementById("incomplete-tasks-list");
const COMPLETED_TASK_LIST = document.getElementById("completed-tasks-list");

function initApp() {
  initAddTaskButton();
  initTaskInput();
}

function initAddTaskButton() {
  var taskButton = document.getElementById("task-button");
  taskButton.addEventListener("click", function () {
    var input = document.getElementById("my-task");
    var taskName = input.value;
    pushTask(taskName);
    input.value="";
  });
}

function initTaskInput() {
  var input = document.getElementById("my-task");
  input.addEventListener("keypress", function (event) {
    var taskName = event.target.value;
    if (event.key === "Enter") {
      pushTask(taskName);
      event.target.value = "";
    }
  });
}

function pushTask(taskName){
  if (!taskName) {
    alert("Enter any task");
    return;
  } else {
    markTaskIncomplete(taskName);
  }
}

function markTaskIncomplete(taskName) {
  var taskElement = createTask(taskName);
  var completeButton = createStatusButton("Complete", taskName, taskElement);
  var removeButton = createRemoveButton(taskElement);
  taskElement.appendChild(completeButton);
  taskElement.appendChild(removeButton);
  INCOMPLETE_TASK_LIST.appendChild(taskElement);
  return;
}

function markTaskComplete(taskName) {
  var taskElement = createTask(taskName);
  var incompleteButton = createStatusButton(
    "Incomplete",
    taskName,
    taskElement
  );
  var removeButton = createRemoveButton(taskElement);
  taskElement.appendChild(incompleteButton);
  taskElement.appendChild(removeButton);
  COMPLETED_TASK_LIST.appendChild(taskElement);
  return;
}

function createTask(taskName) {
  var taskElement = document.createElement("li");
  taskElement.innerHTML = `<label>${taskName}</label>`;
  return taskElement;
}

function createRemoveButton(taskElement) {
  var removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";
  removeButton.addEventListener("click", function () {
    taskElement.remove();
  });
  return removeButton;
}

function createStatusButton(status, taskName, taskElement) {
  var statusButton = document.createElement("button");
  statusButton.innerHTML = status;
  statusButton.addEventListener("click", function () {
    if (status == "Incomplete") markTaskIncomplete(taskName);
    else if (status == "Complete") markTaskComplete(taskName);
    taskElement.remove();
  });
  return statusButton;
}

initApp();

