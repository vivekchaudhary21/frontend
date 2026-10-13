import { Counter } from './Counter/Counter'

// Connect a route slug to its finished or in-progress component.
// Add each new component here when its implementation is ready to preview.
export const componentRegistry = {
  counter: <Counter initialValue={5} step={5} min={0} max={100} />,
}
