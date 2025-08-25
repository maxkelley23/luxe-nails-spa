import toast from "react-hot-toast"

// Smooth scroll to section with offset for fixed navigation
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const yOffset = -80; // Offset for fixed navigation bar
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  } else {
  }
}

// Handle booking button clicks
export const handleBookingClick = () => {
  scrollToSection('booking')
  toast("📅 Select your preferred date and time below", {
    duration: 3000,
    style: {
      background: 'linear-gradient(to right, #ec4899, #a855f7)',
      color: 'white',
    },
  })
}

// Handle service button clicks
export const handleServicesClick = () => {
  scrollToSection('services')
}

// Handle pricing button clicks
export const handlePricingClick = () => {
  scrollToSection('pricing')
}

// Handle gallery button clicks
export const handleGalleryClick = () => {
  scrollToSection('gallery')
}

// Handle call button clicks
export const handleCallClick = () => {
  window.location.href = 'tel:5551234567'
  toast("📞 Calling (555) 123-NAILS...", {
    duration: 3000,
    style: {
      background: '#059669',
      color: 'white',
    },
  })
}

// Handle email submission (for footer newsletter)
export const handleNewsletterSubmit = (email: string) => {
  toast.success("✅ Welcome to our VIP list! Check your email for exclusive offers.", {
    duration: 5000,
    style: {
      background: 'linear-gradient(to right, #10b981, #059669)',
      color: 'white',
    },
  })
}

// Handle social media clicks
export const handleSocialClick = (platform: string) => {
  const urls: Record<string, string> = {
    instagram: 'https://instagram.com/luxenailsspa',
    facebook: 'https://facebook.com/luxenailsspa',
    tiktok: 'https://tiktok.com/@luxenailsspa'
  }
  
  if (urls[platform]) {
    window.open(urls[platform], '_blank')
  }
}