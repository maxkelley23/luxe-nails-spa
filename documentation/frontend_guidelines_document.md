# Frontend Guideline Document

This document explains how the Luxe Nails Spa web application’s frontend is built and organized. It covers the overall setup, design principles, styling choices, component structure, state handling, routing, performance tips, testing, and a final summary. Everyone—from designers and product folks to new developers—should be able to understand how the frontend works and why.

## 1. Frontend Architecture

### Frameworks and Libraries
- **Next.js 13 (App Router)**  
  We use Next.js with its App Router to define pages and layouts based on your file structure. This gives us:
  - File-system routing (just add a folder or file under `app/`).
  - Built-in server-side rendering (SSR) and static site generation (SSG) for speed and SEO.

- **React & TypeScript**  
  The app is written in React, with TypeScript for type safety. This helps us catch mistakes early and makes the code easier to refactor and maintain.

- **shadcn/ui (Radix UI primitives)**  
  A ready-made component library built on Radix UI. It provides styled buttons, cards, forms, menus, sliders, and more, so we don’t have to reinvent common UI patterns.

### How It Supports Scalability, Maintainability, and Performance
- **Scalability**: New pages and features are mostly self-contained in `app/` or `components/ui/`. You can add routes or components without touching existing files.
- **Maintainability**: TypeScript enforces clear contracts for component props. The component library ensures consistent look and behavior across the site.
- **Performance**: Next.js handles code splitting, lazy loading, and image optimization automatically. We pre-render pages at build time whenever possible.

## 2. Design Principles

### Key Principles
1. **Usability**  
   Interfaces are simple and intuitive. Navigation is obvious, and interactive elements (buttons, links) give clear feedback.
2. **Accessibility (A11y)**  
   We follow WCAG 2.1 AA guidelines: semantic HTML, proper ARIA labels, keyboard navigation, and sufficient color contrast.
3. **Responsiveness**  
   Layouts adapt fluidly to all screen sizes, from mobile to large desktop.
4. **Consistency**  
   We stick to a shared design language—colors, typography, spacing—so every page feels part of the same spa brand.

### Applying These Principles
- Navigation menus collapse into a hamburger menu on mobile but stay visible on desktop.
- Forms have inline validation messages and use semantic `<label>` and `<input>` pairs.
- All images include `alt` text and lazy-loading for faster page speeds.
- Buttons, cards, and other components come from our shared `components/ui/` library.

## 3. Styling and Theming

### Styling Approach
- **Global CSS (`globals.css`) + BEM-style naming**  
  We keep base styles, CSS variables, and font imports in one global stylesheet. For component-specific tweaks, we use BEM-like class names (block, element, modifier).

- **CSS Variables**  
  Define brand colors and spacing in `:root` so themes can be adjusted easily.

### Theming
We handle themes through CSS variables. To switch themes (e.g., light/dark), you only update a handful of variables:
```css
:root {
  --color-primary: #E3BCCB;
  --color-secondary: #4A4A4A;
  --color-accent: #F7E1DF;
  --color-background: #FFFFFF;
  --color-text: #333333;
  --color-border: #E0E0E0;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Lato', sans-serif;
}
```

### Style & Look
- **Overall Style**: Modern minimal with a light, airy feel and subtle glassmorphism effects (translucent panels, soft shadows).
- **Color Palette**:
  - Primary: #E3BCCB (Soft Pink)
  - Secondary: #4A4A4A (Dark Charcoal)
  - Accent: #F7E1DF (Pale Peach)
  - Background: #FFFFFF (White)
  - Text: #333333 (Charcoal)
  - Borders & Lines: #E0E0E0 (Light Gray)

- **Fonts**:
  - Headings: Playfair Display (elegant, spa-friendly)
  - Body: Lato (clean and readable)

## 4. Component Structure

