// Import CSS
import './styles.css';

// Import modules
import { loadFromLocalStorage } from './modules/storage.js';
import {
  initializeEventListeners,
  initialRender,
} from './modules/domController.js';

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load data from localStorage
  loadFromLocalStorage();

  // Set up event listeners
  initializeEventListeners();

  // Render initial UI
  initialRender();

  console.log('Todo App initialized successfully!');
});
