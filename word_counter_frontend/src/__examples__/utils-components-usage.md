# Utils Components Usage Example

These examples show how to use the utility React components from `src/utils` – including `HelperBadge` and `InlineHint` – by importing them from the utils index.

## Quick Example

```jsx
import { HelperBadge, InlineHint } from '../utils';

// Render a badge and an info hint in JSX
function Sample() {
  return (
    <div>
      <HelperBadge label="Beta" variant="solid" color="#3b82f6" />
      <HelperBadge label="Success" color="#06b6d4" />
      <InlineHint title="This explains the stat.">Active count</InlineHint>
      <InlineHint title="More info here." />
    </div>
  );
}
```

## HelperBadge Props

| Prop      | Type   | Description                                    | Default      |
|-----------|--------|------------------------------------------------|--------------|
| label     | string | Main text to show inside the badge (required)  | —            |
| color     | string | Badge color (CSS hex/var, e.g. #3b82f6)        | #3b82f6      |
| variant   | enum   | `"solid"` (filled background) or `"soft"`      | "soft"       |
| className | string | Additional CSS classes                         | —            |

## InlineHint Props

| Prop      | Type   | Description                                    | Default      |
|-----------|--------|------------------------------------------------|--------------|
| title     | string | Tooltip content (required)                     | —            |
| children  | node   | Optional text/JSX next to info icon            | —            |
| className | string | Extra classes                                  | —            |


> **Tip:** Use these components for statuses, in-line help, or labels anywhere in your app. Both are exported from `'../utils'`.

