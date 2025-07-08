# Docker Dev Env for TS

# Running tests

This command builds a docker image with the code of this repository and runs the repository's tests

```sh
./build_docker.sh my_app
docker run -t my_app ./run_tests.sh
```

```sh
[+] Building 0.1s (10/10) FINISHED                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                           0.0s
 => => transferring dockerfile: 226B                                                                           0.0s
 => [internal] load metadata for docker.io/library/node:22.14.0-alpine3.21@sha256:9bef0ef1e268f60627da9ba7d76  0.0s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 154B                                                                              0.0s
 => [1/5] FROM docker.io/library/node:22.14.0-alpine3.21@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad0748  0.0s
 => [internal] load build context                                                                              0.0s
 => => transferring context: 1.07kB                                                                            0.0s
 => CACHED [2/5] WORKDIR /app                                                                                  0.0s
 => CACHED [3/5] COPY package.json package-lock.json .                                                         0.0s
 => CACHED [4/5] RUN npm install                                                                               0.0s
 => CACHED [5/5] COPY . .                                                                                      0.0s
 => exporting to image                                                                                         0.0s
 => => exporting layers                                                                                        0.0s
 => => writing image sha256:80007dbaeba9813527f4a4e663e6d773256f6e42f1b3c3fdf713fe45b4897c2f                   0.0s
 => => naming to docker.io/library/my_app                                                                      0.0s


> my-react-app@0.0.0 test
> vitest


 RUN  v3.1.1 /app

 ✓ src/App.test.tsx (2 tests) 176ms
 ✓ test/basic.test.ts (3 tests) 6ms
 ✓ test/suite.test.ts (3 tests) 7ms

 Test Files  3 passed (3)
      Tests  8 passed (8)
   Start at  22:08:27
   Duration  3.74s (transform 93ms, setup 361ms, collect 282ms, tests 190ms, environment 1.95s, prepare 392ms)
```

# Running a specific test

This example runs all tests matching the name "basic":

```sh
./build_docker.sh my_app
docker run -t my_app ./run_tests.sh basic
```


# Running a vite dev server

Run this command to enable hot reloading via docker.

```sh
./build_docker.sh my_app
docker run --network=host -v .:/app -it my_app npm exec vite dev --host
```

# Pomotask 🍅

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
git clone <your-repo-url>
cd pomotask
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
