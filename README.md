# Habits App

A modern, mobile-first habit tracking application built with Vue 3 and Vite. Track your daily habits, monitor progress, and build consistent routines.

## Features

- 📱 Mobile-first responsive design
- 📅 Weekly habit tracking
- ✅ Mark habits as complete/incomplete
- ⏸️ Pause/resume habits
- 🗑️ Delete habits with confirmation
- 📊 View past habits and progress
- 🚫 Prevention of future date entries
- 💾 Local storage persistence

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/EveSatke/habits-app.git
cd habits-app
```

2. Install dependencies:

```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run stylelint` - Run StyleLint for CSS

## Tech Stack

- [Vue 3](https://vuejs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Pinia](https://pinia.vuejs.org/) - State management
- [Vue Router](https://router.vuejs.org/) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Headless UI](https://headlessui.dev/) - UI components
- [Hero Icons](https://heroicons.com/) - Icons
- [date-fns](https://date-fns.org/) - Date utilities

## Project Structure

habits-app/
├── src/
│ ├── assets/ # Static assets
│ ├── components/ # Vue components
│ ├── composables/ # Vue composables
│ ├── router/ # Vue Router configuration
│ ├── stores/ # Pinia stores
│ ├── views/ # Page components
│ ├── App.vue # Root component
│ └── main.js # Application entry point
├── public/ # Public static assets
└── index.html # HTML entry point
