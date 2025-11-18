# Contexts Documentation

This directory contains the React Context providers that manage the global state of the application.

## 📂 Directory Structure

- **controls-context.js**: Manages the bottom control bar slots.
- **modal-context.js**: Manages the global modal system.
- **navigation-context.js**: Manages navigation state and interactions.
- **settings-context.js**: Manages user preferences (theme, etc.).
- **toast-context.js**: Manages toast notifications.

---

## 🧠 Contexts Analysis

### 1. Controls Context (`controls-context.js`)

This context enables a "portal-like" behavior where any component in the tree can inject content into the bottom control bar.

- **State**:
  - `leftControls`: React node(s) to display on the left.
  - `rightControls`: React node(s) to display on the right.
- **Usage**:
  - Use `useControlsContext()` to access `setControls`.
  - Typically used by page components to set context-specific actions (e.g., a "Save" button on a form page).

### 2. Modal Context (`modal-context.js`)

The backbone of the modal system. It decouples the trigger from the rendering.

- **State**:
  - `isOpen`: Boolean indicating visibility.
  - `modalType`: String identifier for the component to render.
  - `position`: 'center', 'top', 'bottom', 'left', 'right'.
  - `props`: Data passed to the modal component.
- **Key Functions**:
  - `openModal(type, position, props)`: Opens a modal.
  - `closeModal()`: Closes the current modal.
- **Integration**:
  - The `ModalProvider` renders the `<Modal />` component (from `@/components/modal`) at the root level, ensuring it sits above everything else.

### 3. Navigation Context (`navigation-context.js`)

Manages the state of the unique stack-based navigation system.

- **State**:
  - `expanded`: Boolean, whether the nav stack is expanded.
  - `searchQuery`: String, current search input in the nav (if applicable).
  - `dynamicNavItem`: Object, allows injecting a temporary nav item.
- **Usage**:
  - Used by the `Nav` component to control animations and visibility.
  - Used by pages to potentially modify navigation behavior.

### 4. Settings Context (`settings-context.js`)

Handles user preferences and persistence.

- **State**:
  - `theme`: 'light', 'dark', or 'system'.
  - `settings`: Object containing all settings.
- **Features**:
  - **Persistence**: Automatically saves/loads settings from `localStorage`.
  - **System Preference**: Detects and responds to OS-level theme changes when in 'system' mode.
  - **DOM Manipulation**: Updates the `<html>` class attribute to apply Tailwind dark mode classes.

### 5. Toast Context (`toast-context.js`)

Manages temporary notification messages.

- **State**:
  - `toasts`: Array of active toast objects `{ id, message, type, duration }`.
- **Key Functions**:
  - `showToast(message, type, duration)`: Adds a new toast.
  - `removeToast(id)`: Removes a specific toast.
- **Integration**:
  - The `ToastProvider` renders the `<ToastContainer />` (from `@/components/toast`) to display the notifications.
