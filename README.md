# TaskFlow - Modern Todo List Application

[![GitHub last commit](https://img.shields.io/github/last-commit/top-submissions/fullstackjs-todo-list)](https://github.com/top-submissions/fullstackjs-todo-list/commits)
[![GitHub issues](https://img.shields.io/github/issues/top-submissions/fullstackjs-todo-list)](https://github.com/top-submissions/fullstackjs-todo-list/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/top-submissions/fullstackjs-todo-list)](https://github.com/top-submissions/fullstackjs-todo-list/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, feature-rich todo list application built as part of The Odin Project's Full Stack JavaScript curriculum. This project demonstrates mastery of ES6 modules, webpack bundling, factory functions, and local storage persistence.

## ✨ Features

- 📁 **Project Management**: Organize todos into multiple projects
- ✅ **Full CRUD Operations**: Create, read, update, and delete todos
- 🎯 **Priority Levels**: Categorize tasks as low, medium, or high priority
- 📅 **Due Date Tracking**: Set and track due dates with relative time display
- 💾 **Local Storage**: Automatic data persistence across sessions
- 🎨 **Modern UI/UX**: Beautiful gradient design with smooth animations
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Performance Optimized**: Fast loading and smooth interactions
- 🔄 **Real-time Updates**: Instant UI updates without page refresh

## 🚀 Live Demo

Visit the live application: [TaskFlow Demo](https://top-submissions.github.io/fullstackjs-todo-list/)

## 🛠️ Built With

### Core Technologies

- **Vanilla JavaScript (ES6+)**: Modern JavaScript features and syntax
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations

### Build Tools

- **Webpack 5**: Module bundling and asset management
- **webpack-dev-server**: Development server with hot reload
- **webpack-merge**: Configuration management for dev/prod environments

### Dependencies

- **date-fns**: Modern date utility library for formatting and manipulation

### Development Tools

- **html-webpack-plugin**: Automatic HTML generation
- **css-loader**: CSS module processing
- **style-loader**: Style injection
- **html-loader**: HTML asset handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- A modern web browser
- Git for version control

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/top-submissions/fullstackjs-todo-list.git
   cd fullstackjs-todo-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The application will open automatically at `http://localhost:8080`

## 📦 Available Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
npm run watch        # Watch mode - rebuilds on file changes
```

### Production

```bash
npm run build        # Create optimized production build
npm run build:dev    # Create development build for debugging
```

## 🏗️ Project Structure

```
fullstackjs-todo-list/
├── dist/                      # Compiled output (auto-generated)
├── docs/                      # Project documentation
├── src/
│   ├── modules/
│   │   ├── todoLogic.js      # Todo factory functions and methods
│   │   ├── projectLogic.js   # Project management and state
│   │   ├── storage.js        # LocalStorage persistence layer
│   │   └── domController.js  # DOM manipulation and UI updates
│   ├── styles.css            # Global styles and animations
│   ├── template.html         # HTML template
│   └── index.js              # Application entry point
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── webpack.common.js          # Shared webpack configuration
├── webpack.dev.js             # Development webpack configuration
└── webpack.prod.js            # Production webpack configuration
```

## 🎯 Core Concepts

### Factory Functions

The application uses factory functions for creating todos and projects, demonstrating object-oriented programming principles without classes:

```javascript
// Example: Creating a todo
const todo = createTodo(
  "Complete project", 
  "Finish the todo list app", 
  "2025-01-15", 
  "high"
);
```

### Module Pattern

Logic is separated into distinct modules:

- **todoLogic.js**: Business logic for individual todos
- **projectLogic.js**: Project management and app state
- **storage.js**: Data persistence using localStorage
- **domController.js**: UI rendering and event handling

### Local Storage Persistence

All data is automatically saved to localStorage:

- Survives browser refreshes and closures
- JSON serialization with method restoration
- Graceful handling of missing or corrupted data

## 💡 Usage

### Creating a Project

1. Click "New Project" in the sidebar
2. Enter a project name
3. Click "Create"

### Adding a Todo

1. Select a project from the sidebar
2. Click "Add Task" button
3. Fill in the todo details:
   - Title (required)
   - Description
   - Due date (required)
   - Priority level
   - Additional notes
4. Click "Save Task"

### Managing Todos

- **View/Edit**: Click the "View/Edit" button to modify todo details
- **Complete**: Mark todos as complete with the "Complete" button
- **Delete**: Remove todos with the "Delete" button

### Managing Projects

- **Switch Projects**: Click on any project in the sidebar
- **Delete Project**: Click the "Delete" button next to a project (requires at least 2 projects)

## 🎨 Design Philosophy

The application features a modern, professional design inspired by contemporary web applications:

- **Gradient Backgrounds**: Beautiful purple gradient backdrop
- **Glass Morphism**: Subtle transparency effects
- **Smooth Animations**: Polished transitions and hover effects
- **Visual Hierarchy**: Clear information architecture
- **Color-Coded Priorities**: Instant visual feedback
- **Responsive Layout**: Adapts to any screen size

## ⚡ Performance

The application is optimized for performance:

- Minimal JavaScript bundle size
- Efficient DOM updates
- CSS animations using GPU acceleration
- Lazy loading where applicable
- Optimized asset delivery

## 🔒 Data Storage

Data is stored locally in your browser using the Web Storage API:

- **Location**: `localStorage` under key `todoAppData`
- **Format**: JSON serialized objects
- **Privacy**: Data never leaves your device
- **Inspection**: View in DevTools → Application → Local Storage

## 🧪 Testing

The application can be tested manually:

1. Create multiple projects
2. Add todos with various priorities
3. Edit and complete todos
4. Delete todos and projects
5. Refresh the page to verify persistence
6. Test on different screen sizes

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

### The Odin Project Requirements

This project fulfills the following requirements:

- ✅ Factory functions for todos
- ✅ Separate application logic from DOM
- ✅ Multiple projects/lists
- ✅ Full CRUD operations
- ✅ LocalStorage persistence
- ✅ Webpack module bundling
- ✅ Date handling with external library
- ✅ Modern UI with priority indicators

### Future Enhancements

- [ ] Drag and drop todo reordering
- [ ] Todo search and filtering
- [ ] Export/import data functionality
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Todo subtasks/checklists
- [ ] Calendar view
- [ ] Task reminders

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) - Comprehensive web development curriculum
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library
- [Webpack](https://webpack.js.org/) - Module bundler
- Design inspiration from modern productivity apps

## 👤 Author

**MatimotTheTimoters**

- GitHub: [@MatimotTheTimoters](https://github.com/MatimotTheTimoters)
- Repository: [top-submissions/fullstackjs-todo-list](https://github.com/top-submissions/fullstackjs-todo-list)

## 📞 Support

If you encounter any issues or have questions:

- Open an [issue](https://github.com/top-submissions/fullstackjs-todo-list/issues)
- Check existing [documentation](./docs)
- Review the code comments

---

**Made with ❤️ as part of The Odin Project curriculum**
