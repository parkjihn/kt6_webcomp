
class TaskList extends HTMLElement {
    constructor() {
        super();
        this.tasks = [];
    }

    connectedCallback() {
        this.innerHTML = `
            <input type="text" class="task-input" placeholder="Добавьте новую задачу..." />
            <ul class="tasks"></ul>
        `;
        this.querySelector('.task-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.value.trim() !== '') {
                this.addTask(e.target.value);
                e.target.value = '';
            }
        });
        this.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (e.target.className === 'delete-button') {
                this.deleteTask(index);
            } else if (e.target.className === 'toggle-button') {
                this.toggleCompleted(index);
            } else if (e.target.className === 'edit-button') {
                this.editTask(index);
            }
        });
    }

    addTask(taskText) {
        const task = { text: taskText, completed: false };
        this.tasks.push(task);
        this.renderTask(task, this.tasks.length - 1);
    }

    renderTask(task, index) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-list-item';
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="toggle-button" data-index="${index}">${task.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}</button>
            <button class="edit-button" data-index="${index}">Изменить</button>
            <button class="delete-button" data-index="${index}">Удалить</button>
        `;
        this.querySelector('.tasks').appendChild(taskItem);
    }

    editTask(index) {
        const task = this.tasks[index];
        const newText = prompt('Изменить задачу:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText;
            this.querySelector('.tasks').children[index].querySelector('span').textContent = newText;
        }
    }

    toggleCompleted(index) {
        const task = this.tasks[index];
        task.completed = !task.completed;
        this.querySelector('.tasks').children[index].classList.toggle('completed');
        this.querySelector('.tasks').children[index].querySelector('.toggle-button').textContent = task.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное';
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.querySelector('.tasks').removeChild(this.querySelector('.tasks').children[index]);
    }
}

customElements.define('task-list', TaskList);
