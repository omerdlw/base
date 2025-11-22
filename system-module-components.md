# System & Component Documentation

## 1. Core Architecture (Providers)
The application wraps the root layout in a composite `AppProviders` component (`app/providers.js`).
**Active Providers:**
- `ThemeProvider`: Injects dynamic CSS variables from `config/theme.js`.
- `RegistryProvider`: Manages dynamic component injection (Plug-in system).
- `NavigationProvider`: Manages nav state and dynamic items.
- `ControlsProvider`: Manages the dynamic bottom control bar.
- `SettingsProvider`: Persists user settings to LocalStorage.
- `ToastProvider`: Manages notification stacks.
- `ModalProvider`: Handles global modal overlays (Aware of Registry).
**Global Listeners:**
- `GlobalListener`: Subscribes to `lib/events.js` to handle API errors (401, 403, 500) and Network connectivity (Offline/Online) via Toasts.

## 2. Theme Engine (`config/theme.js` & `contexts/theme-context.js`)
A centralized styling engine that decouples design tokens from CSS files.
* **Config:** Defines color palettes and radius presets (Sharp, Smooth, Round).
* **Runtime Injection:** The provider reads the config and updates CSS variables (`--color-primary`, `--radius-primary`) in real-time.
* **Persistence:** Theme preferences are saved to `localStorage` with debouncing for performance.

## 3. Registry System (`modules/registry`)
A "Plug-in" architecture allowing project-specific components to be injected into the Base system without modifying the `modules/` directory.
* **RegistryInjector:** A helper component used in pages/layouts to register components (e.g., Modals) into the global context.
* **Workflow:** Page mounts -> Injects `CART_MODAL` -> Modal Module finds it in Registry -> Displays it.

## 4. UI Library (`ui/elements`)
Advanced atomic components adhering to the centralized design language.
* **ColorPicker:** A sophisticated, custom-built color selection tool.
    * *Features:* Saturation/Value box, Hue slider, Hex/RGB inputs.
    * *Smart Limits:* Prevents selecting overly bright whites (Max Luminance) or invisible blacks (Min Luminance) to ensure dark-mode compatibility.
* **Button:** Supports loading states, icons, and blurred variants.
* **Input/Selectbox:** Fully styled form elements with support for icons and keyboard navigation.

## 5. Resilience & API Layer (`lib/api` & `lib/events.js`)
The "Nervous System" of the application.
* **Event Bus:** `lib/events.js` implements a Pub/Sub pattern.
* **ApiClient:**
    * *Offline Queue:* Requests made while offline are queued and automatically replayed when the connection is restored.
    * *Event Emission:* Automatically emits events for 401, 403, 500, and Network errors instead of just throwing them.
* **Interceptors:** Handles request config and response parsing centrally.

## 6. Developer Experience (DX)
* **usePageConfig:** A unified hook (`hooks/use-page-config.js`) that manages page-specific Navigation and Control Bar settings. It uses Refs and cleanup functions to prevent infinite render loops.

## 7. Navigation Module (`modules/nav`)
A Dock-style navigation system.
* **Dynamic Updates:** Controlled via `usePageConfig`.
* **Actions:** Supports rendering custom interactive components (like Search Bars) inside the navigation item itself.

## 8. Controls Module (`modules/controls`)
A "Teleportation" system for the bottom action bar.
* **Usage:** Pages define `left` and `right` JSX elements via `usePageConfig`.
* **Animation:** Uses `AnimatePresence` for smooth transitions when switching pages.

## 9. Modal System (`modules/modal`)
A central manager for overlay dialogs.
* **Hybrid Lookup:** When `openModal(ID)` is called, it first checks the **Registry** (Dynamic). If not found, it checks the **Static Config** (Base).
* **Positioning:** Supports Center, Bottom, Side Panels, etc.

## 10. Toast System (`modules/toast`)
A notification stacking system.
* **Stability:** Hook is memoized to ensure referential stability and prevent render loops in consuming components.
* **Visuals:** 3D stacking effect with Z-index manipulation.