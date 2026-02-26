---
name: Create Component and Docs
description: Guidelines for creating new React components and their Fumadocs MDX documentation.
---

# Create Component and Docs

Use this skill when the user asks to create a new UI component. This skill ensures that both the component code and its documentation are created in the correct locations with the correct structure.

## 1. Component Creation

**Location:** `src/components/emerald-ui-components/<kebab-case-name>.tsx`

**Template:**

```tsx
'use client'

/**
 * @author: @emerald-ui
 * @description: [Brief description of component]
 * @version: 1.0.0
 * @date: [Current Date YYYY-MM-DD]
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useState } from 'react'
import {
  // Import icons from lucide-react as needed
  Star,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

// Define interfaces
interface MyComponentProps {
  // props...
}

export default function MyComponent({ ...props }: MyComponentProps) {
  // implementation...

  return <div className='...'>{/* Component JSX */}</div>
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

import [ComponentName] from '@/components/emerald-ui-components/[kebab-case-name]'

<Preview link='[kebab-case-name]' comment={['[additional packages if there is any]']}>
  <[ComponentName] />
</Preview>
```

**Key Guidelines:**

- Frontmatter must include `title`, `description`, `icon`, and `full`.
- Import the component from `@/components/emerald-ui-components/...`.
- Wrap the component in `<Preview>`.
- `link` prop in `<Preview>` should match the filename (without extension).
- include only the preview component. not need for props table or usage examples or any other additional information.
