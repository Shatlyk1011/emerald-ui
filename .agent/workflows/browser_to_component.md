---
description: Convert a browser snippet (HTML/CSS) into a React component
---

1. **Analysis & Preparation**
   - **Read and apply the `Frontend Design` skill** (`.agent/skills/design-guides/SKILL.MD`) to guide the component's aesthetic direction, color choices, typography, spatial composition, and motion design.
   - Analyze the provided HTML/CSS snippet to understand its structure and visual style.
   - Generate a suitable component name (kebab-case).
   - Determine if `motion/react` is needed for animations (default to yes if animations are present or requested).

2. **Component Implementation**
   - Create the component file in `src/components/emerald-ui-components/[kebab-case-name].tsx`.
   - Use the `Create Component and Docs` skill to follow the code template.
   - **Conversion Rules**:
     - **HTML to JSX**: Convert class to className, close self-closing tags, etc.
     - **CSS to Tailwind**: Replace raw CSS styles with equivalent Tailwind CSS utility classes. Use arbitrary values `[]` only if absolutely necessary.
     - **Colors**: Use Tailwind's color palette. Ensure dark mode compatibility (`dark:` prefix).
     - **Icons**: Replace SVG icons with `lucide-react` icons where possible.
   - **Refinement**:
     - Extract props for dynamic content (text, images, links).
     - Define a TypeScript interface for props.
     - Apply `motion/react` for entry/exit or interaction animations if applicable.
     - Change provided text data so it does not same with original one.
     - Use shadcn components if applicable (ex: change html <button/> to shadcn <Button/>)

3. **Documentation Implementation**
   - Create the documentation file in `src/content/docs/components/[kebab-case-name].mdx`.
   - Use the `Create Component and Docs` skill to follow the MDX template.

4. **Metadata Registration**
   - Register the component in `src/content/meta.json` following the standard procedure in `create_new_component` workflow.
