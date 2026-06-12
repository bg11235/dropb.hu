import Nav from '@/components/Nav'
import BcStrip from '@/components/BcStrip'
import { getLemezek, getHirek } from '@/lib/feeds'

// ISR: óránként újragenerálja az oldalt
export const revalidate = 3600

export default async function Home() {
  // Párhuzamosan hozzuk le az adatokat
  const [lemezek, hirek] = await Promise.all([
    getLemezek(100),
    getHirek(20),
  ])

  const topLemez = lemezek[0] || null
  const lemezLista = lemezek.slice(1, 8)
  const topCikk = hirek[0] || null
  const cikkLista = hirek.slice(1, 8)

  return (
    <>
      <Nav />
      <div className="vh">
        <div className="page top">
          <div className="three-col">

            {/* 1. HASÁB — Cikkek */}
            <div className="panel">
              <div className="panel-head">
                <span className="panel-title"><span className="init">C</span>ikkek</span>
                <a href="/hirek" className="more">Összes →</a>
              </div>
              {topCikk && (
                <a href={topCikk.link} className="sq" target="_blank" rel="noopener noreferrer">
                  {topCikk.image && (
                    <img className="sq-bg" src={topCikk.image} alt={topCikk.title} />
                  )}
                  <div className="sq-overlay" />
                  <div className="sq-body">
                    <p className="sq-band"><span className="glyph">☿</span>Kiemelt cikk</p>
                    <p className="sq-title">{topCikk.title}</p>
                    <p className="sq-meta">{topCikk.source} · {new Date(topCikk.date).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </a>
              )}
              {cikkLista.map((cikk, i) => (
                <a key={i} href={cikk.link} className="art" target="_blank" rel="noopener noreferrer">
                  <span className="art-img">
                    {cikk.image && <img src={cikk.image} alt="" loading="lazy" />}
                  </span>
                  <span>
                    <p className="eyebrow" style={{fontSize:'.56rem',marginBottom:'.1rem'}}><span className="glyph">☿</span>{cikk.source}</p>
                    <p className="art-title">{cikk.title}</p>
                  </span>
                  <span className="art-meta">{new Date(cikk.date).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}</span>
                </a>
              ))}
              <div style={{textAlign:'center',padding:'.65rem .85rem'}}>
                <a href="/hirek" className="more">Összes cikk →</a>
              </div>
            </div>

            {/* 2. HASÁB — Lemezek */}
            <div className="panel">
              <div className="panel-head">
                <span className="panel-title"><span className="init">F</span>riss lemezek</span>
                <a href="/lemezek" className="more">Mind a 100 →</a>
              </div>
              {topLemez && (
                <a href={topLemez.link} className="sq" target="_blank" rel="noopener noreferrer">
                  {topLemez.image && (
                    <img className="sq-bg" src={topLemez.image} alt={topLemez.title} />
                  )}
                  <div className="sq-overlay" />
                  <span className="sq-badge">1</span>
                  <div className="sq-body">
                    <p className="sq-band">{topLemez.source}</p>
                    <p className="sq-title"><em>{topLemez.title}</em></p>
                    <p className="sq-meta">{new Date(topLemez.date).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </a>
              )}
              {lemezLista.map((lemez, i) => (
                <a key={i} href={lemez.link} className="rec" target="_blank" rel="noopener noreferrer">
                  <span className="rec-thumb">
                    {lemez.image && <img src={lemez.image} alt="" loading="lazy" />}
                    <span className="rec-n">{i + 2}</span>
                  </span>
                  <span>
                    <span className="rec-band">{lemez.source}</span><br/>
                    <span className="rec-album">{lemez.title}</span>
                  </span>
                  <span className="rec-date">{new Date(lemez.date).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric' })}</span>
                </a>
              ))}
              <div style={{textAlign:'center',padding:'.65rem .85rem'}}>
                <a href="/lemezek" className="more">Mind a 100 lemez →</a>
              </div>
            </div>

            {/* 3. HASÁB — Koncertek (statikus egyelőre) */}
            <div className="panel">
              <div className="panel-head">
                <span className="panel-title"><span className="init">K</span>özelgő koncertek</span>
                <a href="/koncertek" className="more">Naptár →</a>
              </div>
              {/* Naptár és koncertlista — következő fázisban aggregáljuk */}
              <div style={{padding:'1rem .85rem',color:'var(--muted)',fontFamily:'var(--font-barlow)',fontSize:'.75rem',letterSpacing:'.1em',textTransform:'uppercase'}}>
                Koncert aggregátor — hamarosan
              </div>
              <div style={{textAlign:'center',padding:'.65rem .85rem'}}>
                <a href="/koncertek" className="more">Teljes naptár →</a>
              </div>
            </div>

          </div>
        </div>
        <BcStrip />
      </div>
      {/* TODO: Kritikák, Spotlight, Mélyfúrások szekciók */}
    </>
  )
}