### Organization
- **`components/ui/`**: A library of reusable components (buttons, cards, accordions, carousels, forms, menus, sliders, etc.).
- **`app/`**: Pages and layouts. Each folder under `app/` corresponds to a route.

### Reuse and Composition
- Components are built to be composable: a `Card` can contain an `Image`, `Text`, and a `Button` for calls to action.
- Shadcn/ui primitives come pre-styled but accept props and class names for overrides.

### Benefits of Component-Based Architecture
- **Encapsulation**: Styles and logic stay together, reducing side effects.
- **Consistency**: The same component looks and behaves identically wherever it’s used.
- **Speed**: Building new pages is faster—assemble existing components rather than start from scratch.

## 5. State Management

### Approach
- **Local State**: Handled with React’s `useState` and `useReducer` for small, component-level interactions (e.g., toggling an accordion or menu).
- **Context API**: Used sparingly for global concerns like theme mode or authenticated user info (future phases).

### Why Not a Heavy Library?
This version of the app is mostly static content. We only have light interactivity, so Context and hooks are enough. If global data needs grow, we can introduce a lightweight library like Zustand or Redux Toolkit.

## 6. Routing and Navigation

### Routing
- **Next.js App Router**: Files under `app/` map directly to routes. For example:
  - `app/page.tsx` → `/`
  - `app/services/page.tsx` → `/services`
  - `app/gallery/page.tsx` → `/gallery`
  - `app/contact/page.tsx` → `/contact`

- **Nested Layouts**: Shared layout elements (header, footer) live in `app/layout.tsx`, so every page automatically includes them.

### Navigation Structure
- **Desktop**: Horizontal header with links to Home, Services, Gallery, Contact Us.
- **Mobile**: Hamburger icon opens a full-screen sheet menu using `Sheet` from shadcn/ui.
- **Active Link Styling**: We highlight the current page’s link in the header and menu for clear orientation.

## 7. Performance Optimization

### Strategies
1. **Pre-rendering**: Use SSG for public pages so they load instantly from CDN.
2. **Image Optimization**: Next.js `Image` component automatically resizes, compresses, and lazy-loads images.
3. **Code Splitting**: Next.js only sends the JavaScript needed for the current page.
4. **Dynamic Imports**: Heavy or rarely used components (like a map or analytics widget) can be loaded on demand.
5. **Minimize CSS**: Keep `globals.css` lean and use BEM to avoid selector bloat.

### Benefit to Users
Faster load times (aim for First Contentful Paint under 1.5s), smoother scrolling, and quick transitions—all of which keep visitors engaged.

## 8. Testing and Quality Assurance

### Testing Strategies
- **Unit Tests**: Test individual components with Vitest and React Testing Library. Verify rendering, props handling, and user interactions.
- **Integration Tests**: Combine several components or test a full page render to ensure they work together correctly.
- **End-to-End (E2E) Tests**: Simulate user flows (e.g., navigating pages, submitting the contact form) using Cypress or Playwright to catch real-world issues.

### Tools and Frameworks
- **Vitest**: Fast unit test runner with built-in mocking and coverage reports.
- **React Testing Library**: Simple API for testing React components from a user’s perspective.
- **Cypress / Playwright**: Automate browser testing for critical flows (gallery carousel, form submission).
- **ESLint & Prettier**: Enforce consistent code style and catch common errors.

## 9. Conclusion and Overall Frontend Summary

The Luxe Nails Spa frontend is built with modern, battle-tested tools—Next.js, React, TypeScript, and shadcn/ui. Its component-based structure, clear design principles, and performance optimizations ensure a user-friendly, accessible, and maintainable site. With global styling and theming via CSS variables, we achieve a cohesive, spa-like look that can evolve easily. Light state management and file-based routing keep the code simple and scalable. Finally, a solid testing strategy guarantees confidence in every release.

This setup aligns perfectly with the project’s goals: fast loading times, SEO-friendly pages, a polished brand experience, and a foundation ready for future enhancements like booking integration or user accounts.