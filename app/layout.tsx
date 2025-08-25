import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Luxe Nails & Spa - Premium Nail Care Experience",
  description:
    "Experience luxury nail care with our premium services, expert technicians, and relaxing spa atmosphere. Book your appointment today.",
  generator: "v0.app",
  keywords: "nail salon, manicure, pedicure, gel extensions, nail art, luxury spa, nail care",
  authors: [{ name: "Luxe Nails & Spa" }],
  creator: "Luxe Nails & Spa",
  publisher: "Luxe Nails & Spa",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxenailsspa.com",
    title: "Luxe Nails & Spa - Premium Nail Care Experience",
    description: "Experience luxury nail care with our premium services, expert technicians, and relaxing spa atmosphere. Book your appointment today.",
    siteName: "Luxe Nails & Spa",
    images: [
      {
        url: "/luxury-nail-salon-interior-with-pink-and-purple-li.png",
        width: 1200,
        height: 630,
        alt: "Luxe Nails & Spa Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Nails & Spa - Premium Nail Care Experience",
    description: "Experience luxury nail care with our premium services, expert technicians, and relaxing spa atmosphere. Book your appointment today.",
    images: ["/luxury-nail-salon-interior-with-pink-and-purple-li.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Luxe Nails & Spa",
    description: "Premium nail care experience with expert technicians and luxury spa atmosphere",
    url: "https://luxenailsspa.com",
    telephone: "(555) 123-NAILS",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Luxury Lane",
      addressLocality: "Beverly Hills",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US"
    },
    openingHours: [
      "Mo-Fr 09:00-19:00",
      "Sa 09:00-18:00",
      "Su 10:00-17:00"
    ],
    priceRange: "$25-$150",
    image: "https://luxenailsspa.com/luxury-nail-salon-interior-with-pink-and-purple-li.png",
    serviceType: ["Manicure", "Pedicure", "Nail Art", "Gel Extensions", "Nail Care"]
  }

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
