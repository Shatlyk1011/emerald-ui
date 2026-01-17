'use client'
import Together from 'together-ai'
import { SYSTEM_PROMPT } from '@/lib/constants'
import { PLANNING_PROMPT } from '../../public/prompts'

const part1 = `
### 1. UI IDEA & PRODUCT VISION
- **High-level concept**: A modern, visually-driven coffee shop landing page that emphasizes aesthetics, minimalism, and user engagement. It should feel premium, inviting, and functional.
- **Target user mindset**: Coffee enthusiasts, casual visitors, and potential customers looking for ambiance, menu options, location, and hours.
- **Experience goals**: Smooth navigation, quick access to key info (menu, location, hours), visual appeal with high-quality imagery, and clear calls to action (e.g., "View Menu", "Find Us").

### 2. PRODUCT BRIEF
- **Goal**: Showcase the coffee shop’s brand, menu, and location while driving foot traffic and online engagement.
- **Primary users**: Local customers, tourists, coffee lovers.
- **Jobs To Be Done**: 
  - Browse menu items and prices.
  - Find location and operating hours.
  - Learn about the shop’s story or ethos.
  - Contact or follow on social media.
- **Success metrics**: Time on page, click-through rates to menu/location, low bounce rate.

### 3. SCOPE DEFINITION
- **MUST HAVE**: Hero section, menu preview, location/hours, footer with contact/social.
- **SHOULD HAVE**: About section, gallery/imagery, newsletter signup.
- **WON’T HAVE**: E-commerce, user accounts, backend API calls, database integration (static mock data only).

### 4. ROUTING STRUCTURE
- Single-page application (SPA) with no routing—all content on one scrollable page.
- Anchor links for navigation: #hero, #menu, #about, #location, #contact.

### 5. DESIGN DIRECTION
- **Mood keywords**: Warm, minimalist, organic, modern, inviting.
- **Visual inspiration**: Clean layouts with ample whitespace, high-resolution coffee product shots, natural textures (wood, ceramic), subtle animations.
- **Core design principles**: Consistency in spacing and typography, mobile-first responsiveness, focus on imagery and readability.

### 6. TYPOGRAPHY
- **Font strategy**: Serif for headings (elegance), sans-serif for body (readability).
- **Suggested font families**: 
  - Headings: "Playfair Display" or "Cormorant Garamond".
  - Body: "Inter" or "Open Sans".
- **Size scale guidance**: Base font size 16px, heading scale: h1 3rem, h2 2.25rem, h3 1.5rem.

### 7. COLOR & THEME
- **Base background colors**: Light neutral (e.g., #faf7f2 for warm off-white).
- **Surface/card colors**: Slightly darker neutrals (e.g., #f0ebe3) with subtle shadows.
- **Accent color strategy**: Earth tones—deep brown (#5d4037), warm terracotta (#c86b49), or olive green (#6a994e) for buttons and highlights.
- **Text hierarchy colors**: Dark gray (#333333) for body, black for headings.
- **State colors**: Success (#4caf50), error (#f44336), muted gray for disabled.

### 8. VISUAL STYLE
- **Layout patterns**: Full-width hero, grid for menu items, two-column for about/location, centered footer.
- **Border radius**: 8px for cards and buttons, 0 for containers.
- **Shadows**: Soft, subtle shadows for cards (e.g., box-shadow: 0 4px 12px rgba(0,0,0,0.05)).
- **Imagery usage**: High-quality, warm-toned photos of coffee, interiors, and products; use as full-width backgrounds or in grids.
- **Spacing philosophy**: Consistent padding/margin scale (e.g., 8px base unit), generous whitespace between sections.

### 9. MOTION & INTERACTIONS
- **Animation philosophy**: Subtle and purposeful—fade-ins on scroll, smooth hover effects.
- **Hover states**: Slight scale or color transition for buttons/cards.
- **Page transitions**: None (single page).
- **Libraries**: Consider Framer Motion for scroll animations if needed, but keep lightweight.

### 10. FINAL UI TO BUILD
- **Pages**: 
  1. Index (landing page with all sections).
- **Reusable components**:
  - Header (with logo and nav links)
  - Hero section
  - Menu preview card
  - Hours/location card
  - Footer

### 11. TYPESCRIPT MODELS
- Interfaces for:
  - MenuItem: { id: number, name: string, description: string, price: number, imageUrl: string }
  - ShopHours: { day: string, hours: string }[]
  - Location: { address: string, mapUrl?: string }

### 12. TECHNICAL REQUIREMENTS
- **Frameworks**: React (with Vite or Create React App), TypeScript.
- **Styling system**: CSS Modules or styled-components for scoped styles.
- **State/data assumptions**: Static mock data for menu, hours, location; no backend.
- **Constraints**: No API calls, all data hardcoded or imported from local files.

### 13. FILE STRUCTURE
src/
  components/
    Header/
      Header.tsx
      Header.module.css
    Hero/
      Hero.tsx
      Hero.module.css
    MenuPreview/
      MenuPreview.tsx
      MenuPreview.module.css
    About/
      About.tsx
      About.module.css
    Location/
      Location.tsx
      Location.module.css
    Footer/
      Footer.tsx
      Footer.module.css
  data/
    menuItems.ts
    shopInfo.ts
  types/
    index.ts
  App.tsx
  index.css (global styles)

### 14. ACCEPTANCE CRITERIA
- **Visual**: Matches design direction; consistent typography, colors, spacing.
- **Functional**: All sections render with mock data; navigation links work.
- **Responsiveness**: Mobile-first, responsive on all screen sizes.
- **Code quality**: Clean, reusable components; TypeScript interfaces; well-structured CSS.
`

const together = new Together({
  apiKey: 'tgp_v1_JMzZOUYRzIVIrCc9YsyOddKzb2U9WkWVJdwW1olj-io',
})

export async function generateReactApp(userRequest: string) {
  // const planningResponse = await together.chat.completions.create({
  //   messages: [
  //     {
  //       role: 'system',
  //       content: PLANNING_PROMPT,
  //     },
  //     {
  //       role: 'user',
  //       content: userRequest,
  //     },
  //   ],

  //   model: 'deepseek-ai/DeepSeek-V3.1',
  // })

  // const data = planningResponse.choices[0].message?.content

  // console.log('data 1', data)

  if (true) {
    const components = await together.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: part1,
        },
      ],
      // temperature: 0.5,
      max_tokens: 20000,
      model: 'deepseek-ai/DeepSeek-V3.1',
    })
    console.log('data 2', components)

    return components.choices[0].message?.content
  }

  // const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

  // // Use Gemini 2.5 models for "Thinking" and better coding
  // const result = await ai.models.generateContent({
  //   model: 'gemini-2.5-pro',
  //   contents: [{ role: 'user', parts: [{ text: userRequest }] }],
  //   config: {
  //     responseMimeType: 'application/json',
  //     responseJsonSchema: {
  //       fileName: 'Path e.g. /components/Header.tsx',
  //       content: 'The full React/JSX source code with Tailwind',
  //     },
  //     // Thinking config allows the AI to plan the component structure first
  //     thinkingConfig: { includeThoughts: true },
  //   },
  // })
  // console.log('result', result)
  // if (result?.data) {
  //   const webApp = JSON.parse(result.data)
  //   return webApp
  // }

  return 'No result'
}
