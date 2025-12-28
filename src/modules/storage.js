import {
  projectManager,
  createProject,
  reviveProject,
} from './projectLogic.js';
import { reviveTodo } from './todoLogic.js';

const STORAGE_KEY = 'todoAppData';

// Save all projects to localStorage
export function saveToLocalStorage() {
  try {
    const data = {
      projects: projectManager
        .getAllProjects()
        .map((project) => project.toJSON()),
      currentProjectId: projectManager.currentProjectId,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Load all projects from localStorage
export function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      // No data found, create default project
      initializeDefaultProject();
      return;
    }

    const parsedData = JSON.parse(data);

    if (!parsedData.projects || parsedData.projects.length === 0) {
      // Empty or invalid data, create default project
      initializeDefaultProject();
      return;
    }

    // Restore projects
    parsedData.projects.forEach((projectData) => {
      const project = reviveProject(projectData);

      // Restore todos with their methods
      if (projectData.todos && projectData.todos.length > 0) {
        projectData.todos.forEach((todoData) => {
          const todo = reviveTodo(todoData);
          project.addTodo(todo);
        });
      }

      projectManager.addProject(project);
    });

    // Restore current project
    if (parsedData.currentProjectId) {
      projectManager.setCurrentProject(parsedData.currentProjectId);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    // If there's an error, create default project
    initializeDefaultProject();
  }
}

// Initialize app with a default project
export function initializeDefaultProject() {
  const defaultProject = createProject('My Tasks');
  projectManager.addProject(defaultProject);
  projectManager.setCurrentProject(defaultProject.id);
  saveToLocalStorage();
}

// Clear all data (useful for testing/reset)
export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
