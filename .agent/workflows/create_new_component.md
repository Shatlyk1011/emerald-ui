---
description: Create a new custom component from scratch and its documentation
---

1. **Information Gathering**
   - Generate component name and a brief description of its functionality.
   - Ask for any specific requirements (icons, animations, props, design style).
   - Determine the design approach:
     - Is this an unusual/fancy component with creative animations?
     - Is this a solid/usable component focused on practical functionality?

2. **Component Design & Implementation**
   - Create the component file in `src/components/node-ui-components/[kebab-case-name].tsx`.

   - Use the `Create Component and Docs` skill to follow the code template.
   - Always add dark and light modes. use tailwind colors. for dark mode use dark: utility class. make sure it looks good both in light and dark modes.
   - Design for reusability and demo-ready functionality:
     - Provide sensible default props for all properties so the component works out-of-the-box without any required props.
     - Ensure the component can render immediately with <ComponentName /> for demo purposes.
     - Use default values that showcase the component's primary features and visual appeal.

   - Apply the appropriate design philosophy:
     - if prompt requires Fancy/Unusual approach, leverage motion/react extensively for creative animations, transitions, and micro-interactions. Prioritize visual appeal and uniqueness.
     - if prompt requires Solid/Usable approach, focus on accessibility, performance, and practical functionality with subtle animations where they enhance UX.

   - Use lucide-react for icons when needed.

   - Use the correct libraries and utilities:
     - Tailwind CSS: Use Tailwind utility classes for all styling.
     - Motion animations: Use `motion/react` (NOT framer-motion) for animations when needed.
     - shadcn/ui primitives: Always use shadcn/ui components for standard UI elements (Button, Input, Card, Dialog, etc.) instead of building from scratch.
       - Import pattern: `import { Button } from "@/components/ui/button"`
       - Available primitives: Button, Input, Card, Badge, Dialog, Select, Checkbox, Switch, Tooltip, and more.
     - cn() utility\*: Use the `cn()` utility function for conditional and merged class names.
       - Import: `import { cn } from "@/lib/utils"`
       - Usage: `className={cn("base-classes", condition && "conditional-classes", props.className)}`

3. **Documentation Implementation**
   - Create the documentation file in `src/content/docs/components/[kebab-case-name].mdx`.
   - Use the `Create Component and Docs` skill to follow the MDX template.
   - Ensure the `<Preview>` component is correctly set up with the link matching the filename.

4. **Metadata Registration**
   - Open src/content/meta.json.
   - Determine the appropriate category:
     - Does this component fit into an existing category (e.g., Buttons, Inputs, Cards, AI Components, Texts)?
     - If it's a new category, create a new section header.
   - Add the component to the pages array:
     - For existing categories: Add the entry as "components/[kebab-case-name]" under the relevant category section.
     - For new categories:
       - Add a new category header in the format "---Category Name---" (e.g., "---Buttons---", "---AI Components---")
       - Add the component entry immediately after: "components/[kebab-case-name]"
   - Ensure proper JSON formatting (commas, no trailing comma on the last item).
   - Place the component in a logical position within its category (consider alphabetical ordering or grouping by functionality).

5. **Verification**
   - Run a mental check: Do the filenames match? Is the import path in MDX correct?
   - Notify the user that the component and docs have been created and provide links to the files.