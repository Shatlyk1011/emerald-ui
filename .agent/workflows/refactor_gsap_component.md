---
description: Gsap Component Refactoring Workflow
---

# GSAP Component Refactoring & Integration Workflow

## 1. Analysis & Planning Phase

### 1.1 Code Assessment

- **Read and apply the `Frontend Design` skill** (`.agent/skills/design-guides/SKILL.MD`) to guide the component's aesthetic direction, color choices, typography, spatial composition, and motion design during GSAP refactoring.
- **Identify the existing component** provided by the user
- **Analyze core animation features** and essential GSAP functionality that must be preserved
- **Extract current dependencies:**
  - GSAP core library and plugins (ScrollTrigger, Observer, Draggable, etc.)
  - Animation patterns and timelines used
  - Easing functions and animation parameters
- **Document animation behavior:**
  - Trigger points (scroll, click, hover, intersection)
  - Timeline sequences and dependencies
  - User interaction patterns
  - Performance considerations (animation complexity, reflows)

### 1.2 Requirements Gathering

- **Determine refactoring scope and goals:**
  - **Modernization:** Update to latest GSAP patterns and best practices
  - **Plugin Integration:** Identify required GSAP plugins (ScrollTrigger, ScrollSmoother, SplitText, etc.)
  - **Feature Enhancement:** Add new animation capabilities while maintaining compatibility
  - **Optimization:** Performance improvements, minimize repaints/reflows
  - **Architectural Restructuring:** Make code unique, improve maintainability
  - **React Integration:** Ensure proper React lifecycle integration with GSAP
  - **Library Migration:** Replace competing animation libraries with GSAP
- **Generate component name** using kebab-case if not explicitly provided
- **Clarify specific user requirements** or preferences for animation changes

### 1.3 Refactoring Strategy Definition

- **Assess what stays the same:**
  - Core animation timing and easing
  - User-facing animation behavior and feel
  - Trigger mechanisms and interaction patterns
- **Identify what changes:**
  - Implementation details (GSAP API usage)
  - React integration patterns (useGSAP hook, refs)
  - Performance optimizations
  - Code structure and organization
- **Plan incremental changes** to minimize animation breakage
- **Note any breaking changes** that may affect usage or animation behavior

---

## 2. Implementation Phase

### 2.1 File Structure Setup

- **Create/Update component file:** `src/components/gsap-ui-components/[kebab-case-name].tsx`
- Follow the established template structure for GSAP components
- Ensure proper file organization and naming conventions
- Place GSAP-specific components in dedicated directory

### 2.2 Code Transformation

#### Core Modernization

- Add `'use client'` directive at the top of the file
- Update imports to use modern GSAP patterns:

  ```typescript
  import { useGSAP } from '@gsap/react'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  // Register plugins
  gsap.registerPlugin(ScrollTrigger)
  ```

- Always use default export for component
- Preserve all essential animation functionality and user-facing behavior
- Maintain existing prop interfaces unless enhancement is requested

#### GSAP Integration Patterns

- **Replace animation libraries** → GSAP:
  - `framer-motion` → GSAP with `useGSAP` hook
  - CSS animations/transitions → GSAP animations
- **Use proper React integration:**
  - Utilize `useGSAP` hook for automatic cleanup
  - Implement proper ref handling with `useRef`
  - Ensure animations respect React lifecycle
  - Use `contextSafe` for event handlers
- **Plugin management:**
  - Register all required GSAP plugins
  - Import only necessary plugins to reduce bundle size
  - Use ScrollTrigger for scroll-based animations
  - Implement Observer for intersection-based triggers

#### Dependency Migration

- Replace custom CSS/CSS-in-JS → Tailwind CSS utility classes
- Replace HTML primitives → shadcn/ui components where applicable:
  - `<button>` → `<Button>`
  - `<input>` → `<Input>`
  - etc.
- Remove unused dependencies and imports
- Keep GSAP bundle optimized (import only needed features)

#### Styling Enhancement

- Convert all styling to Tailwind CSS utility classes
- Use `cn()` utility for conditional class merging
- Apply consistent spacing, colors, and design tokens
- Enhance responsive behavior with Tailwind breakpoints
- Improve dark mode support if applicable
- **Important:** Use Tailwind for layout/styling, GSAP for animations

#### Animation Upgrade & Optimization

**Modern GSAP Patterns:**

