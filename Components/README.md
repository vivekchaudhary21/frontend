# React Components Practice

A collection of reusable React components built for learning, revision, and frontend interviews.

Each component lives in its own folder inside [`src/components`](./src/components). Every component folder contains a `README.md` that describes the problem, requirements, expected behavior, API, edge cases, and learning goals before explaining the implementation.

## Learning roadmap

Build the components in order. Each level introduces patterns used by the next one.

**Progress:** 0 of 26 components complete

> **Status:** `[ ]` Not started · `[x]` Complete
>
> Add **🚧 In progress** beside the component you are currently building.

### Level 1: Basics

_Learn component state, composition, events, and accessibility fundamentals._

- [ ] **[01 · Counter](./src/components/Counter/README.md)** — State, events, and disabled states · 🚧 In progress
- [ ] **02 · Todo List** — CRUD operations, list rendering, and controlled inputs
- [ ] **03 · Tabs** — Controlled/uncontrolled state, keyboard navigation, and ARIA roles
- [ ] **04 · Accordion** — Expand/collapse state and single/multiple open items
- [ ] **05 · Modal / Dialog** — Portals, focus trapping, Escape key, and backdrop clicks
- [ ] **06 · Tooltip / Popover** — Positioning, portals, hover/focus behavior, and dismissal

### Level 2: Forms and Inputs

_Learn input state, validation, keyboard interaction, and asynchronous behavior._

- [ ] **07 · Dropdown / Select** — Open/close state, keyboard navigation, and outside clicks
- [ ] **08 · Menu / Context Menu** — Focus management, positioning, and nested interactions
- [ ] **09 · Search Input with Debounce** — Debouncing, API request control, and cleanup
- [ ] **10 · Autocomplete / Typeahead** — Async search, UI states, and keyboard selection
- [ ] **11 · Form with Validation** — Errors, touched state, validation, and submission
- [ ] **12 · File Upload** — Validation, drag-and-drop, previews, progress, and cancellation
- [ ] **13 · Multi-Step Form** — Shared form state, validation per step, and navigation

### Level 3: Data UI

_Learn derived data, server communication, complex state, and large collections._

- [ ] **14 · Pagination** — Page state, API parameters, navigation, and disabled states
- [ ] **15 · Infinite Scroll** — Intersection Observer, incremental loading, and request deduplication
- [ ] **16 · Sortable Table** — Sort state, derived data, and stable UI
- [ ] **17 · Filterable Table** — Filters, search, derived lists, and reset behavior
- [ ] **18 · Data Table / Data Grid** — Sorting, filtering, pagination, and all major UI states
- [ ] **19 · Tree View** — Recursion, selection, expansion, and keyboard accessibility

> **Progressive project:** Build 16–18 on the same foundation. Add sorting first, filtering second, then combine everything into a reusable data grid.

### Level 4: Senior-Level Components

_Learn reusable architecture, performance, failure recovery, and real-time systems._

- [ ] **20 · Toast / Notification System** — Global state, queues, auto-dismissal, and timer cleanup
- [ ] **21 · Virtualized List** — Visible-window calculation and large-list performance
- [ ] **22 · Drag-and-Drop List** — Reordering, keyboard accessibility, and edge cases
- [ ] **23 · Command Palette** — Search, shortcuts, focus management, and composition
- [ ] **24 · Error Boundary** — Failure isolation, fallback UI, reporting, and recovery
- [ ] **25 · Real-Time Chat UI** — WebSocket/SSE updates, message state, and optimistic UI
- [ ] **26 · AI Streaming Chat UI** — Streaming text, cancellation, retry, and partial states

> **Shared foundation:** Components 25 and 26 should reuse the message list, composer, status indicator, and error-state components.

When you start a component, create its folder and make its name above a link to that folder's `README.md`.

## Project structure

```text
src/
├── components/
│   ├── ComponentName/
│   │   ├── README.md
│   │   ├── ComponentName.jsx
│   │   ├── styles.css          # when needed
│   │   └── components/         # optional child components
│   └── index.js                # public component exports
├── App.jsx                     # component demos
└── main.jsx
```

## Component documentation standard

Every component README should answer these questions:

1. What problem does the component solve?
2. What are its functional requirements?
3. What props does it accept?
4. What UI states and edge cases must it handle?
5. What accessibility and performance considerations apply?
6. Which React and JavaScript concepts does it demonstrate?
7. What improvements could be made in a production version?

Use the following implementation checklist for each component:

- [ ] Requirements are documented before implementation.
- [ ] The component has a small, clear public API.
- [ ] Loading, empty, error, and success states are handled where relevant.
- [ ] Keyboard use and accessible labels are supported.
- [ ] Expensive work and unnecessary renders are considered.
- [ ] Important behavior is covered by tests.
- [ ] The component is exported from `src/components/index.js`.
- [ ] A working example is available in `src/App.jsx`.

## Running the project

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm run lint
npm run build
```

## Learning workflow

For each component:

1. Read only its requirements and try to design the API yourself.
2. List the component state, derived values, and side effects.
3. Build the smallest working version.
4. Add accessibility, edge-case handling, and tests.
5. Measure before adding performance optimizations.
6. Compare your result with the documented implementation notes.
7. Practise explaining your decisions and trade-offs as if you were in an interview.
