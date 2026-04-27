const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let li = document.createElement('li');
        li.className = 'task-item';
        
        if (task.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <div class="task-content-wrapper">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${i})">
                <span class="task-content">${task.text}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${i})">✏️</button>
                <button class="delete-btn" onclick="deleteTask(${i})">🗑️</button>
            </div>
        `;
        
        taskList.appendChild(li);
    }
}

function addTask() {
    let text = taskInput.value.trim();
    if (text === '') return;
    
    tasks.push({ text: text, completed: false });
    
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    let newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

renderTasks();
