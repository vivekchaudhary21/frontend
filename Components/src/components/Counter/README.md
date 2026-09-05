# Counter

Build a reusable counter that allows a user to increase, decrease, and reset a numeric value.

## Learning goals

- Store and update local state.
- Handle button events.
- Derive disabled states from the current value.
- Design a small reusable props API.
- Make simple controls accessible.

## Core requirements

The component must:

1. Display the current count.
2. Provide an **Increment** button.
3. Provide a **Decrement** button.
4. Provide a **Reset** button.
5. Increment and decrement using the configured `step` value.
6. Start from the configured `initialValue`.
7. Prevent the value from going below `min`.
8. Prevent the value from going above `max`.
9. Disable **Decrement** when the minimum has been reached.
10. Disable **Increment** when the maximum has been reached.
11. Reset the count to `initialValue`, not always to zero.
12. Notify the parent through `onChange` whenever the count changes.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialValue` | `number` | `0` | Value used when the component first renders and when it resets. |
| `step` | `number` | `1` | Amount added or subtracted by each action. |
| `min` | `number` | `-Infinity` | Lowest permitted value. |
| `max` | `number` | `Infinity` | Highest permitted value. |
| `onChange` | `function` | `undefined` | Called with the new value after a successful change. |

Example usage:

```jsx
<Counter
  initialValue={10}
  step={5}
  min={0}
  max={20}
  onChange={(value) => console.log(value)}
/>
```

## Expected behavior

For the example above:

- The displayed value starts at `10`.
- Increment changes it to `15`, then `20`.
- Increment is disabled at `20`.
- Decrement changes it by `5` each time.
- Decrement is disabled at `0`.
- Reset returns it to `10`.
- `onChange` receives the new value after each successful increment, decrement, or reset.
- Clicking a disabled action does not change the value or call `onChange`.

## Accessibility requirements

- Use native `<button>` elements for all actions.
- Every button must have an understandable accessible name.
- Disabled actions must use the native `disabled` attribute.
- The current count must be associated with a visible label such as **Current count**.
- Count changes should be announced with an appropriate live region.
- All functionality must work using only the keyboard.
- Do not communicate a disabled state using color alone.

## Edge cases

Consider the following cases before implementing:

- The next increment would be greater than `max`.
- The next decrement would be less than `min`.
- `initialValue` equals `min` or `max`.
- `min` and `max` are negative numbers.
- `step` is larger than the complete allowed range.
- Reset is clicked when the count already equals `initialValue`.

When an action would cross a boundary, clamp the value to that boundary. For example, incrementing `8` by `5` with `max={10}` should produce `10`, not `13`.

## Acceptance checklist

- [ ] The initial value is displayed correctly.
- [ ] Increment uses the configured step.
- [ ] Decrement uses the configured step.
- [ ] Reset returns to the configured initial value.
- [ ] The value never leaves the `min`–`max` range.
- [ ] Boundary buttons are disabled correctly.
- [ ] `onChange` receives the correct new value.
- [ ] Disabled actions do not call `onChange`.
- [ ] Controls have accessible names and keyboard support.
- [ ] Important behavior is covered by tests.

## Tests to write

1. It renders the default value of `0`.
2. It renders a custom initial value.
3. Increment and decrement use the default step.
4. Increment and decrement use a custom step.
5. It clamps changes at the minimum and maximum.
6. It disables actions at their boundaries.
7. Reset restores the initial value.
8. It calls `onChange` with the new value.
9. It does not call `onChange` for a blocked action.

## Interview questions

Be ready to explain:

1. Why is the count state owned by `Counter`?
2. When should this become a controlled component?
3. Why should disabled states be derived instead of stored separately?
4. How do functional state updates prevent stale-state bugs?
5. What should happen if props such as `initialValue` change after the first render?

## Optional extensions

Complete these only after the core requirements work:

- Add a controlled API using `value` and `onChange`.
- Support direct numeric input.
- Support press-and-hold incrementing.
- Add a configurable formatter for values such as percentages or currency.
- Extract the state logic into a reusable `useCounter` hook.
