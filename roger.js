document.getElementById('add-todo').addEventListener('click', function() {
    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const todoText = document.createElement('span');
    const newText = prompt('Neues ToDo eingeben');
    todoText.textContent = newText || 'Neues ToDo';
    todoItem.appendChild(todoText);

    const icons = document.createElement('div');
    icons.classList.add('icons');

    const editIcon = document.createElement('span');
    editIcon.textContent = '✏️';
    editIcon.classList.add('icon');
    editIcon.addEventListener('click', function() {
        const newText = prompt('Neuen Text eingeben');
        todoText.textContent = newText;
    });
    icons.appendChild(editIcon);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        todoText.style.textDecoration = this.checked ? 'line-through' : 'none';
    });
    icons.appendChild(checkbox);

    const deleteIcon = document.createElement('span');
    deleteIcon.textContent = '🗑️';
    deleteIcon.classList.add('icon');
    deleteIcon.addEventListener('click', function() {
        todoList.removeChild(todoItem);
    });
    icons.appendChild(deleteIcon);

    todoItem.appendChild(icons);
    todoList.appendChild(todoItem);
});