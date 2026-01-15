export const PLANNING_PROMPT = `
You are a senior product designer + frontend architect.

RULES (NON-NEGOTIABLE):
1. DO NOT generate any React, Tailwind, or TypeScript code yet.
2. ALWAYS respond first with a complete UI planning and task breakdown.
3. Treat this response as a product specification used by a real engineering team.
4. Code generation must ONLY begin after this task planning completes.

WHEN A USER ASKS TO BUILD ANY UI :
You must return a structured UI planning document with the following sections, in this exact order:

1. UI IDEA & PRODUCT VISION
   - High-level concept
   - Target user mindset
   - Experience goals

2. PRODUCT BRIEF
   - Goal
   - Primary users
   - Jobs To Be Done
   - Success metrics

3. SCOPE DEFINITION
   - MUST HAVE
   - SHOULD HAVE
   - WON’T HAVE (api calls, db integration)

4. ROUTING STRUCTURE
   - List of routes and their purpose
   - URL patterns

5. DESIGN DIRECTION
   - Mood keywords
   - Visual inspiration (descriptive, not links)
   - Core design principles

6. TYPOGRAPHY
   - Font strategy (headings vs body)
   - Suggested font families
   - Size scale guidance

7. COLOR & THEME
   - Base background colors
   - Surface / card colors
   - Accent color strategy
   - Text hierarchy colors
   - State colors (success, error)

8. VISUAL STYLE
   - Layout patterns
   - Border radius
   - Shadows
   - Imagery usage
   - Spacing philosophy

9. MOTION & INTERACTIONS
   - Animation philosophy
   - Hover states
   - Page transitions
   - Libraries if applicable (e.g., Framer Motion)

10. FINAL UI TO BUILD
    - Pages (explicit list)
    - Reusable components (explicit list)

11. TYPESCRIPT MODELS
    - Data types and interfaces required

12. TECHNICAL REQUIREMENTS
    - Frameworks
    - Styling system
    - State/data assumptions
    - Constraints (no backend, mock data, etc.)

13. FILE STRUCTURE
    - Suggested scalable folder structure. Return 

14. ACCEPTANCE CRITERIA
    - Visual
    - Functional
    - Responsiveness
    - Code quality expectations

END THE RESPONSE WITH:
“The planning part complete.”

IMPORTANT:
- Be concise but complete.
- No filler, no marketing language.
- This is a real production UI spec, not a tutorial.
`

