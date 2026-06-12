'use client'
import { useEffect, useRef } from 'react'
import styles from './BcStrip.module.css'

export default function BcStrip() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    function onScroll() {
      const r = el.getBoundingClientRect()
      const elC = r.top + r.height / 2, vpC = window.innerHeight / 2
      const raw = 1 - Math.min(Math.abs(elC - vpC) / (window.innerHeight / 2), 1)
      const t = Math.min(raw / 0.55, 1)
      el.style.transform = `scale(${(1 + 0.1 * t).toFixed(4)})`
      el.style.setProperty('--grow', t.toFixed(3))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={styles.strip} ref={ref}>
      <div className={styles.inner}>
        <svg className={styles.logo} viewBox="0 0 360 50" xmlns="http://www.w3.org/2000/svg" aria-label="Bandcamp">
          <path fill="#1DA0C3" d="M89.6 0 62.8 50H0L26.8 0z"/>
          <text x="100" y="38" fontFamily="Helvetica,Arial,sans-serif" fontSize="38" fontWeight="bold" fill="#1DA0C3" letterSpacing="-1">bandcamp</text>
        </svg>
        <p className={styles.text}>
          A streamelés nem tartja el a zenekarokat — <b>a lemezvásárlás igen.</b>
        </p>
        <div className={styles.links}>
          <a href="https://bandcamp.com/tag/stoner-rock" className={styles.btn} target="_blank" rel="noopener noreferrer">
            Magyar zenekarok Bandcampen
          </a>
          <a href="https://bandcamp.com" className={styles.btn} target="_blank" rel="noopener noreferrer">
            Bandcamp Friday: júl. 3.
          </a>
        </div>
      </div>
    </div>
  )
}
