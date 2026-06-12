import { Playfair_Display, Barlow_Condensed, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata = {
  title: 'dropB — Stoner & Doom Magazin',
  description: 'Magyar nyelvű online magazin a stoner, doom és sludge metal kultúráról. Kritikák, interjúk, magyar scéna.',
  openGraph: {
    title: 'dropB — Stoner & Doom Magazin',
    description: 'Riffek, amelyek alatt beszakad a föld.',
    url: 'https://dropb.hu',
    siteName: 'dropB',
    locale: 'hu_HU',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${playfair.variable} ${barlow.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
