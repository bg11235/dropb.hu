# dropB — Stoner & Doom Magazin

Magyar nyelvű online magazin a stoner, doom és sludge metal kultúráról.

## Stack

- **Next.js 14** (App Router, ISR)
- **rss-parser** — feed aggregáció
- **CSS Modules** — dizájn

## Lokális fejlesztés

```bash
npm install
npm run dev
```

Az oldal elérhető: [http://localhost:3000](http://localhost:3000)

## GitHub feltöltés

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/FELHASZNÁLÓNEVED/dropb.git
git push -u origin main
```

## Vercel deploy

1. Menj a [vercel.com](https://vercel.com) oldalra
2. Kattints: **Add New Project**
3. Importáld a GitHub repót
4. Kattints: **Deploy** — kész

Minden `git push` után automatikusan újradeploy-ol.

## Feed források

| Forrás | URL | Típus |
|---|---|---|
| The Obelisk | theobelisk.net/obelisk/feed | Recenziók, hírek |
| Doom Charts | doomcharts.com/feed/ | Havi chartek |
| Bandcamp doom | bandcamp.com/tag/doom-metal | Új kiadások |
| Bandcamp stoner | bandcamp.com/tag/stoner-rock | Új kiadások |
| Heavy Blog | heavyblogisheavy.com/feed/ | Hírek |
| Doomed & Stoned | doomedandstoned.com/feed/ | Hírek |

## ISR (Incremental Static Regeneration)

Az oldal óránként (`revalidate = 3600`) automatikusan frissül — nem kell külön cron job vagy backend.

## Fejlesztési fázisok

- [x] Design — főoldal HTML prototípus
- [x] Next.js projekt váz
- [x] RSS aggregátor (`/lib/feeds.js`)
- [ ] Aloldalak (kritika, interjú, cikk)
- [ ] Koncert aggregátor
- [ ] Sanity CMS integráció (saját tartalom)
- [ ] Keresés