```typescript
// Use useGSAP hook with proper scope
useGSAP(() => {
  const tl = gsap.timeline({ ... })

  tl.to(elementRef.current, {
    x: 100,
    duration: 1,
    ease: 'power2.out'
  })
}, { scope: containerRef }) // Automatic cleanup

// Use contextSafe for event handlers
const { contextSafe } = useGSAP({ scope: containerRef })

const handleClick = contextSafe(() => {
  gsap.to(elementRef.current, { ... })
})
```

**Performance Optimization:**

- Use `will-change` sparingly and remove after animation
- Animate transform and opacity properties for GPU acceleration
- Avoid animating layout-triggering properties (width, height, etc.)
- Use `force3D: true` for better performance
- Implement lazy registration of heavy plugins
- Use `invalidateOnRefresh: true` for ScrollTrigger when needed
- Debounce or throttle resize handlers

**Advanced Features:**

- Implement timeline sequences for complex animations
- Use GSAP's built-in easing functions or custom eases
- Add scrubbing capabilities with ScrollTrigger
- Implement pause/play/reverse controls where appropriate
- Use GSAP's utility functions (gsap.utils.clamp, mapRange, etc.)

**Accessibility:**

- Respect `prefers-reduced-motion` media query:

  ```typescript
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  useGSAP(() => {
    gsap.to(element, {
      duration: prefersReducedMotion ? 0 : 1,
      // ... other props
    })
  })
  ```

- Ensure keyboard navigation works during animations
- Maintain focus indicators during animated state changes

### 2.3 Architectural Improvements

#### Code Restructuring (when "make it your own" is requested)

- **Rename variables and functions** for clarity:
  - Use descriptive animation-related names (e.g., `fadeInTimeline`, `scrollAnimation`)
  - Avoid generic names like `anim`, `tl`, `ref` (use `containerRef`, `textRef`, etc.)
- **Reorganize animation logic** flow for better readability
- **Extract complex animations** into helper functions or custom hooks:
  ```typescript
  const useScrollAnimation = (triggerRef) => {
    useGSAP(
      () => {
        // Complex scroll animation logic
      },
      { scope: triggerRef }
    )
  }
  ```
- **Refactor component structure:**
  - Split into sub-components if animations are independent
  - Create reusable animation utilities
  - Separate timeline definitions from component logic
- **Simplify conditional logic** and reduce nesting

#### Props & Interface Design

- **Define clear TypeScript interfaces** with JSDoc comments:
  ```typescript
  interface AnimatedCardProps {
    duration?: number
    ease?: string | gsap.EaseFunction
    scrollTrigger?: boolean
    // ... other props
  }
  ```
- Provide sensible default props for animation parameters
- Ensure prop validation and type safety
- Add optional props for animation customization:
  - Duration, delay, ease
  - Trigger conditions
  - Animation direction and repeat
- Support forwarding refs if component wraps DOM elements

#### Reusability & Flexibility

- Ensure component can render independently without external dependencies
- Handle edge cases:
  - Component unmounting during animation
  - Rapid prop changes
  - Missing refs or DOM elements
- Support composition patterns:
  - Children prop for animated containers
  - Render props for custom animation targets
  - Compound components for complex animations
- Avoid hard-coded animation values; use props or configuration
- Design for extensibility:
  - Allow className overrides
  - Support custom GSAP config objects
  - Provide animation callbacks (onStart, onComplete, onUpdate)
- Export animation utilities for reuse:
  ```typescript
  export const fadeInAnimation = (element: Element, duration = 1) => {
    return gsap.from(element, { opacity: 0, duration })
  }
  ```

## 3. Quality Assurance

### 3.1 Functionality Verification

- **Verify all original animations** work as expected
- **Test animation timing** and easing curves match the original
- **Validate trigger conditions:**
  - Scroll-based animations fire at correct positions
  - Click/hover interactions respond properly
  - Intersection observers trigger appropriately
- Test new animation features or enhancements
- Ensure no regressions in user-facing animation behavior
- Validate prop combinations and edge cases
- **Test animation cleanup:**
  - No memory leaks on unmount
  - Proper cleanup when component re-renders
  - ScrollTrigger instances are killed appropriately

## 4. Documentation Implementation

### 4.1 Component Documentation

- **Create or update** the documentation file in `src/content/docs/gsap/components/[kebab-case-name].mdx`
- Create/Update component file: `src/components/emerald-ui-components/[kebab-case-name].tsx`
- Follow the established template structure from `Create Component and Docs` skill
- Ensure proper file organization and naming conventions
