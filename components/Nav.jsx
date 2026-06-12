'use client'
import { useState } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

const links = [
  { href: '/hirek',          label: 'Hírek' },
  { href: '/kritikak',       label: 'Kritikák' },
  { href: '/interju',        label: 'Interjúk' },
  { href: '/magyar-scena',   label: 'Magyar scéna' },
  { href: '/mufajtortenet',  label: 'Műfájtörténet' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        drop<b>B</b>
      </Link>
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
        ))}
      </ul>
      <span className={`${styles.right} ${open ? styles.open : ''}`}>
        <span className={styles.motto}>Riffek, amelyek alatt beszakad a föld</span>
        <input
          type="search"
          className={styles.searchBox}
          placeholder="Keresés…"
          aria-label="Keresés"
        />
        <button
          className={styles.searchBtn}
          aria-label="Keresés"
          onClick={() => setOpen(o => !o)}
        >⌕</button>
      </span>
    </nav>
  )
}
