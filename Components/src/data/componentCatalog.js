export const componentLevels = [
  {
    id: 'basics',
    number: 1,
    title: 'Basics',
    description: 'State, composition, events, and accessibility fundamentals.',
    components: [
      { number: 1, name: 'Counter', slug: 'counter', focus: 'State, events, and disabled states' },
      { number: 2, name: 'Todo List', slug: 'todo-list', focus: 'CRUD, list rendering, and controlled inputs' },
      { number: 3, name: 'Tabs', slug: 'tabs', focus: 'Controlled state, keyboard navigation, and ARIA roles' },
      { number: 4, name: 'Accordion', slug: 'accordion', focus: 'Expand/collapse state and open-item strategies' },
      { number: 5, name: 'Modal / Dialog', slug: 'modal-dialog', focus: 'Portals, focus trapping, and dismissal' },
      { number: 6, name: 'Tooltip / Popover', slug: 'tooltip-popover', focus: 'Positioning, portals, focus, and dismissal' },
    ],
  },
  {
    id: 'forms-inputs',
    number: 2,
    title: 'Forms & Inputs',
    description: 'Input state, validation, keyboard interaction, and asynchronous behavior.',
    components: [
      { number: 7, name: 'Dropdown / Select', slug: 'dropdown-select', focus: 'Open state, keyboard navigation, and outside clicks' },
      { number: 8, name: 'Menu / Context Menu', slug: 'menu-context-menu', focus: 'Focus management, positioning, and nested interactions' },
      { number: 9, name: 'Debounced Search', slug: 'debounced-search', focus: 'Debouncing, request control, and cleanup' },
      { number: 10, name: 'Autocomplete', slug: 'autocomplete', focus: 'Async search, UI states, and keyboard selection' },
      { number: 11, name: 'Form Validation', slug: 'form-validation', focus: 'Errors, touched state, validation, and submission' },
      { number: 12, name: 'File Upload', slug: 'file-upload', focus: 'Validation, previews, progress, and cancellation' },
      { number: 13, name: 'Multi-Step Form', slug: 'multi-step-form', focus: 'Shared state, per-step validation, and navigation' },
    ],
  },
  {
    id: 'data-ui',
    number: 3,
    title: 'Data UI',
    description: 'Derived data, server communication, complex state, and large collections.',
    components: [
      { number: 14, name: 'Pagination', slug: 'pagination', focus: 'Page state, API parameters, and navigation' },
      { number: 15, name: 'Infinite Scroll', slug: 'infinite-scroll', focus: 'Intersection Observer and request deduplication' },
      { number: 16, name: 'Sortable Table', slug: 'sortable-table', focus: 'Sort state, derived data, and stable UI' },
      { number: 17, name: 'Filterable Table', slug: 'filterable-table', focus: 'Filters, search, derived lists, and reset behavior' },
      { number: 18, name: 'Data Grid', slug: 'data-grid', focus: 'Sorting, filtering, pagination, and UI states' },
      { number: 19, name: 'Tree View', slug: 'tree-view', focus: 'Recursion, selection, expansion, and keyboard access' },
    ],
  },
  {
    id: 'senior',
    number: 4,
    title: 'Senior Level',
    description: 'Architecture, performance, failure recovery, and real-time systems.',
    components: [
      { number: 20, name: 'Toast System', slug: 'toast-system', focus: 'Global state, queues, auto-dismissal, and cleanup' },
      { number: 21, name: 'Virtualized List', slug: 'virtualized-list', focus: 'Visible-window calculation and rendering performance' },
      { number: 22, name: 'Drag-and-Drop List', slug: 'drag-and-drop-list', focus: 'Reordering, keyboard access, and edge cases' },
      { number: 23, name: 'Command Palette', slug: 'command-palette', focus: 'Search, shortcuts, focus, and composition' },
      { number: 24, name: 'Error Boundary', slug: 'error-boundary', focus: 'Failure isolation, fallbacks, reporting, and recovery' },
      { number: 25, name: 'Real-Time Chat', slug: 'real-time-chat', focus: 'WebSocket/SSE updates and optimistic UI' },
      { number: 26, name: 'AI Streaming Chat', slug: 'ai-streaming-chat', focus: 'Streaming text, cancellation, retry, and partial states' },
    ],
  },
]

export const componentCount = componentLevels.reduce(
  (total, level) => total + level.components.length,
  0,
)
