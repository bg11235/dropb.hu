import './globals.css'

export const metadata = {
  title: 'dropB — Stoner & Doom Magazin',
  description: 'Magyar nyelvű online magazin a stoner, doom és sludge metal kultúráról.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  )
}
