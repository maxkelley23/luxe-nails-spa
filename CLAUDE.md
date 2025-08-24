# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 web application for Luxe Nails & Spa, a luxury nail salon. The application uses React 19, TypeScript, Tailwind CSS v4, and shadcn/ui components.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start

# Run linting
pnpm lint
```

## Architecture

### Technology Stack
- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 with CSS variables
- **Component Library**: shadcn/ui (New York style)
- **Fonts**: Playfair Display (serif) and Inter (sans-serif)
- **Icons**: Lucide React

### Project Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - React components organized by feature
- `/components/ui` - shadcn/ui components
- `/lib` - Utility functions and shared logic
- `/hooks` - Custom React hooks
- `/public` - Static assets including images

### Key Configuration Notes
- TypeScript path alias: `@/*` maps to project root
- Build errors are currently ignored (eslint and TypeScript)
- Images are unoptimized in production build
- Using Tailwind CSS v4 with PostCSS configuration

### Component Architecture
The main page (`app/page.tsx`) is composed of distinct section components:
- LoadingAnimation - Initial page load animation
- AnnouncementBar - Top promotional banner
- Navigation - Main navigation menu
- HeroSection - Landing hero with CTA
- ServicesSection - Service offerings
- GallerySection - Image gallery showcase
- BookingSection - Appointment booking interface
- ReviewsSection - Customer testimonials
- SocialProofSection - Trust indicators
- PricingSection - Service pricing
- Footer - Site footer
- EmailPopup - Email collection modal
- ScrollToTop - Back to top button
- FloatingBookingButton - Persistent booking CTA

### Styling Conventions
- Uses Tailwind CSS utility classes
- Custom gradient classes defined in globals.css
- Component-specific styling uses cn() utility from lib/utils
- Consistent use of color tokens for brand colors (pink, purple, gold)
- Responsive design with mobile-first approach