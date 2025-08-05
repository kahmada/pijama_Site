import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Beuty's Secret - Luxury Lingerie & Fashion",
  description: "Discover the perfect fit with Beuty's Secret premium lingerie, pajamas, and fashion collections. Shop the latest trends in comfort and style.",
  keywords: "Beuty's Secret, lingerie, pajamas, fashion, luxury, comfort, style, women's clothing",
  authors: [{ name: "Beuty's Secret" }],
  creator: "Beuty's Secret",
  publisher: "Beuty's Secret",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://Beutyssecret.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Beuty's Secret - Luxury Lingerie & Fashion",
    description: "Discover the perfect fit with Beuty's Secret premium lingerie, pajamas, and fashion collections.",
    url: 'https://Beutyssecret.com',
    siteName: "Beuty's Secret",
    images: [
      {
        url: '/images/hero-model.png',
        width: 1200,
        height: 630,
        alt: 'Beuty\'s Secret Luxury Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Beuty's Secret - Luxury Lingerie & Fashion",
    description: "Discover the perfect fit with Beuty's Secret premium lingerie, pajamas, and fashion collections.",
    images: ['/images/hero-model.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#E5AFA8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily: 'var(--font-geist-sans)',
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
