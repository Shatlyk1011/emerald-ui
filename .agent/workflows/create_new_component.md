---
description: Create a new custom component and its documentation
---

1. **Information Gathering**
   - Ask the user for the component name (e.g., "Animated Card") and a brief description of its functionality.
   - Ask for any specific requirements (icons, animations, props).

2. **Component Implementation**
   - Create the component file in `src/components/node-ui-components/[kebab-case-name].tsx`.
   - Use the `Create Component and Docs` skill to follow the code template.
   - Ensure you use `motion/react` for animations and `lucide-react` for icons (if needed).

3. **Documentation Implementation**
   - Create the documentation file in `src/content/docs/components/[kebab-case-name].mdx`.
   - Use the `Create Component and Docs` skill to follow the MDX template.
   - Ensure the `<Preview>` component is correctly set up with the link matching the filename.

4. **Verification**
   - Run a mental check: Do the filenames match? Is the import path in MDX correct?
   - Notify the user that the component and docs have been created and provide links to the files.