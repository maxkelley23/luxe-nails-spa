import dynamic from "next/dynamic"
import { ToastProvider } from "@/components/toast-provider"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section-improved"
import { ServicesSection } from "@/components/services-section"
import { AnnouncementBar } from "@/components/announcement-bar"
import { LoadingAnimation } from "@/components/loading-animation"

// Dynamic imports for below-the-fold components
const GallerySection = dynamic(() => import("@/components/gallery-section").then(mod => ({ default: mod.GallerySection })), {
  loading: () => <div className="py-20 bg-gradient-to-br from-pink-50 to-purple-50" />,
})

const BookingSection = dynamic(() => import("@/components/booking-section-improved").then(mod => ({ default: mod.BookingSection })), {
  loading: () => <div className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-white" />,
})

const ReviewsSection = dynamic(() => import("@/components/reviews-section").then(mod => ({ default: mod.ReviewsSection })), {
  loading: () => <div className="py-20 bg-white" />,
})

const SocialProofSection = dynamic(() => import("@/components/social-proof-section").then(mod => ({ default: mod.SocialProofSection })), {
  loading: () => <div className="py-20 bg-gradient-to-r from-pink-50 to-purple-50" />,
})

const PricingSection = dynamic(() => import("@/components/pricing-section-improved").then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-white" />,
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white py-20" />,
})

const EmailPopup = dynamic(() => import("@/components/email-popup-improved").then(mod => ({ default: mod.EmailPopup })), {
  ssr: false,
})

const ScrollToTop = dynamic(() => import("@/components/scroll-to-top").then(mod => ({ default: mod.ScrollToTop })), {
  ssr: false,
})

const FloatingBookingButton = dynamic(() => import("@/components/floating-booking-button-improved").then(mod => ({ default: mod.FloatingBookingButton })), {
  ssr: false,
})

const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button").then(mod => ({ default: mod.WhatsAppButton })), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black p-2 rounded z-50"
      >
        Skip to main content
      </a>
      <ToastProvider />
      <LoadingAnimation />
      <AnnouncementBar />
      <main className="min-h-screen" id="main-content">
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <BookingSection />
        <ReviewsSection />
        <SocialProofSection />
        <PricingSection />
        <Footer />
      </main>
      <EmailPopup />
      <ScrollToTop />
      <FloatingBookingButton />
      <WhatsAppButton />
    </>
  )
}
