# Task Manager Project

## Project Overview

A comprehensive task management application with multiple features:
- Dashboard with task overview and analytics
- Project management with status tracking
- Calendar integration for scheduling
- Finance tracking and budget management

## Installation

This project requires Node.js and npm. Follow these steps to get started:

```sh
# Clone the repository
git clone https://github.com/ShauryaSucksAtGames/Task_Manager
# Navigate to the project directory
cd Task_Manager

# Install dependencies
npm install

# Start the development server
npm run dev
```

After running these commands, the application will be available at `http://localhost:8080`.

## Project Structure

```
Task_Manager/
├── public/                  # Static assets
│   └── ...
├── src/                     # Source code
│   ├── assets/              # Images, fonts, and other static files
│   │   ├── ui/              # Base UI components from shadcn/ui
│   │   ├── layout/          # Layout components (Header, Footer, etc.)
│   │   ├── features/        # Feature-specific components
│   │   └── ...
│   ├── contexts/            # React context providers
│   │   ├── AuthContext.tsx  # Authentication context
│   │   └── ...
│   ├── pages/               # Application pages/routes
│   │   ├── Dashboard.tsx    # Dashboard page
│   │   ├── Projects.tsx     # Projects page
│   │   ├── Calendar.tsx     # Calendar page
│   │   ├── Finance.tsx      # Finance page
│   │   ├── Login.tsx        # Login/Registration page
│   │   └── ...
│   ├── lib/                 # Utility libraries and functions
│   │   ├── utils.ts         # General utility functions
│   │   └── ...
│   ├── utils/               # Helper functions and hooks
│   │   ├── animations.ts    # Animation utilities
│   │   └── ...
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Locked dependency versions (npm)
├── bun.lockb                # Locked dependency versions (Bun)
├── SETUP.md                 # Detailed setup instructions
├── requirements.md          # Project dependencies
└── README.md                # Project documentation
```

## Features

- **Dashboard**: View your tasks, projects, and upcoming deadlines at a glance
- **Projects**: Create and manage projects with detailed tracking
- **Calendar**: Schedule and organize your tasks on a calendar view
- **Finance**: Track expenses and manage budgets

## Data Storage

This application uses browser local storage to save your data. Here's what you should know:

### Managing Your Data

- **Viewing stored data**: You can inspect the application's stored data in your browser's developer tools:
  1. Open browser developer tools (F12 or right-click > Inspect)
  2. Navigate to Application > Storage > Local Storage
  3. Look for keys prefixed with `task-manager-`

- **Clearing data**: If you need to reset the application or clear your data:
  1. From the application: Navigate to Settings > Clear All Data
  2. Manually via browser: Open developer tools > Application > Local Storage > Right-click on the domain > Clear

- **Data backup**: To backup your data before clearing:
  1. Open browser developer tools
  2. Go to Application > Local Storage
  3. Right-click on the domain and select "Export"

- **Data limitations**: Local storage is limited to approximately 5MB per domain, so avoid storing large attachments

- **Privacy note**: Your data remains on your device and is not sent to any servers

### Data Persistence

- Data is tied to your browser and device
- Clearing browser data will erase application data
- Using incognito/private browsing will not save data between sessions

## Technologies

This project is built with:

- **React**: Frontend library for building user interfaces
- **TypeScript**: Strongly typed programming language
- **Vite**: Next-generation frontend tooling
- **shadcn/ui**: UI component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Routing library for React
- **Recharts**: Charting library for data visualization

## Package Management

This project supports two package managers:

- **npm**: The default Node.js package manager
  ```sh
  npm install
  npm run dev
  ```

- **Bun**: A faster JavaScript runtime and package manager
  ```sh
  bun install
  bun run dev
  ```

The presence of both `package-lock.json` and `bun.lockb` files allows you to choose either package manager based on your preference.

## Deployment

You can deploy this application using any hosting service that supports React applications, such as:

- Netlify
- Vercel
- GitHub Pages
- AWS Amplify

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
