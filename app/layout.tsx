import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ProdSafe - Security Scanning for AI-Generated Code",
  description:
    "Scan your AI-generated code for security vulnerabilities in 60 seconds. Get plain-English fixes you can paste into ChatGPT or Claude.",
  keywords: "security scanning, AI code, vulnerability detection, code security",
  authors: [{ name: "ProdSafe Team" }],
  creator: "ProdSafe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prodsafe.com",
    siteName: "ProdSafe",
    title: "ProdSafe - Security Scanning for AI-Generated Code",
    description: "Scan your AI-generated code for security vulnerabilities in 60 seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProdSafe - Security Scanning for AI-Generated Code",
    description: "Scan your AI-generated code for security vulnerabilities in 60 seconds.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter antialiased min-h-screen bg-background">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
