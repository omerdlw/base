# Project File Structure Analysis

## Overview
This project is a highly modular Next.js application using the App Router architecture. It functions as a "Base" foundation, emphasizing a separation of concerns. It features a **Dynamic Registry System** for extensibility, a **Centralized Theme Engine** for styling, and an **Event-Driven Architecture** for resilience.

## Directory Tree

├── app/                        # Next.js App Router directory
│   ├── (views)/                # Route groups for specific pages
│   │   ├── placeholder/        # Example page 1 (Demonstrates usePageConfig)
│   │   ├── placeholder2/       # Example page 2
│   │   ├── placeholder3/       # Example page 3
│   │   └── template.js         # Global page transition animations
│   ├── globals.css             # Global styles (Dynamic variables via ThemeProvider)
│   ├── layout.js               # Root layout (Providers, Nav, Footer injection)
│   ├── not-found.js            # Custom 404 page with 3D prism animation
│   ├── providers.js            # Aggregates all Context Providers & Global Listeners
│   └── error.js                # (Implicit) Error handling components
│
├── components/                 # Shared React components
│   ├── cdn/                    # External/3D libraries (e.g., OGL Prism)
│   ├── error-boundary/         # React Error Boundaries for app resilience
│   ├── listener/               # Global Event Listener (Handles API/Network events)
│   └── modals/                 # Project-specific modals (e.g., Settings)
│
├── config/                     # Project-wide configurations
│   ├── constants.js            # API endpoints, Z-indexes, Regex, etc.
│   └── theme.js                # Central Theme Config (Colors, Radius Presets)
│
├── contexts/                   # Global application contexts
│   ├── settings-context.js     # User preferences and local storage management
│   └── theme-context.js        # Injects CSS variables & manages theme state
│
├── fonts/                      # Font configurations (Google Fonts via Next.js)
│   └── index.js                # Exports for Montserrat, Poppins, DM Sans
│
├── hooks/                      # Generic custom React hooks
│   ├── use-click-outside.js    # Detects clicks outside a referenced element
│   └── use-page-config.js      # Unified hook for managing Nav & Controls per page
│
├── lib/                        # Utilities and Libraries
│   ├── api/                    # Advanced Fetch wrapper with Interceptors & Queue
│   ├── env.js                  # Environment variable validation
│   ├── events.js               # Global Event Emitter (Pub/Sub pattern)
│   └── utils.js                # Helper functions (CN, formatting, deep clone)
│
├── modules/                    # Feature-specific Logic (THE CORE BASE)
│   ├── controls/               # Bottom-bar dynamic action system
│   ├── footer/                 # Footer component
│   ├── modal/                  # Global Modal system (Registry aware)
│   ├── nav/                    # Dock-style Navigation system
│   ├── registry/               # Component Injection System (Plug-in Architecture)
│   └── toast/                  # Notification/Toast system (Memoized)
│
├── services/                   # Backend/External Services configuration
│   ├── firebase.js             # Firebase initialization
│   └── mongodb.js              # MongoDB connection pooling
│
├── ui/                         # Reusable Design System
│   ├── elements/               # Atomic components (Button, Input, ColorPicker, etc.)
│   ├── icon/                   # Iconify wrapper component
│   ├── loadings/               # Loading screens and spinners
│   └── skeletons/              # Skeleton loading states
│
└── [Root Files]                # Configuration files
    ├── .gitignore
    ├── env.local               # Environment variables
    ├── eslint.config.cjs       # Linting rules
    ├── jsconfig.json           # Path aliases (@/*)
    ├── next.config.mjs         # Next.js config
    ├── package.json            # Dependencies and scripts
    ├── postcss.config.mjs      # CSS processing
    └── tailwind.config.js      # Tailwind styling configuration