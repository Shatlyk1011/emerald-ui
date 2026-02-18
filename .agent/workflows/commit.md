---
description: Commit staged changes using Conventional Commits convention
---

// turbo-all

When the user says "run" or triggers this workflow, follow these steps:

1. **Check Staged Changes**
   - Run `git diff --cached --stat` to see what files are staged.
   - If nothing is staged, inform the user and stop.

2. **Analyze the Diff**
   - Run `git diff --cached` to get the full diff of staged changes.
   - Carefully read and understand every change.

3. **Determine Commit Type**
   - Based on the changes, select the most appropriate [Conventional Commit](https://www.conventionalcommits.org/) type:
     - `feat`: A new feature
     - `fix`: A bug fix
     - `docs`: Documentation-only changes
     - `style`: Code style changes (formatting, semicolons, etc.) — no logic change
     - `refactor`: Code restructuring without changing behavior
     - `perf`: Performance improvement
     - `test`: Adding or updating tests
     - `build`: Build system or dependency changes
     - `ci`: CI/CD configuration changes
     - `chore`: Maintenance tasks (tooling, configs, etc.)
   - If the changes span multiple areas, pick the **primary** type and mention secondary changes in the body.

4. **Determine Scope (optional)**
   - If the changes are scoped to a specific component, module, or feature, include it in parentheses after the type, e.g. `feat(auth):`.
   - Keep the scope short and lowercase.

5. **Write the Commit Message**
   - **Subject line**: `<type>(<scope>): <short imperative description>` (max 72 chars, no period at end).
   - **Body** (if needed): After a blank line, explain *what* and *why* (not *how*). Wrap at 72 chars.
   - **Breaking changes**: If applicable, add `BREAKING CHANGE:` footer.
   - If changes touch multiple unrelated areas, use a bulleted list in the body.

6. **Execute the Commit**
   - Run `git commit -m "<subject>" -m "<body>"` with the crafted message.
   - If there is no body needed, run `git commit -m "<subject>"` only.

7. **Confirm**
   - Run `git log -1 --oneline` to show the committed result.
   - Report the commit hash and message to the user.
