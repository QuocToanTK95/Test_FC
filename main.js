$(document).ready(function () {
  const newTaskInput = $("#new-task");
  const dueDate = $("#dueDate");
  const taskList = $("#task-list");

  function addTask() {
    if (newTaskInput.val() === "" || dueDate.val() === "") {
      alert("Please enter a task and a due date.");
    } else {
      const taskText = newTaskInput.val();
      if (taskText.trim() !== "") {
        const taskItem = $(
          '<li><span class="task-text">' +
            taskText +
            " - Due: " +
            dueDate.val() +
            '</span><button class="edit-button">Edit</button><button class="delete-button">Delete</button></li>'
        );

        // Trigger edit button
        taskItem.find(".edit-button").click(function () {
          const editText = $(this).siblings(".task-text").text();
          const editModal = $("#editModal");
          const editTaskInput = $("#editTaskInput");

          editTaskInput.val(editText);
          editModal.show();

          $("#confirmEdit")
            .off("click")
            .click(function () {
              const newText = editTaskInput.val();
              if (newText.trim() !== "") {
                const taskTextElement = taskItem.find(".task-text");
                taskTextElement.text(newText);
                editModal.hide();
                saveTasksToLocalStorage();
              }
            });

          $("#cancelEdit")
            .off("click")
            .click(function () {
              editModal.hide();
            });
        });

        // Trigger delete button
        taskItem.find(".delete-button").click(function () {
          const deleteItem = $(this).closest("li"); // Get the parent <li> element
          const taskText = deleteItem.find(".task-text").text();
          const deleteModal = $("#deleteModal");

          deleteModal
            .find(".modal-content p")
            .text(`Are you sure you want to delete task "${taskText}"?`);
          deleteModal.show();

          $("#confirmDelete")
            .off("click")
            .click(function () {
              deleteModal.hide();
              deleteItem.remove(); // Remove the task item
              saveTasksToLocalStorage();
            });

          $("#cancelDelete")
            .off("click")
            .click(function () {
              deleteModal.hide();
            });
        });

        taskList.append(taskItem);
        newTaskInput.val("");
        dueDate.val("");
        saveTasksToLocalStorage();
      }
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
