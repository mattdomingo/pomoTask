# Pomotask

A modern, minimalist Pomodoro timer application built with React, TypeScript, and Vite. Track your productivity with the classic 25-minute focus sessions and 5-minute breaks, while managing your daily tasks.

## Features

- **Classic Pomodoro Timer**: 25-minute focus sessions with 5-minute breaks
- **Task Management**: Create, complete, and track daily tasks
- **Shared State**: All components stay synchronized with real-time timer updates
- **Daily Statistics**: Track completed Pomodoros and tasks
- **Responsive Design**: Clean, modern interface that works on all devices
- **Local Storage**: Your tasks persist between sessions

## Demo

The timer displays the current phase (FOCUS/BREAK), remaining time, and provides simple controls to start, pause, and reset. The stats panel shows your daily progress with completed Pomodoros and tasks.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mattdomingo/pomoTask.git
cd pomoTask
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run test suite
- `npm run lint` - Lint code with ESLint
- `npm run test:docker` - Run tests in Docker container
- `npm run docker:build` - Build Docker image

## Usage

1. **Start a Pomodoro**: Click the "Start" button to begin a 25-minute focus session
2. **Manage Tasks**: Add tasks you want to complete during your Pomodoro sessions
3. **Take Breaks**: When the timer completes, you'll automatically enter a 5-minute break
4. **Track Progress**: Monitor your daily stats in the stats panel

## Architecture

The application uses a shared state architecture where:

- **Timer State**: Managed in a central context (`AppState`) shared across all components
- **Pure Functions**: Timer logic is implemented as pure functions for easy testing
- **Component Architecture**: Modular components for timer display, task management, and statistics

### Key Components

- `TimerDisplay`: Shows current timer and controls
- `TaskList`: Manages daily tasks
- `StatsPanel`: Displays productivity statistics
- `SettingsModal`: Configuration options

## Testing

The project includes comprehensive tests for:

- Timer logic and state management
- Component interactions
- Task management functionality

Run tests with:
```bash
npm test
```

## Docker Support

For containerized development and deployment:

```bash
# Build the Docker image
npm run docker:build

# Run tests in container
docker run --rm pomotask ./scripts/test.sh

# Development with hot reload
docker run --network=host -v $(pwd):/app -it pomotask npm exec vite dev --host
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## Project Structure

```
src/
├── components/          # React components
│   ├── TimerDisplay.tsx
│   ├── TaskList.tsx
│   ├── StatsPanel.tsx
│   └── SettingsModal.tsx
├── context/            # React context providers
│   └── AppState.tsx
├── hooks/              # Custom React hooks
│   └── useTimer.ts
├── utils/              # Utility functions
│   └── storage.ts
└── App.tsx            # Main application component

docker/                 # Docker configuration
├── Dockerfile
└── build.sh           # Docker build script

scripts/               # Utility scripts
└── test.sh           # Test runner script
```

## Acknowledgments

- Based on the Pomodoro Technique® developed by Francesco Cirillo
- Built with modern React patterns and TypeScript for type safety
- Powered by Vite for fast development experience
