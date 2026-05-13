import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'wdth'],
})

const interTight = Inter_Tight({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Voyage — A studio for hospitality brands',
  description: 'We don\'t make content. We make the language a brand uses to speak to the world.',
  openGraph: {
    title: 'Voyage — A studio for hospitality brands',
    description: 'We don\'t make content. We make the language a brand uses to speak to the world.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=75',
        width: 1200,
        height: 630,
        alt: 'Voyage — A studio for hospitality brands',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voyage — A studio for hospitality brands',
    description: 'We don\'t make content. We make the language a brand uses to speak to the world.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${interTight.variable} ${jetbrains.variable} bg-background`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
