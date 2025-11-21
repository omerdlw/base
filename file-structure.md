# Project File Structure Analysis

## Overview

This project is a highly modular Next.js application using the App Router architecture. It emphasizes a separation of concerns by dividing features into independent "Modules" (Nav, Modal, Toast, Controls) and reusable "UI Elements," managed via React Context providers.

## Directory Tree

├── app/ # Next.js App Router directory
│ ├── (views)/ # Route groups for specific pages
│ │ ├── placeholder/ # Example page 1 (Demonstrates Controls & Nav update)
│ │ ├── placeholder2/ # Example page 2
│ │ ├── placeholder3/ # Example page 3
│ │ └── template.js # Global page transition animations
│ ├── globals.css # Global styles and Tailwind directives
│ ├── layout.js # Root layout (Providers, Nav, Footer injection)
│ ├── not-found.js # Custom 404 page with 3D prism animation
│ ├── providers.js # Aggregates all Context Providers
│ └── error.js # (Implicit) Error handling components
│
├── components/ # Shared React components
│ ├── cdn/ # External/3D libraries (e.g., OGL Prism)
│ └── error-boundary/ # React Error Boundaries for app resilience
│
├── config/ # Project-wide configurations
│ └── constants.js # API endpoints, Z-indexes, Regex, etc.
│
├── contexts/ # Global application contexts
│ └── settings-context.js # User preferences and local storage management
│
├── fonts/ # Font configurations (Google Fonts via Next.js)
│ └── index.js # Exports for Montserrat, Poppins, DM Sans
│
├── hooks/ # Generic custom React hooks
│ └── use-click-outside.js # Detects clicks outside a referenced element
│
├── lib/ # Utilities and Libraries
│ ├── api/ # Advanced Fetch wrapper and hooks
│ ├── env.js # Environment variable validation
│ └── utils.js # Helper functions (CN, formatting, deep clone)
│
├── modules/ # Feature-specific Logic and UI
│ ├── controls/ # Bottom-bar dynamic action system
│ ├── footer/ # Footer component
│ ├── modal/ # Global Modal system
│ ├── nav/ # Dock-style Navigation system
│ └── toast/ # Notification/Toast system
│
├── services/ # Backend/External Services configuration
│ ├── firebase.js # Firebase initialization
│ └── mongodb.js # MongoDB connection pooling
│
├── ui/ # Reusable Design System
│ ├── elements/ # Atomic components (Button, Input, Selectbox, etc.)
│ ├── icon/ # Iconify wrapper component
│ ├── loadings/ # Loading screens and spinners
│ └── skeletons/ # Skeleton loading states
│
└── [Root Files] # Configuration files
├── .gitignore
├── env.local # Environment variables
├── eslint.config.cjs # Linting rules
├── jsconfig.json # Path aliases (@/\*)
├── next.config.mjs # Next.js config
├── package.json # Dependencies and scripts
├── postcss.config.mjs # CSS processing
└── tailwind.config.js # Tailwind styling configuration
