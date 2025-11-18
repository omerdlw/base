# Components Documentation

This directory contains all the reusable UI components for the application. The components are organized by their specific domain or functionality.

## 📂 Directory Structure

- **controls/**: Components related to the bottom control bar (actions, buttons).
- **modal/**: The global modal system components.
- **nav/**: The main navigation system components.
- **shared/**: Generic, reusable UI elements (buttons, inputs, skeletons, etc.).
- **toast/**: Toast notification components.
- **error-boundary/**: Error handling components.
- **icon/**: Icon wrapper components.

---

## 🧩 Key Systems

### 1. Modal System (`/modal`)

The modal system is a global, context-driven mechanism for displaying overlays. It is designed to be flexible, supporting various positions (center, top, bottom, left, right) and dynamic content.

- **Architecture**:

  - **`Modal` Component (`index.js`)**: The main container that listens to the `ModalContext`. It handles the backdrop, positioning logic, and animation variants (using Framer Motion).
  - **`MODAL_COMPONENTS`**: A registry mapping `modalType` strings to actual React components.
  - **Context Integration**: It uses `useModal` to get the current state (`isOpen`, `modalType`, `data`, `position`).

- **Usage**:
  Modals are triggered via the `useModal` hook (see `hooks/README.md`). You don't render `<Modal />` manually in your pages; it's already included in the root layout.

### 2. Navigation System (`/nav`)

The navigation is a unique, stack-based UI that resides at the bottom center of the screen.

- **Architecture**:

  - **`Nav` Component (`index.js`)**: Manages the state of the navigation stack. It handles the "expanded" vs "collapsed" states and the interactions (hover, click).
  - **`Item` Component**: Represents a single navigation link. It handles its own animations and interactions.
  - **Context Integration**: Uses `useNavigation` to sync the active route and handle navigation actions.

- **Features**:
  - **Stack Effect**: Inactive items stack behind the active item.
  - **Expansion**: Clicking the stack expands it to show all navigation options.
  - **Action Integration**: Can display contextual actions (via `Controls`) related to the active page.

### 3. Controls System (`/controls`)

The controls system provides a way to render action buttons at the bottom left and right corners of the screen, often contextually based on the active page or component.

- **Architecture**:
  - **`Controls` Component (`index.js`)**: A fixed-position container at the bottom of the viewport.
  - **Slots**: It defines two slots: `leftControls` and `rightControls`.
  - **Context Integration**: Uses `useControlsContext` to receive the content for these slots. Pages or components can "teleport" buttons into these slots using the context.

### 4. Shared Elements (`/shared`)

This directory houses the building blocks of the application's UI.

- **`elements/`**: Atomic components like `Button`, `Input`, `Card`, etc.
- **`skeletons.js`**: Loading state placeholders.
- **`loadings.js`**: Spinner or loading indicators.

---

## 🎨 Styling & Animation

- **Tailwind CSS**: Used for all structural and utility styling.
- **Framer Motion**: Used heavily for complex animations (modals entering/exiting, navigation stack transitions).
- **Classnames/Clsx**: Used for conditional class application.
