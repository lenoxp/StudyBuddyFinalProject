const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on load
document.addEventListener("DOMContentLoaded", renderTasks);

// Add task
addTaskBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    const due = dueDateInput.value;

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        dueDate: due,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    dueDateInput.value = "";
});

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render UI
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent =
            task.text +
            (task.dueDate ? " (Due: " + task.dueDate + ")" : "");

        if (task.completed) {
            text.classList.add("completed");
        }

        const btns = document.createElement("div");
        btns.classList.add("task-buttons");

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        btns.appendChild(doneBtn);
        btns.appendChild(deleteBtn);

        li.appendChild(text);
        li.appendChild(btns);

        taskList.appendChild(li);
    });
}