---
description: Component Refactoring Workflow
---

1. Analysis & Planning Phase

   1.1 Code Assessment

- Identify the existing component provided by the user
- Analyze core functionality and essential features that must be preserved
- Extract current dependencies, libraries, and styling approaches
- Document user-facing behavior that should remain consistent

  1.2 Requirements Gathering
  - Determine refactoring scope and goals:
  - Modernization: Update to latest patterns, libraries (`motion/react`, Tailwind CSS)
  - Feature Enhancement: Add new capabilities while maintaining compatibility
  - Optimization: Performance improvements, bundle size reduction
  - Architectural Restructuring: Make code unique, improve maintainability
  - Library Migration: Replace outdated dependencies
  - Generate component name using kebab-case if not explicitly provided
  - Clarify specific user requirements or preferences for changes

  1.3 Refactoring Strategy Definition

- Assess what stays the same (core functionality, user experience)
- Identify what changes (implementation details, structure, dependencies)
- Plan incremental changes to minimize risk
- Note any breaking changes that may affect usage

---

2. Implementation Phase

2.1 File Structure Setup

- Create/Update component file: `src/components/node-ui-components/[kebab-case-name].tsx`
- Follow the established template structure from `Create Component and Docs` skill
- Ensure proper file organization and naming conventions

  2.2 Code Transformation

Core Modernization

- Add `'use client'` directive at the top of the file
- Update imports to use modern patterns. Always use default export.
- Preserve all essential functionality and user-facing behavior
- Maintain existing prop interfaces unless enhancement is requested

Dependency Migration

- Replace `framer-motion` → `motion/react` for animations
- Replace custom CSS/CSS-in-JS → Tailwind CSS utility classes
- Replace HTML primitives → shadcn/ui components where applicable:
  - `<button>` → `<Button>`
  - `<input>` → `<Input>`
  - `<div class="card">` → `<Card>`
  - etc.
- Remove unused dependencies and imports

Styling Enhancement

- Convert all styling to Tailwind CSS utility classes
- Use `cn()` utility for conditional class merging
- Apply consistent spacing, colors, and design tokens
- Enhance responsive behavior with Tailwind breakpoints
- Improve dark mode support if applicable

Animation Upgrade

- Migrate animation logic to `motion/react`
- Enhance with smooth transitions and micro-interactions
- Optimize animation performance (reduce layout thrashing)
- Add accessibility considerations (reduced motion preference)

  2.3 Architectural Improvements

Code Restructuring (when "make it your own" is requested)

- Rename variables and functions for clarity (avoid generic names)
- Reorganize logic flow for better readability
- Extract complex logic into helper functions or custom hooks
- Refactor component structure (split into sub-components if beneficial)
- Simplify conditional logic and reduce nesting

Props & Interface Design

- Define clear TypeScript interfaces with JSDoc comments
- Provide sensible default props
- Ensure prop validation and type safety
- Add optional props for customization
- Support forwarding refs if component wraps DOM elements

Reusability & Flexibility

- Ensure component can render independently
- Handle edge cases and error states gracefully
- Support composition patterns (children, render props)
- Avoid hard-coded values; use props or configuration
- Design for extensibility (allow className overrides, custom variants)

---

## 3. Quality Assurance

### 3.1 Functionality Verification

- Verify all original features work as expected
- Test new features or enhancements
- Ensure no regressions in user-facing behavior
- Validate prop combinations and edge cases

3.2 Code Quality Checks

- Review TypeScript types for accuracy and completeness
- Check for unused imports or variables
- Ensure consistent code style and formatting
- Validate accessibility (ARIA attributes, keyboard navigation)
- Optimize performance (memoization, lazy loading if needed)

4. Documentation Implementation
   - Create or update the documentation file in `src/content/docs/components/[kebab-case-name].mdx`.
   - Use the `Create Component and Docs` skill to follow the MDX template.
   - Ensure the `<Preview>` component is correctly set up with the link matching the filename.
   - Update the "Usage" example to reflect any API changes from the refactor.

5. Metadata Registration
   - Open src/content/meta.json.
   - Check if the component is already registered.
   - If not, determine the appropriate category and add it (same rules as creating a new component).
   - Ensure proper JSON formatting.
