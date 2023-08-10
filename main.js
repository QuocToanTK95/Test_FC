$(document).ready(function () {
  const newTaskInput = $("#new-task");
  const taskList = $("#task-list");

  function addTask() {
    const taskText = newTaskInput.val();
    if (taskText.trim() !== "") {
      const taskItem = $(
        '<li><span class="task-text">' +
          taskText +
          '</span><button class="edit-button">Edit</button><button class="delete-button">Delete</button></li>'
      );

      //   Trigger edit button
      taskItem.find(".edit-button").click(function () {
        const editText = $(this).siblings(".task-text");
        const newText = prompt("Edit task:", editText.text());
        if (newText !== null && newText.trim() !== "") {
          editText.text(newText);
          saveTasksToLocalStorage();
        }
      });

      //   Trigger delete button
      taskItem.find(".delete-button").click(function () {
        const taskText = $(this).siblings(".task-text").text();
        const shouldDelete = confirm(
          `Are you sure you want to delete task "${taskText}"?`
        );
        if (shouldDelete) {
          $(this).parent().remove();
          saveTasksToLocalStorage();
        }
      });

      taskList.append(taskItem);
      newTaskInput.val("");
      saveTasksToLocalStorage();
    }
  }

  // Trigger add task button
  $("#add-task").click(addTask);
  newTaskInput.keypress(function (event) {
    if (event.which === 13) {
      addTask();
    }
  });

  // Function to save tasks to Local Storage
  function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.find("li").each(function () {
      tasks.push($(this).find(".task-text").text());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from Local Storage
  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(function (taskText) {
      const taskItem = $(
        '<li><span class="task-text">' +
          taskText +
          '</span><button class="edit-button">Edit</button><button class="delete-button">Delete</button></li>'
      );
      taskList.append(taskItem);
    });
  }

  // Load saved tasks on page load
  loadTasksFromLocalStorage();
});
