// Factory function for creating Todo items
export function createTodo(title, description, dueDate, priority, notes = '') {
  let completed = false;
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

  return {
    id,
    title,
    description,
    dueDate,
    priority,
    notes,
    completed,

    // Methods
    toggleComplete() {
      this.completed = !this.completed;
    },

    updateTodo(newTitle, newDescription, newDueDate, newPriority, newNotes) {
      this.title = newTitle;
      this.description = newDescription;
      this.dueDate = newDueDate;
      this.priority = newPriority;
      this.notes = newNotes;
    },

    toJSON() {
      return {
        id: this.id,
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        notes: this.notes,
        completed: this.completed,
      };
    },
  };
}

// Restore methods to todo object after loading from localStorage
export function reviveTodo(todoData) {
  const todo = createTodo(
    todoData.title,
    todoData.description,
    todoData.dueDate,
    todoData.priority,
    todoData.notes
  );
  todo.id = todoData.id;
  todo.completed = todoData.completed;
  return todo;
}
