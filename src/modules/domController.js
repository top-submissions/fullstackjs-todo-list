import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { projectManager, createProject } from './projectLogic.js';
import { createTodo } from './todoLogic.js';
import { saveToLocalStorage } from './storage.js';

// Cache DOM elements
const elements = {
  projectsList: document.getElementById('projectsList'),
  todosList: document.getElementById('todosList'),
  currentProjectTitle: document.getElementById('currentProjectTitle'),
  addProjectBtn: document.getElementById('addProjectBtn'),
  addTodoBtn: document.getElementById('addTodoBtn'),
  todoModal: document.getElementById('todoModal'),
  projectModal: document.getElementById('projectModal'),
  todoForm: document.getElementById('todoForm'),
  projectForm: document.getElementById('projectForm'),
};

let currentEditingTodoId = null;

// Initialize all event listeners
export function initializeEventListeners() {
  // Project button
  elements.addProjectBtn.addEventListener('click', openProjectModal);

  // Todo button
  elements.addTodoBtn.addEventListener('click', () => openTodoModal());

  // Project form
  elements.projectForm.addEventListener('submit', handleProjectSubmit);
  document
    .getElementById('cancelProjectBtn')
    .addEventListener('click', closeProjectModal);

  // Todo form
  elements.todoForm.addEventListener('submit', handleTodoSubmit);
  document
    .getElementById('cancelBtn')
    .addEventListener('click', closeTodoModal);

  // Close modals when clicking outside
  elements.todoModal.addEventListener('click', (e) => {
    if (e.target === elements.todoModal) closeTodoModal();
  });
  elements.projectModal.addEventListener('click', (e) => {
    if (e.target === elements.projectModal) closeProjectModal();
  });

  // Close buttons
  document.querySelectorAll('.close').forEach((btn) => {
    btn.addEventListener('click', function () {
      this.closest('.modal').classList.remove('show');
      this.closest('.modal').classList.add('hidden');
    });
  });
}

// Render all projects in sidebar
export function renderProjects() {
  elements.projectsList.innerHTML = '';
  const projects = projectManager.getAllProjects();

  projects.forEach((project) => {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-item';
    if (project.id === projectManager.currentProjectId) {
      projectDiv.classList.add('active');
    }

    const projectName = document.createElement('span');
    projectName.textContent = project.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-project';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (projects.length > 1) {
        projectManager.removeProject(project.id);
        saveToLocalStorage();
        renderProjects();
        renderTodos();
      } else {
        alert('Cannot delete the last project!');
      }
    });

    projectDiv.appendChild(projectName);
    projectDiv.appendChild(deleteBtn);

    projectDiv.addEventListener('click', () => {
      projectManager.setCurrentProject(project.id);
      saveToLocalStorage();
      renderProjects();
      renderTodos();
    });

    elements.projectsList.appendChild(projectDiv);
  });
}

// Render all todos for current project
export function renderTodos() {
  const currentProject = projectManager.getCurrentProject();
  if (!currentProject) return;

  elements.currentProjectTitle.textContent = currentProject.name;
  elements.todosList.innerHTML = '';

  const todos = currentProject.getAllTodos();

  if (todos.length === 0) {
    elements.todosList.innerHTML =
      '<div class="empty-state"><p>No todos yet. Click "Add Todo" to create one!</p></div>';
    return;
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.className = `todo-item priority-${todo.priority}`;
    if (todo.completed) {
      todoDiv.classList.add('completed');
    }

    // Todo info section
    const todoInfo = document.createElement('div');
    todoInfo.className = 'todo-info';

    const title = document.createElement('div');
    title.className = 'todo-title';
    title.textContent = todo.title;

    const meta = document.createElement('div');
    meta.className = 'todo-meta';

    const dueDateSpan = document.createElement('span');
    try {
      const dueDate = parseISO(todo.dueDate);
      dueDateSpan.textContent = `Due: ${format(
        dueDate,
        'MMM d, yyyy'
      )} (${formatDistanceToNow(dueDate, { addSuffix: true })})`;
    } catch {
      dueDateSpan.textContent = `Due: ${todo.dueDate}`;
    }

    const prioritySpan = document.createElement('span');
    prioritySpan.textContent = `Priority: ${todo.priority}`;

    meta.appendChild(dueDateSpan);
    meta.appendChild(prioritySpan);

    todoInfo.appendChild(title);
    todoInfo.appendChild(meta);

    // Todo actions section
    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'View/Edit';
    viewBtn.className = 'view-btn';
    viewBtn.addEventListener('click', () => openTodoModal(todo));

    const completeBtn = document.createElement('button');
    completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', () => {
      todo.toggleComplete();
      saveToLocalStorage();
      renderTodos();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      currentProject.removeTodo(todo.id);
      saveToLocalStorage();
      renderTodos();
    });

    actions.appendChild(viewBtn);
    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    todoDiv.appendChild(todoInfo);
    todoDiv.appendChild(actions);

    elements.todosList.appendChild(todoDiv);
  });
}

// Modal functions
function openProjectModal() {
  elements.projectForm.reset();
  elements.projectModal.classList.remove('hidden');
  elements.projectModal.classList.add('show');
}

function closeProjectModal() {
  elements.projectModal.classList.remove('show');
  elements.projectModal.classList.add('hidden');
}

function openTodoModal(todo = null) {
  elements.todoForm.reset();

  if (todo) {
    // Edit mode
    currentEditingTodoId = todo.id;
    document.getElementById('modalTitle').textContent = 'Edit Todo';
    document.getElementById('todoTitle').value = todo.title;
    document.getElementById('todoDescription').value = todo.description;
    document.getElementById('todoDueDate').value = todo.dueDate;
    document.getElementById('todoPriority').value = todo.priority;
    document.getElementById('todoNotes').value = todo.notes;
  } else {
    // Add mode
    currentEditingTodoId = null;
    document.getElementById('modalTitle').textContent = 'Add New Todo';
  }

  elements.todoModal.classList.remove('hidden');
  elements.todoModal.classList.add('show');
}

function closeTodoModal() {
  elements.todoModal.classList.remove('show');
  elements.todoModal.classList.add('hidden');
  currentEditingTodoId = null;
}

// Form handlers
function handleProjectSubmit(e) {
  e.preventDefault();

  const projectName = document.getElementById('projectName').value.trim();

  if (projectName) {
    const newProject = createProject(projectName);
    projectManager.addProject(newProject);
    saveToLocalStorage();
    renderProjects();
    closeProjectModal();
  }
}

function handleTodoSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('todoTitle').value.trim();
  const description = document.getElementById('todoDescription').value.trim();
  const dueDate = document.getElementById('todoDueDate').value;
  const priority = document.getElementById('todoPriority').value;
  const notes = document.getElementById('todoNotes').value.trim();

  const currentProject = projectManager.getCurrentProject();

  if (currentEditingTodoId) {
    // Edit existing todo
    const todo = currentProject.getTodo(currentEditingTodoId);
    if (todo) {
      todo.updateTodo(title, description, dueDate, priority, notes);
    }
  } else {
    // Create new todo
    const newTodo = createTodo(title, description, dueDate, priority, notes);
    currentProject.addTodo(newTodo);
  }

  saveToLocalStorage();
  renderTodos();
  closeTodoModal();
}

// Initial render
export function initialRender() {
  renderProjects();
  renderTodos();
}
