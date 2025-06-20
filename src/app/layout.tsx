import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Motion Industries Incident Analysis / Prevention Concept',
  description: 'Incident Analysis and Prevention Concept Dashboard for Motion Industries - NAICS 423830, 423840',
  keywords: 'EHS, safety, Motion Industries, workplace safety, injury prevention, OSHA, industrial safety',
  authors: [{ name: 'EHS Analytics Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
