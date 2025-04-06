# Task Manager Setup Guide

This document provides detailed instructions for setting up the Task Manager project for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v8.x or higher)

You can check your current versions with:
```sh
node --version
npm --version
```

## Installation Steps

1. **Clone the repository**
   ```sh
   git clone <YOUR_REPO_URL>
   cd Task_Manager
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```
   This will install all dependencies listed in the package.json file.

3. **Start the development server**
   ```sh
   npm run dev
   ```
   This will start the Vite development server at http://localhost:8080.

## Project Structure

- `/src`: Main source code directory
  - `/components`: Reusable UI components
  - `/contexts`: React context providers
  - `/pages`: Application pages
  - `/lib`: Utility functions
  - `/utils`: Helper functions and hooks
  - `/assets`: Static assets like images and icons

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run build:dev`: Build for development
- `npm run lint`: Run ESLint to check code quality
- `npm run preview`: Preview the build locally

## Dependencies

The project relies on the following key dependencies:

### Main Dependencies

- React
- TypeScript
- React Router for navigation
- shadcn/ui components (based on Radix UI)
- Tailwind CSS for styling
- Recharts for data visualization
- React Hook Form for form handling
- Zod for validation

### Development Dependencies

- Vite for building and development
- ESLint for code linting
- TypeScript type definitions

## Troubleshooting

### Common Issues

1. **Node version incompatibility**
   
   Solution: Use nvm to install and switch to a compatible Node.js version:
   ```sh
   nvm install 18
   nvm use 18
   ```

2. **Port conflicts**
   
   If port 8080 is already in use, you can modify the port in `vite.config.ts`.

3. **Missing dependencies**
   
   If you encounter errors about missing dependencies, try:
   ```sh
   npm install --force
   ```

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/) 