# Vulkan Flow

A modern Vue.js flow editor built with Vue Flow for creating node-based workflows. This project provides an intuitive
drag-and-drop interface for building complex node graphs with type-safe connections and loop detection.

## ✨ Features

- 🎯 **Drag & Drop Interface** - Intuitive node creation and positioning
- 🔗 **Type-Safe Connections** - Ensures compatible handle types are connected
- 🚫 **Loop Detection** - Prevents circular dependencies in your flow
- 💾 **Save/Restore** - Persist your workflows to localStorage
- 🎨 **Animated Edges** - Visual feedback with animated connections
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔧 **TypeScript Support** - Full type safety throughout the application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/KoMatrich/Vulkan-Flow.git
cd vulkan-flow

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Usage

### Creating Nodes

1. **Drag from Sidebar**: Drag any node type from the left sidebar onto the canvas
2. **Node Types Available**:
    - Input Node - Has outputs only
    - Default Node - Has both inputs and outputs
    - Output Node - Has inputs only

### Connecting Nodes

1. **Click and Drag**: Click on an output handle and drag to an input handle
2. **Type Matching**: Only compatible handle types can be connected
3. **Loop Prevention**: The system prevents creating circular dependencies

### Saving Your Work

- **Save**: Click the "Save" button to store your current flow
- **Restore**: Click "Restore" to load your previously saved flow

## 🏗️ Project Structure

```
src/
├── components/
│   ├── App.vue              # Main application component
│   ├── SideBar.vue          # Draggable node sidebar
│   ├── TypedNode.vue        # Custom node component
│   ├── TypedEdge.vue        # Custom edge component
│   └── DropzoneBackground.vue # Drop zone background
├── composables/
│   └── useDnD.ts            # Drag and drop functionality
├── utils/
│   └── initSetup.ts         # Initial nodes and edges setup
├── assets/
│   └── index.css            # Global styles
└── main.ts                  # Application entry point
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run lint:check   # Check linting without fixing
npm run format       # Format code (same as lint)
npm run format:check # Check formatting without fixing
npm run type-check   # Run TypeScript type checking

# Git Hooks
npm run prepare      # Set up Husky hooks (runs automatically after install)
```

### Code Style

This project uses:

- **ESLint** with @antfu/eslint-config for code linting and formatting
- **TypeScript** for type safety
- **Vue 3 Composition API** for reactive components
- **Husky** for Git hooks
- **lint-staged** for pre-commit formatting

#### Pre-commit Hooks

The project automatically formats and lints your code before each commit:

- **Formatting**: Automatically fixes code style issues
- **Linting**: Checks for code quality issues
- **Type Checking**: Validates TypeScript types

To bypass hooks (not recommended): `git commit --no-verify`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory based on [`.env.example`](.env.example).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Currently, all rights are reserved.

~~This project is licensed under the WIP License - see the `LICENSE` file for details.~~

## 🙏 Acknowledgments

- [Vue Flow](https://vueflow.dev/) - The core flow library
- [Vue.js](https://vuejs.org/) - The progressive JavaScript framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## 📞 Support

If you have any questions or need help, please:

- Check the [Vue Flow documentation](https://vueflow.dev/guide/)
- Open an issue on GitHub
