import Parser from 'rss-parser'

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'dropB/1.0 (https://dropb.hu)' },
})

// ── FEED SOURCES ──────────────────────────────────────────────────
const FEEDS = {
  lemezek: [
    {
      name: 'The Obelisk',
      url: 'https://theobelisk.net/obelisk/feed',
      type: 'review',
    },
    {
      name: 'Doom Charts',
      url: 'https://doomcharts.com/feed/',
      type: 'chart',
    },
    {
      name: 'Bandcamp — doom metal',
      url: 'https://bandcamp.com/tag/doom-metal?sort_field=date&format=rss',
      type: 'release',
    },
    {
      name: 'Bandcamp — stoner rock',
      url: 'https://bandcamp.com/tag/stoner-rock?sort_field=date&format=rss',
      type: 'release',
    },
  ],
  hirek: [
    {
      name: 'The Obelisk',
      url: 'https://theobelisk.net/obelisk/feed',
      type: 'news',
    },
    {
      name: 'Heavy Blog Is Heavy',
      url: 'https://www.heavyblogisheavy.com/feed/',
      type: 'news',
    },
    {
      name: 'Doomed & Stoned',
      url: 'https://doomedandstoned.com/feed/',
      type: 'news',
    },
  ],
}

// ── KULCSSZÓ SZŰRŐ ────────────────────────────────────────────────
const KEYWORDS = [
  'doom', 'stoner', 'sludge', 'fuzz', 'drone', 'psych',
  'desert rock', 'heavy psych', 'post-metal', 'doom metal',
  'electric wizard', 'sleep', 'kyuss', 'truckfighters',
]

function isRelevant(item) {
  const text = `${item.title} ${item.contentSnippet || ''} ${item.categories?.join(' ') || ''}`.toLowerCase()
  return KEYWORDS.some(kw => text.includes(kw))
}

// ── FEED FETCH ────────────────────────────────────────────────────
async function fetchFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url)
    return parsed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      date: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      source: feed.name,
      type: feed.type,
      image: item.enclosure?.url || item['media:thumbnail']?.['$']?.url || null,
      excerpt: item.contentSnippet?.slice(0, 200) || '',
    }))
  } catch (err) {
    console.error(`Feed hiba [${feed.name}]:`, err.message)
    return []
  }
}

// ── DEDUP ─────────────────────────────────────────────────────────
function dedup(items) {
  const seen = new Set()
  return items.filter(item => {
    const key = item.title.toLowerCase().replace(/\s+/g, '')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// ── PUBLIC API ────────────────────────────────────────────────────

/** Legfrissebb lemezek/recenziók — max `limit` db */
export async function getLemezek(limit = 100) {
  const results = await Promise.allSettled(FEEDS.lemezek.map(fetchFeed))
  const all = results.flatMap(r => r.status === 'fulfilled' ? r.value : [])
  const filtered = all.filter(isRelevant)
  const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  return dedup(sorted).slice(0, limit)
}

/** Legfrissebb hírek — max `limit` db */
export async function getHirek(limit = 20) {
  const results = await Promise.allSettled(FEEDS.hirek.map(fetchFeed))
  const all = results.flatMap(r => r.status === 'fulfilled' ? r.value : [])
  const filtered = all.filter(isRelevant)
  const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  return dedup(sorted).slice(0, limit)
}