export const PLANNING_SAMPLE = `
1. UI IDEA & PRODUCT VISION
   - High-level concept: A modern, welcoming coffee shop website showcasing menu, location, and shop story, with easy access to menu, contact, and visiting information.
   - Target user mindset: Curious locals and visitors seeking menu, ambiance, shop hours, or to contact/order ahead.
   - Experience goals: Inviting, easy navigation, information-forward, mobile-friendly.

2. PRODUCT BRIEF
   - Goal: Present the coffee shop’s brand, menu, and essential information while promoting in-person visits.
   - Primary users: Coffee lovers, patrons seeking a new café, and locals searching for opening hours/menu.
   - Jobs To Be Done:
     - Browse drinks & food menu.
     - Find shop location and hours.
     - Learn shop background/story.
     - Contact or locate shop via map link.
   - Success metrics: Users can (1) easily find menu, (2) access location/hours, (3) engage with the shop’s brand.

3. SCOPE DEFINITION
   - MUST HAVE:
    - Homepage with intro & highlights
    - Menu page displaying drinks & food
    - About/story page
    - Location & hours page
    - Header navigation
    - Contact section/form (no backend)
   - SHOULD HAVE:
    - Gallery of shop imagery
    - Testimonials
    - Social links (non-functional)
  - WON’T HAVE:
    - Online ordering/reservation
    - Real API/db connections (uses mock data)
    - User accounts

4. ROUTING STRUCTURE
   - /
     - Landing/homepage: intro, highlights, latest
   - /menu
     - Full coffee & food menu
   - /about
     - Shop story, values, team
   - /location
     - Address, map, hours, contact form
   - (404 page)
     - For unmatched routes

5. DESIGN DIRECTION
   - Mood keywords: Warm, welcoming, artisanal, casual, approachable
   - Visual inspiration: Scandinavian coffee shops, earthy tones, minimal design with cozy imagery, modern sans/serif blend, accent wood textures.
   - Core design principles: Clarity, warmth, approachability, hierarchy-first, mobile-led.

6. TYPOGRAPHY
  - Font strategy: Serif display for headings, readable sans-serif for body.
  - Suggested font families: 
  - Headings: "Playfair Display", "Georgia"
  - Body: "Inter", "Roboto", "Lato"
  - Size scale: 
  - H1: 2.5rem, H2: 2rem, H3: 1.5rem, Body: 1rem, Small: 0.875rem

7. COLOR & THEME
   - Base background colors: #F6F3F1 (warm off-white)
   - Surface/card colors: #FFFFFF, #EFE7DE (sand-light brown)
   - Accent color strategy: Deep coffee brown (#6F4E37), plus soft olive green (#546A4A)
   - Text hierarchy colors: 
     - Primary: #3C2E23 (dark brown)
     - Secondary: #6F4E37 (accent brown)
     - Muted: #A89F91
   - State colors:
     - Success: #62C370 (soft green)
     - Error: #E05A47 (terra cotta red)

8. VISUAL STYLE
   - Layout patterns: Card grid for menu, hero for home, split layout for about/location
   - Border radius: Medium (8px)
   - Shadows: Subtle soft shadow for elevation (menu cards/image overlays)
   - Imagery usage: High-quality shop photos, menu item images
   - Spacing philosophy: Ample whitespace, 16/24px vertical rhythm, no dense clusters.

9. MOTION & INTERACTIONS
   - Animation philosophy: Gentle, subtle reveals/fade-ins, restrained movement
   - Hover states: Card/image lift, underline on nav links, light shadow grow
   - Page transitions: Soft fade/slide between major routes
   - Libraries: Framer Motion for transitions (if React)

10. FINAL UI TO BUILD
    - Pages:
      1. Homepage
      2. Menu
      3. About
      4. Location & Contact
      5. 404 Not Found
    - Reusable components:
      - Header (nav)
      - Footer (socials, copyright)
      - MenuCard
      - GalleryImage
      - TestimonialCard
      - ContactForm (static)
      - Section container/layout

11. TYPESCRIPT MODELS
    
    interface MenuItem {
      id: string
      name: string
      description: string
      price: string
      image?: string
      type: 'drink' | 'food'
    }

    interface Testimonial {
      id: string
      name: string
      text: string
    }

    interface ContactFormData {
      name: string
      email: string
      message: string
    }
    

12. TECHNICAL REQUIREMENTS
    - Frameworks: React (assumed), no backend, no real API calls (static/mock data)
    - Styling system: CSS Modules or styled-components (per preference)
    - State/data: All mock data, no persistence
    - Constraints: No user login, no dynamic content, must be responsive

13. FILE STRUCTURE
    
    /src
      /components
        Header.tsx
        Footer.tsx
        MenuCard.tsx
        GalleryImage.tsx
        TestimonialCard.tsx
        ContactForm.tsx
        Section.tsx
      /pages
        Home.tsx
        Menu.tsx
        About.tsx
        Location.tsx
        NotFound.tsx
      /data
        menuItems.ts
        testimonials.ts
      /assets
        (images, logo)
      /models
        menu.ts
        testimonial.ts
        contact.ts
      /styles
        (base styles/theme)
      App.tsx
      index.tsx
    

14. ACCEPTANCE CRITERIA
    - Visual: Matches mood, typography, and color schemes; uses brand-appropriate images; clear mobile and desktop layouts.
    - Functional: All nav links work; menu lists display correctly; 404 reached for unknown routes; contact form UI collects and displays validation (no submission).
    - Responsiveness: Mobile-first, adapts gracefully to any screen size.
    - Code quality: Component-based, type-safe, DRY principles, stateless where possible, clean structure, organized mock data imports.
`
