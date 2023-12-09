let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];

        function addTask(taskName) {
            taskArray.push({ name: taskName, isDone: false });
            saveAndRenderTasks();
        }

        function saveAndRenderTasks() {
            localStorage.setItem('tasks', JSON.stringify(taskArray));
            renderTasks();
        }

        function renderTasks() {
            let tasksHTML = '';
            taskArray.forEach((task, index) => {
                tasksHTML += `<li id="task-${index}" onclick="toggleComplete(${index})" class="${task.isDone ? 'completed' : ''}">
                                ${task.name}
                                <button onclick="updateTask(${index})">Update</button>
                                <button onclick="deleteTask(${index})">Delete</button>
                             </li>`;
            });

            document.getElementById('tasks-list').innerHTML = tasksHTML;
        }

        function toggleComplete(taskIndex) {
            taskArray[taskIndex].isDone = !taskArray[taskIndex].isDone;
            saveAndRenderTasks();
        }

        function updateTask(taskIndex) {
            let updatedTaskName = prompt('Enter updated task name:');
            if (updatedTaskName) {
                taskArray[taskIndex].name = updatedTaskName;
                saveAndRenderTasks();
            }
        }

        function deleteTask(taskIndex) {
            taskArray.splice(taskIndex, 1);
            saveAndRenderTasks();
        }

        document.getElementById('add-task-button').addEventListener('click', () => {
            let taskName = document.getElementById('task-name-input').value;
            if (taskName) {
                addTask(taskName);
                document.getElementById('task-name-input').value = '';
            }
        });

        renderTasks();