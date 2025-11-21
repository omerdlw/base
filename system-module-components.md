# System & Component Documentation

## 1. Core Architecture (Providers)

The application wraps the root layout in a composite `AppProviders` component (`app/providers.js`). This uses a `reduceRight` pattern to neatly nest multiple context providers without "wrapper hell."
**Active Providers:**

- `NavigationProvider`: Manages nav state and dynamic items.
- `ControlsProvider`: Manages the dynamic bottom control bar.
- `SettingsProvider`: Persists user settings to LocalStorage.
- `ToastProvider`: Manages notification stacks.
- `ModalProvider`: Handles global modal overlays.

## 2. UI Library (`ui/elements`)

A set of highly reusable, accessible atomic components styled with Tailwind CSS.

- **Button:** Supports `loading` states (replacing icons with spinners), variants (`rounded`, `blurry`, `tinted`), and icon-only modes.
- **Input:** Features support for start-icons, error states, and blur effects.
- **Selectbox:** A complex custom dropdown component.
  - _Features:_ Search filtering, keyboard navigation (Arrow keys, Enter, Escape), virtualization support (implied logic), and dynamic positioning based on screen edges.
- **ToggleSwitch:** A controlled boolean input with animation.
- **IconWrapper:** A smart wrapper that handles Iconify icons, Image URLs, and loading spinners interchangeably. It includes retry logic for failed image loads.

## 3. Navigation Module (`modules/nav`)

A sophisticated navigation system resembling a macOS dock or dynamic stack.

- **Architecture:**
  - **Context:** Holds the state of the "Dynamic Nav Item" (a page-specific item added to the global nav).
  - **Updater (`DynamicNavUpdater`):** A component mounted inside specific pages (e.g., `app/(views)/placeholder/page.js`) that injects page-specific data into the global Navigation Context.
  - **Animation:** Uses `framer-motion` for expanding/collapsing the stack and animating the active state.
- **Key Features:**
  - Stack expands on click or hover.
  - Supports "Actions" (custom components rendered inside the nav item, like a search bar).
  - Handles routing via `useNavigation` hook.

## 4. Controls Module (`modules/controls`)

A "Teleportation" system that allows specific pages to render UI elements into a fixed bottom bar layout defined in the Root Layout.

- **Concept:** Similar to React Portals but managed via Context.
- **Usage:** A page calls `setControls({ left: <Component />, right: <Component /> })` inside a `useEffect`.
- **Visuals:** Fixed at the bottom of the screen (`Config.STYLES.CONTAINER`), supporting entry/exit animations via `AnimatePresence`.

## 5. Modal System (`modules/modal`)

A central manager for overlay dialogs.

- **Registry Pattern:** Modals are registered in `config.js` (e.g., `SETTINGS`). The `Modal` component dynamically renders the correct component based on the `modalType` in the context.
- **Positioning:** Supports multiple positions defined in `MODAL_POSITIONS` (Center, Bottom, Left Panel, Right Panel, Top).
- **Animation:** Dynamically calculates entrance/exit variants based on the chosen position (e.g., a Right Panel slides in from the right, a Center modal fades/scales up).

## 6. Toast System (`modules/toast`)

A notification stacking system.

- **Stacking Logic:** New toasts push older ones down/back.
- **Visuals:** Uses Z-index and Scale offsets (`config.js`) to create a 3D "stack of cards" effect.
- **Types:** predefined styles for SUCCESS, ERROR, WARNING, and INFO.

## 7. API & Utilities (`lib/`)

### API Client (`lib/api/client.js`)

A wrapper class around the native `fetch` API.

- **Interceptors:** Supports Request (config modification), Response (data parsing), and Error (logging/handling) interceptors.
- **Timeout:** Implements `AbortController` to handle request timeouts.
- **Retry Logic:** `withRetry` utility automatically retries failed requests (Network/Server errors) with exponential backoff.
- **Caching:** `ApiCache` class provides in-memory caching with Time-To-Live (TTL).

### Utilities (`lib/utils.js`)

- **Storage:** Safe wrappers for `localStorage` (checks for window object).
- **Data:** Deep cloning, debouncing, array grouping, and deduplication functions.
- **Styling:** `CN` utility (combines `clsx` and `tailwind-merge`) for dynamic class application.

## 8. 3D Integration (`components/cdn/prism.js`)

Renders a WebGL interactive Prism using the `ogl` library.

- **Features:** Mouse hover interaction (tilting), color shifting, and customizable shaders (GLSL included in the file).
- **Optimization:** Uses `ResizeObserver` and handles pixel ratio adjustments.

## 9. Backend Services (`services/`)

- **Firebase:** Initializes the Firebase app and exports the Realtime Database instance.
- **MongoDB:** Implements a Singleton pattern to maintain a cached database connection across hot-reloads in development to prevent connection exhaustion.
