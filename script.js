const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addTaskBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    const due = dueDateInput.value;

    if (text === "") {
        alert("Enter a task!");
        return;
    }

    tasks.push({
        text: text,
        dueDate: due,
        completed: false
    });

    save();
    render();

    taskInput.value = "";
    dueDateInput.value = "";
});

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text + (task.dueDate ? " (Due: " + task.dueDate + ")" : "");

        if (task.completed) {
            span.classList.add("completed");
        }

        const btns = document.createElement("div");
        btns.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Done";
        completeBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            save();
            render();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            save();
            render();
        };

        btns.appendChild(completeBtn);
        btns.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(btns);

        taskList.appendChild(li);
    });
}

render();