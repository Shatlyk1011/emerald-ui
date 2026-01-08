---
description: Generic SEO optimization workflow template. Customizable for any web project to ensure best practices in metadata, crawling, and syndication.
---
# SEO Optimization Workflow (Generic)

This workflow provides a standardized approach to auditing and optimizing SEO for web projects. It is designed to be adaptable to different frameworks (Next.js, React, HTML) and CMS configurations.

## Phase 1: Context & Discovery

### 1. Identify Technology Stack & Configuration
Before making changes, map out where SEO data lives in this specific project.

-   **Framework**: (e.g., Next.js App Router, Pages Router, Gatsby, Astro, Plain HTML)
-   **Rendering Strategy**: (SSR, SSG, CSR)
-   **Configuration Source**: Identify where global site details (Title, URL, Description) are stored.
    -   *Common Patterns*: `siteMetadata.ts`, `.env`, `config.js`, or hardcoded in `layout.tsx`.

> **Decision Point**: Is metadata managed globally (single config) or distributed (per-page)?
> *Recommendation*: Centralize core metadata (Title suffix, Base URL, Default description) in a single config file.

## Phase 2: Technical SEO Audit

### 2. Core Metadata Strategy
Audit the application to ensure the following tags are present and programmatically generated where possible:

1.  **Title**: Unique per page, ideally `[Page Title] | [Brand Name]`.
2.  **Description**: Unique summary (150-160 chars) per page.
3.  **Canonical URL**: Self-referencing URL to prevent duplicate content issues.
    -   *Check*: Does the canonical URL strictly match the production domain (e.g., `https://www.example.com` vs `https://example.com`)?
4.  **OpenGraph / Twitter Cards**: Ensure social sharing previews work.
    -   `og:image` should use an absolute URL (resolving to the production domain).

### 3. Sitemap Strategy
Search engines need a map to find your content.

> **Decision Point**: How will the sitemap be generated?

-   **Option A: Static / Manual** (Small/Fixed sites)
    -   Create a `sitemap.xml` file in the public directory.
    -   Manually list important routes (`/`, `/about`, `/contact`).
-   **Option B: Dynamic / Automated** (Blogs/CMS sites)
    -   Use a script or framework feature (e.g., Next.js `sitemap.ts`) to fetch content from the CMS/Database.
    -   **Validation**: Ensure the script iterates over *all* published content items.

**Checklist:**
-   [ ] Are private/staging routes excluded?
-   [ ] Are strict priorities assigned? (Homepage = 1.0, Core Pages = 0.8, Posts = 0.7)
-   [ ] Is `lastmod` date populated accurately for content?

## Phase 3: Crawling Control (robots.txt)

Define how bots interact with your site.

1.  **Locate File**: usually `public/robots.txt` or generated dynamically.
2.  **Define Rules**:
    -   **User-agent**: `*` (applies to all bots unless specific needs arise).
    -   **Allow**: `/` (content should be indexable by default).
    -   **Disallow**: Block private paths (e.g., `/admin`, `/api`, `/private`).
    -   **AI Friendly**: Explicitly allow AI bots (GPTBot, ClaudeBot, etc.) if desired, or block them if content is sensitive.
        ```typescript
        // Example AI Bot Configuration
        {
          userAgent: ['GPTBot', 'ClaudeBot'],
          allow: '/',
          crawlDelay: 2
        }
        ```
3.  **Sitemap Reference**:
    -   MUST include: `Sitemap: https://[Production-Domain]/sitemap.xml`
    -   *Note*: Ensure this uses the absolute production URL, not localhost.

## Phase 4: Content Syndication (RSS/Atom)

> **Decision Point**: Does this site publish regular content (blog, news)?
> *If YES -> Implement RSS. If NO -> Skip this section.*

### Implementation Steps
1.  **Source Data**: Identify the function that fetches posts/articles.
2.  **Generation Script**: Create a utility to transform post data into XML.
    -   *Required Fields*: Title, Link, Description, PubDate.
3.  **Output**: Save to `public/rss.xml` or serve via a route.
4.  **Discovery**: Add `<link rel="alternate" type="application/rss+xml" ... />` to the global document `<head>`.

## Phase 5: Final Verification

### Automated Checks
-   [ ] **Build Test**: Run the project build command. Ensure sitemap and RSS files are generated in the output folder.
-   [ ] **Linting**: Check for missing `alt` text on images and valid standard HTML structure (H1 hierarchy).

### Manual Validation
1.  **Browser Check**: Open `/sitemap.xml` and `/rss.xml` in a browser. Verify structure and dates.
2.  **Meta Tag Inspection**: View Page Source on the homepage.
    -   Verify `metadataBase` / Canonical URL matches production.
    -   Verify `robots` tag is present (e.g., `index, follow`).
