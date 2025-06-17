# Fillout Frontend Challenge 🚀

Welcome to the Fillout Frontend implementation by Nyree Mompoint! This project showcases a dynamic page navigation bar with drag-and-drop reordering, a custom context menu, an icon picker, smooth animations, and full keyboard accessibility. It’s been built with React, TypeScript, and Tailwind CSS to deliver a polished, interactive user experience.

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

## 🗂️ Project Structure

```src/
├── components/
│   ├── ContextMenu.tsx       # Floating settings menu
│   ├── CustomNewPageInput.tsx# Modal to name page + pick icon
│   ├── Icons.tsx             # Centralized SVG Icon library
│   ├── PageNavigationBar.tsx # Main tab bar with + and drag/drop
│   ├── PageTab.tsx           # Individual tab component
│   └── __tests__             # Jest tests
├── types.ts                  # Shared TypeScript definitions
└── App.tsx                   # Root component tying everything 
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

* Exports an `Icon` component mapping string names to SVGs. All custom icons!
* Centralizes all icons: `info`, `details`, `other`, `ending`, `plus`, `document`, `rename`, `copy`, `duplicate`, `trash`, `options`.

---

## ⚙️ Coding Style & Conventions

* **ES6+**: Arrow functions, `const`/`let`, spread/rest.
* **Functional Components** with React Hooks (`useState`, `useEffect`, `useRef`, `useCallback`).
* **TypeScript**: Strict typing for props, state, and events.
* **Tailwind CSS**: Utility-first classes, custom animations via `transition-all`, hover/focus states.

---

## 🧪 Tests

We use Jest and React Testing Library to ensure:

 **Unit coverage** of all components, focusing on rendering, interactions, and accessibility attributes.
 **Accessibility** checks via role and aria-label queries.
 **Behavioral tests** for things like context menus, keyboard navigation, and modal focus trapping.

```------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------|---------|----------|---------|---------|-------------------
All files               |   92.63 |    69.44 |   94.54 |   92.34 |                   
ContextMenu.tsx         |   100   |    81.81 |   100   |   100   | 39,44,48          
CustomNewPageInput.tsx  |   82.97 |    56.25 |   100   |   82.6  | 43-51,74          
Icons.tsx               |   100   |   100    |   100   |   100   |                   
PageNavigationBar.tsx   |   95.74 |    71.66 |   92.59 |   95.55 | 97,103,223,263    
PageTab.tsx             |   83.33 |    85.71 |    75   |   83.33 | 80-81             
------------------------|---------|----------|---------|---------|-------------------
```

## ✨ The Small Things

While building and reviewing the design, we also caught a handful of fine details that really polish the UX:

**Dotted line** behind tabs for visual separation  
**Hover “+” icons** appearing between tabs for quick insertion  
**State styling** on tabs (selected vs. unselected) with smooth scale/translate transitions  
**Icon consistency**—size, spacing, and color adapt based on state   **Keyboard/ring focus** outlines to meet accessibility standards  

---

## 🍭 Fun Things Added

I added a few more fun items to the requirements

* Select the Icon for the new page
* Minor animations to the buttons on hover

---

## 🎈 About Me

My name is Nyree Mompoint, I am a mother of 6 and been a developer/designer for about 18 years! You can visit [my website](http://wwww.nyreem.com) or [my LinkedIn](http://wwww.linkedin.com/in/nyreem) to find out more about my work or me.

---

## 🙌 Thank You

Thank you for exploring this Fillout Frontend Challenge solution! I hope it demonstrates thoughtfulness in UX, accessibility, and code clarity. Feel free to reach out for any tweaks or to collaborate!

LGTM! 🚀
