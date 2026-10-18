# Gorn Fishing 🎣

The official app of **CoPCO — the Co-operative of Pleasure Craft Owners**: Merv, Ace and Bouncing (25% each) — with Flash (Merv's son) and Northy's 12.5% each held open while they stand on the jetty — co-owners under **The Commodore's Folly** (our tontine) of a 1980s **Caribbean 205 Commodore** (International Marine, Scoresby) with a Yamaha V6 200 two-stroke, bought from Bouncing's Uncle Uncle.

**Live:** https://travis-coder712.github.io/gorn-fishing/ — open on your phone and *Add to Home Screen*.

## What's in it
| Tab | What |
|---|---|
| **Welcome** | First open: pick who you are + vote for the CoPCO logo |
| **Home** | Crew, progress stage, today's Gorn Index, kitty, next jobs |
| **The Boat** | Photos, identity & specs, builder history, value scenarios, good-for / not, pre-purchase inspection |
| **Get Legal** | Marine & fishing licences, rego, insurance, safety gear (Victoria) — costs, easiest route, timings |
| **On the Water** | Towing (incl. Kia Carnival verdict), ramps near Seaford, launching tips, maiden-voyage checklist |
| **Get it Ready** | Test-day log, Gemini fact-check, no-spark steps, mechanic checklist, mechanics near Heathmont |
| **Seasons** | Port Phillip Bay month by month, rigs, bag limits |
| **Conditions** | Live **Gorn Index** 0–100 for Carrum/Frankston/Mornington · **What's running now** (bait, rig, depth, habitat, where) · **Where to go** map — fishing, swim/anchor, seals & dolphins, lunch stops, no-fishing zones, hazards (`data/*.json`) |
| **Money** | Expenses split four ways with settle-up |
| **To-do** | Now / Before maiden voyage / Shopping / Someday |
| **Upgrades** | Cover, cabin refit, fridge, fishing gear, budget tiers, voting wishlist |
| **Calendar** | Plan trips, RSVP, Gorn Index for each planned day — shared |
| **Upkeep** | Rego/insurance/service/safety-gear renewals with overdue flags — shared |
| **Trip Log** | Trips, catches (with min-size warnings), photos, leaderboard — shared |
| **Votes & Merch** | 4 logos × 8 products (cap, tee, polo, spray jacket, stubby holder, golf towel, golf ball, burgee) — live shared voting; boat-name poll; merch order (sizes, cost per head) |

## How it's built
- `index.html` — the whole app (no build step). Content lives in data arrays at the top of the script: `CREW`, `BOAT_PHOTOS`, `BOAT_FACTS`, `BOAT_TIMELINE`, `READY_LOG`, `STAGE_NOW`, `MONTHS`, `LOGOS`, `PRODUCTS`, `SEED_TODOS`.
- `sw.js` — network-first service worker. **Bump `CACHE` when assets change.**
- **Versioning:** `APP_VERSION` in index.html **and** `version.json` must be bumped together each release. The footer and More sheet show the version; the app checks `version.json` on open and shows a yellow "New version — tap to update" bar if the phone is behind.
- **Branding:** Retro '87 is the official look (cream/brown/orange/gold from the boat's livery) — `assets/copco-logo-retro-tight.svg` in the header, `icon.svg` → icon PNGs.
- `assets/` — CoPCO logos (SVG source, PNG, 3000px print PNGs, 2-colour screen-print version).
- `photos/` — curated boat photos (resized, EXIF/GPS stripped). Rego papers are deliberately not published (owner name/address).
- `research/` — deep-research notes on the boat (`boat.md`) and engine (`engine.md`), with sources.
- `worker/` — **copco-votes** Cloudflare Worker + KV (`https://copco-votes.travishughes-836.workers.dev`). `GET /votes`, `POST /vote {member, logo, items}` — one record per member; plus the shared kitty/to-dos (below). Deploy: `cd worker && npx wrangler deploy`. Reset votes: `npx wrangler kv key put --binding=VOTES --remote votes '{}'`.
- `inbox/` — **gitignored** drop zone for raw photos / chat exports.
- Money, to-dos, the upgrade wishlist, boat-name poll, merch sizes and the trip log are **shared live**; trip photos live in KV (`POST /photo`, `GET /photo/:id`) via the Worker (`GET /state`, `POST /op {coll, op}`); changes queue offline and flush in order; daily KV backups. Checklists and the Gorn Index cache stay per phone.
- Conditions: Open-Meteo forecast + marine APIs (keyless, CORS), cached 30 min. Tide timing is modelled — indicative only.

## Backlog
See [BACKLOG.md](BACKLOG.md) — every ask from the crew, its status, and what's next.

Built with Claude Code. Facts tagged *est.* / *verify* — check official sources before relying on them.
