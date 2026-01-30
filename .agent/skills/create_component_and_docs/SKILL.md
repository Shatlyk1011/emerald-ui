---
name: Create Component and Docs
description: Guidelines for creating new React components and their Fumadocs MDX documentation.
---

# Create Component and Docs

Use this skill when the user asks to create a new UI component. This skill ensures that both the component code and its documentation are created in the correct locations with the correct structure.

## 1. Component Creation

**Location:** `src/components/node-ui-components/<kebab-case-name>.tsx`

**Template:**

```tsx
'use client'

/**
 * @author: @nodeui
 * @description: [Brief description of component]
 * @version: 1.0.0
 * @date: [Current Date YYYY-MM-DD]
 * @license: MIT
 * @website: https://nodeui.com
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import {
  // Import icons from lucide-react as needed
  Star,
} from 'lucide-react'

// Define interfaces
interface MyComponentProps {
  // props...
}

export default function MyComponent({ ...props }: MyComponentProps) {
  // implementation...

  return (
    <div className='...'>
      {/* Component JSX */}
    </div>
  )
}
```

**Key Guidelines:**
- Always use `'use client'` at the top.
- Include the standard file header.
- Use `motion/react` for animations.
- Use `lucide-react` for icons.
- Export as `default`.

## 2. Documentation Creation

**Location:** `src/content/docs/components/<kebab-case-name>.mdx`

**Template:**

```mdx
---
title: [Component Name]
description: [Brief description]
icon: [Lucide Icon Name]
full: false
---

import [ComponentName] from '@/components/node-ui-components/[kebab-case-name]'

<Preview link='[kebab-case-name]' comment={['[additional packages if there is any]']}>
  <[ComponentName] />
</Preview>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DockItem[]` | 5 default navigation items | Array of dock items with icon, label, and id |
| `activeId` | `string` | `"home"` | ID of the currently active item |
| `onItemClick` | `(id: string) => void` | `undefined` | Callback fired when an item is clicked |
| `className` | `string` | `undefined` | Additional CSS classes for the dock container |

## DockItem Interface

```tsx
interface DockItem {
  icon: React.ElementType; // Lucide icon component
  label: string;           // Tooltip label
  id: string;              // Unique identifier
}
```


```

**Key Guidelines:**
- Frontmatter must include `title`, `description`, `icon`, and `full`.
- Import the component from `@/components/node-ui-components/...`.
- Wrap the component in `<Preview>`.
- `link` prop in `<Preview>` should match the filename (without extension).
