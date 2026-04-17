# Emerald UI

**Emerald UI** is a specialized platform offering an inspirational gallery of website designs and a collection of stunning, interactive UI components. Built with top-tier modern web technologies, it allows developers to explore handpicked website screens (including dialogs and video previews) and seamlessly install finely-crafted components powered by motion and GSAP—directly via CLI.

> Give it a ⭐️ on GitHub. It helps a lot and motivates for further projects!

## ✨ Features

### 🧩 UI Components & Registry

- **CLI Integration:** Powered by an integrated shadcn-like CLI (`pnpm dlx shadcn@latest add <component>`).
- **Custom Built Registry:** Uses a fully customized registry script to manage and deliver Emerald UI components directly to your projects.
- **GSAP & Motion Collections:** Includes dedicated sections showcasing complex, beautiful animations built with GSAP and Framer Motion.
- **Client-Side Validation:** Fully typed and validated client-side workflows using Zod.

### 🌐 Inspiration Gallery

- **Handpicked Websites:** A curated collection with high-quality screenshots and detailed video previews.
- **Automated Capture (Scrnify):** Custom server-side Next.js hooks integrated with `api.scrnify.com` to automatically capture, process, and optimize website screenshots into WebP upon adding URLs via Payload CMS.
- **Smart Color Extraction:** Dynamically extracts dominant/gradient colors from screenshots to adapt UI elements automatically.
- **Advanced Filtering:** Easily filter inspiration galleries by specific categories or design styles.

### 🛠️ Architecture & Core

- **Next.js & App Router:** Built leveraging Next.js capabilities with React 19.
- **Enhanced Payload CMS:** Payload CMS v3 dashboard baked natively into the Next.js App router (`/admin`), seamlessly connected to Cloudflare R2 and MongoDB.
- **Optimized Performance:** Blazing fast experience via SSG (Static Site Generation), caching, and optimized Edge-ready deployments.
- **Authentication:** Deep Supabase integration using SSR and Next.js route interceptors.
- **Design System:** Powered by the brand new Tailwind CSS v4.
- **Dark & Light Mode:** First-class theme switching out of the box.
- **SEO Optimized:** Meta tags, translations, and sitemaps natively configured.

## 💻 Tech Stack

- **Framework:** Next.js (App Router), React 19
- **Styling:** Tailwind CSS v4
- **UI Library:** Shadcn UI & Radix UI
- **Animations:** GSAP & Motion
- **Documentation:** Fumadocs
- **CMS:** Payload CMS v3
- **Database:** MongoDB
- **Authentication:** Supabase (with SSR)
- **File Storage:** Cloudflare R2 (Images, videos, favicons uploaded natively)
- **State & Data:** Zustand & TanStack Query
- **Email/Newsletter:** Plunk + Nodemailer + React Email Components
- **Media Optimization:** Sharp
- **Analytics:** PostHog

## 🚀 Quick Start

### 1. Clone & Install dependencies

```bash
git clone https://github.com/Shatlyk1011/emerald-ui.git
cd emerald-ui

# Install dependencies using pnpm
pnpm install
```

### 2. Environment Variables

Copy the example environment file and fill in the necessary keys. Make sure to provide keys for Supabase, MongoDB, Payload CMS, and Cloudflare R2.

```bash
cp env.example .env
```

_(Note: Refer to `env.example` in the directory, not `.env.example`)_

### 3. Run Development Server

```bash
pnpm dev
```

Your Next.js app will be securely available at `http://localhost:3000`.

### 4. Payload CMS Admin

The Payload CMS admin panel runs seamlessly within the Next.js project. You can access it directly at `http://localhost:3000/admin`.

## 📦 Scripts Overview

- `pnpm dev` - Starts the Next.js development server.
- `pnpm build` - Builds the application for production and runs the RSS generation script.
- `pnpm generate:types` - Automatically infers and generates TypeScript interfaces from Payload CMS collections.
- `pnpm build-registry` - Compiles the Emerald UI components into the `public/r` folder, generating JSON definitions for CLI installation.
- `pnpm format` / `pnpm lint` / `pnpm knip` - Various formatting, linting, and dead-code elimination tasks.

## 🤖 AI Agents & Workflows

This project includes a set of AI workflows and skills stored in the `.agent` folder to streamline development and maintenance tasks. You can trigger them using AI assistants that support this convention.

### Available Workflows (`.agent/workflows/`)
- **/browser_to_component:** Converts a web snippet (HTML/CSS) directly into a React component.
- **/commit:** Automatically stages and commits changes following the Conventional Commits specification.
- **/create_new_component:** Scaffolds a new custom React component from scratch alongside its Fumadocs MDX documentation.
- **/refactor_component:** General refactoring workflow to enhance or fix existing components.
- **/refactor_gsap_component:** Specialized workflow for refactoring components to utilize GSAP animations.
- **/seo-optimization:** A generic workflow template to ensure SEO best practices across metadata, crawler configs, and syndication.

### Available Skills (`.agent/skills/`)
- **Create Component and Docs:** Established guidelines and conventions for creating new React components and their corresponding MDX documentation.
- **Design Guides:** Core design parameters, theming rules, and aesthetics for the project.

## 🤝 Contributing

Contributions, issues, and feature requests are highly appreciated! If you have ideas on expanding the component library, optimizing the automated Scrnify pipeline, or want to submit new inspiration sites, feel free to open a PR or an issue.

## License

MIT
