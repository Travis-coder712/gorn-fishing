# Gorn Fishing 🎣

The official app of **CoPCO — the Co-operative of Pleasure Craft Owners**: Merv, Ace, Northy and Bouncing, four mates who went quarter-shares on a 1980s **Caribbean 205 Commodore** (International Marine, Scoresby) with a Yamaha V6 200 two-stroke, bought from Bouncing's Uncle Uncle.

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
| **Conditions** | Live **Gorn Index** 0–100 (wind, gusts, waves, tide, pressure, moon, season) for Carrum/Frankston/Mornington |
| **Money** | Expenses split four ways with settle-up |
| **To-do** | Now / Before maiden voyage / Shopping / Someday |
| **Upgrades** | Cover, cabin refit, fridge, fishing gear, budget tiers, voting wishlist |
| **Merch & Vote** | 4 logos × 8 products (cap, tee, polo, spray jacket, stubby holder, golf towel, golf ball, burgee) — live shared voting |

## How it's built
- `index.html` — the whole app (no build step). Content lives in data arrays at the top of the script: `CREW`, `BOAT_PHOTOS`, `BOAT_FACTS`, `BOAT_TIMELINE`, `READY_LOG`, `STAGE_NOW`, `MONTHS`, `LOGOS`, `PRODUCTS`, `SEED_TODOS`.
- `sw.js` — network-first service worker. **Bump `CACHE` when assets change.**
- `assets/` — CoPCO logos (SVG source, PNG, 3000px print PNGs, 2-colour screen-print version).
- `photos/` — curated boat photos (resized, EXIF/GPS stripped). Rego papers are deliberately not published (owner name/address).
- `research/` — deep-research notes on the boat (`boat.md`) and engine (`engine.md`), with sources.
- `worker/` — **copco-votes** Cloudflare Worker + KV (`https://copco-votes.travishughes-836.workers.dev`). `GET /votes`, `POST /vote {member, logo, items}` — one record per member; plus the shared kitty/to-dos (below). Deploy: `cd worker && npx wrangler deploy`. Reset votes: `npx wrangler kv key put --binding=VOTES --remote votes '{}'`.
- `inbox/` — **gitignored** drop zone for raw photos / chat exports.
- Money, to-dos and the upgrade wishlist are **shared live** via the Worker (`GET /state`, `POST /op {coll, op}`); changes queue offline and flush in order; daily KV backups. Checklists and the Gorn Index cache stay per phone.
- Conditions: Open-Meteo forecast + marine APIs (keyless, CORS), cached 30 min. Tide timing is modelled — indicative only.

## Backlog
See [BACKLOG.md](BACKLOG.md) — every ask from the crew, its status, and what's next.

Built with Claude Code. Facts tagged *est.* / *verify* — check official sources before relying on them.
