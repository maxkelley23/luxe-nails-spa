import { ToastProvider } from "@/components/toast-provider"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section-improved"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { BookingSection } from "@/components/booking-section-improved"
import { ReviewsSection } from "@/components/reviews-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { PricingSection } from "@/components/pricing-section-improved"
import { Footer } from "@/components/footer"
import { AnnouncementBar } from "@/components/announcement-bar"
import { EmailPopup } from "@/components/email-popup-improved"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingBookingButton } from "@/components/floating-booking-button-improved"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LoadingAnimation } from "@/components/loading-animation"

export default function Home() {
  return (
    <>
      <ToastProvider />
      <LoadingAnimation />
      <AnnouncementBar />
      <main className="min-h-screen">
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
