// Factory function for creating Projects
export function createProject(name) {
  const id = crypto.randomUUID();
  const todos = [];

  return {
    id,
    name,
    todos,

    addTodo(todo) {
      this.todos.push(todo);
    },

    removeTodo(todoId) {
      const index = this.todos.findIndex((todo) => todo.id === todoId);
      if (index > -1) {
        this.todos.splice(index, 1);
      }
    },

    getTodo(todoId) {
      return this.todos.find((todo) => todo.id === todoId);
    },

    getAllTodos() {
      return this.todos;
    },

    toJSON() {
      return {
        id: this.id,
        name: this.name,
        todos: this.todos.map((todo) => todo.toJSON()),
      };
    },
  };
}

// Restore methods to project object after loading from localStorage
export function reviveProject(projectData) {
  const project = createProject(projectData.name);
  project.id = projectData.id;
  // Todos will be revived separately in storage.js
  return project;
}

// App state manager
class ProjectManager {
  constructor() {
    this.projects = [];
    this.currentProjectId = null;
  }

  addProject(project) {
    this.projects.push(project);
    if (this.projects.length === 1) {
      this.currentProjectId = project.id;
    }
  }

  removeProject(projectId) {
    const index = this.projects.findIndex((p) => p.id === projectId);
    if (index > -1) {
      this.projects.splice(index, 1);
      // If we deleted the current project, switch to the first available
      if (this.currentProjectId === projectId) {
        this.currentProjectId = this.projects[0]?.id || null;
      }
    }
  }

  getProject(projectId) {
    return this.projects.find((p) => p.id === projectId);
  }

  getCurrentProject() {
    return this.getProject(this.currentProjectId);
  }

  setCurrentProject(projectId) {
    this.currentProjectId = projectId;
  }

  getAllProjects() {
    return this.projects;
  }
}

// Export a single instance
export const projectManager = new ProjectManager();
