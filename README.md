# Fillout Frontend Challenge 🚀

Welcome to the Fillout Frontend implementation! This project showcases a dynamic page navigation bar with drag-and-drop reordering, a custom context menu, an icon picker, smooth animations, and full keyboard accessibility. It’s been built with React, TypeScript, and Tailwind CSS to deliver a polished, interactive user experience.

---

## 🎯 Features

* **Custom Page Navigation**: Quickly switch between pages with a clean tabbed interface.
* **Drag & Drop Reordering**: Reorder tabs with intuitive drag-and-drop, complete with visual cues.
* **Context Menu**: Right-click (or keyboard menu key) on a tab to reveal actions—Rename, Duplicate, Copy, Delete, or Set as First Page.
* **New Page Modal**: Add new pages at any position, name them, and choose from a preset icon library.
* **Icon Picker**: Select from predefined icons when creating a page, with live preview and selection state.
* **Accessible & Keyboard-Friendly**: Full focus management, ARIA roles, and keyboard navigation (Tab, Enter, Escape, Arrow keys).
* **Tailwind Animations**: Subtle hover lifts, contextual transitions, and responsive styling.

---

## 📦 Installation & Setup

1. **Clone the repo**:

   ```bash
   git clone https://github.com/graphicallychallenged/fillout-front-end.git
   cd fillout-front-end
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run in development**:

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Build for production**:

   ```bash
   npm run build
   # or
   yarn build
   ```

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ContextMenu.tsx       # Floating settings menu
│   ├── CustomNewPageInput.tsx# Modal to name page + pick icon
│   ├── Icons.tsx             # Centralized SVG Icon library
│   ├── PageNavigationBar.tsx # Main tab bar with + and drag/drop
│   └── PageTab.tsx           # Individual tab component
├── types.ts                  # Shared TypeScript definitions
└── App.tsx                   # Root component tying everything together
```

---

## 🧩 Component Overview

### `PageNavigationBar`

* Renders the horizontal tab list (role="tablist").
* Manages hover states, + buttons between tabs, and final “Add page” button.
* Handles drag events (`onDragStart`, `onDragOver`, `onDrop`, `onDragLeave`, `onDragEnd`) to reorder pages.
* Opens the `CustomNewPageInput` modal and positions the `ContextMenu`.

### `PageTab`

* Represents a single tab (role="tab").
* Applies styling for active/inactive states, hover animations, focus ring.
* Displays the selected page icon (orange when active).
* Contains an options button to open the `ContextMenu`.

### `ContextMenu`

* Portal-styles an absolutely positioned menu above or below a tab.
* Keyboard navigable (ArrowUp/ArrowDown/Escape).
* Actions: Set as First Page, Rename, Copy, Duplicate, Delete.

### `CustomNewPageInput`

* Centered modal overlay to name a new page.
* Includes an icon picker grid (preset icons from `Icons.tsx`).
* Form submits on **Enter** or **Create Page** click; **Escape** or **Cancel** closes.
* Traps focus within the modal for accessibility.

### `Icons`

* Exports an `Icon` component mapping string names to SVGs.
* Centralizes all icons: `info`, `details`, `other`, `ending`, `plus`, `document`, `rename`, `copy`, `duplicate`, `trash`, `options`.

---

## ⚙️ Coding Style & Conventions

* **ES6+**: Arrow functions, `const`/`let`, spread/rest.
* **Functional Components** with React Hooks (`useState`, `useEffect`, `useRef`, `useCallback`).
* **TypeScript**: Strict typing for props, state, and events.
* **Tailwind CSS**: Utility-first classes, custom animations via `transition-all`, hover/focus states.

---

## ✨ Getting Creative

This codebase is a foundation you can adapt:

* Swap out the icon set in `Icons.tsx`.
* Adjust spacing, shadows, or color palette in Tailwind config.
* Extend the context menu actions or modal fields.
* Integrate persistence (e.g., local storage or API) for pages.

---

## 🙌 Thank You

Thank you for exploring this Fillout Frontend Challenge solution! I hope it demonstrates thoughtfulness in UX, accessibility, and code clarity. Feel free to reach out for any tweaks or to collaborate!

LGTM! 🚀
