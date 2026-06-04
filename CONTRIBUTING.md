# Contributing to Emerald UI

Thank you for your interest in contributing! 🎉  
This guide will walk you through how to get started, what to work on, and how to submit your changes.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Component Guidelines](#component-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Reporting Bugs & Issues](#reporting-bugs--issues)

---

## Code of Conduct

By participating in this project, you agree to be respectful, constructive, and welcoming to all contributors regardless of experience level. Harassment of any kind will not be tolerated.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/shatlyk1011/emerald-ui.git
   cd emerald-ui
   ```
3. **Install** dependencies:
   ```bash
   pnpm install
   ```
4. **Copy** the environment file and fill in your keys:
   ```bash
   cp env.example .env
   ```
5. **Start** the development server:
   ```bash
   pnpm dev
   ```

---

## Ways to Contribute

| Type                 | Description                                           |
| -------------------- | ----------------------------------------------------- |
| 🐛 Bug Fix           | Fix an existing issue or unexpected behavior          |
| ✨ New Component     | Add a new UI component to the registry                |
| 📚 Documentation     | Improve or add MDX docs for existing components       |
| 🎨 Design            | Improve aesthetics, responsiveness, or accessibility  |
| 🤖 AI Workflows      | Add or improve agent skills/workflows in `.agent/`    |
| 🌐 Inspiration Sites | Suggest or add new entries to the inspiration gallery |

---

## Development Setup

### Project Structure (relevant paths)

```
src/
├── components/
│   └── emerald-ui-components/   # UI component source files
├── content/
│   └── docs/components/         # MDX documentation per component
└── registry/
    └── registry-components.ts   # Component registry manifest
```

### Running Scripts

```bash
pnpm dev              # Start Next.js dev server
pnpm build-registry   # Compile components into public/r (CLI installable)
pnpm lint             # Run ESLint
pnpm format           # Run Prettier
```

---

## Submitting a Pull Request

1. **Create a branch** from `main` with a descriptive name:

   ```bash
   git checkout -b feat/my-new-component
   # or
   git checkout -b fix/broken-animation
   ```

2. **Make your changes** following the [Component Guidelines](#component-guidelines) below.

3. **Commit** your changes using [Conventional Commits](#commit-message-convention):

   ```bash
   git commit -m "feat: add shimmer button component"
   ```

4. **Push** your branch:

   ```bash
   git push origin feat/my-new-component
   ```

5. **Open a Pull Request** on GitHub:  
   → [github.com/Shatlyk1011/emerald-ui/pulls](https://github.com/Shatlyk1011/emerald-ui/pulls)

6. Fill in the PR template with a clear description of what was changed and why.

> **Note:** PRs should be focused and minimal. One feature or fix per PR.

---

## Component Guidelines

When adding or modifying a UI component, follow these conventions:

- **Component file** → `src/components/emerald-ui-components/<component-name>.tsx`
- **Documentation file** → `src/content/docs/components/<component-name>.mdx`
- **Registry entry** → add an entry to `src/registry/registry-components.ts`

Refer to the [Create Component and Docs skill](.agent/skills/create_component_and_docs/SKILL.md) for the full step-by-step implementation guide.

### Animation Components

- GSAP-based components must use the `import-gsap-animation` skill pattern.
- Disable GSAP animations on mobile where appropriate (use a `useIsMobile` check).

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

| Type       | When to use                  |
| ---------- | ---------------------------- |
| `feat`     | New feature or component     |
| `fix`      | Bug fix                      |
| `docs`     | Documentation only           |
| `style`    | Formatting, no logic change  |
| `refactor` | Code restructuring           |
| `chore`    | Build scripts, tooling, deps |

**Examples:**

```bash
feat(components): add morphing text component
fix(registry): correct file path in registry manifest
docs: add usage examples to shimmer button
```

---

## Reporting Bugs & Issues

Found a bug or have a suggestion?

- **Open an issue** → [github.com/Shatlyk1011/emerald-ui/issues](https://github.com/Shatlyk1011/emerald-ui/issues)
- Or use the **in-app issue form** at [emerald-ui.com](https://emerald-ui.com/)

Please include:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS info if relevant

---

Thank you for helping make Emerald UI better! 🌿
