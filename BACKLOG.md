# Gorn Fishing — Backlog

Single source of truth for what's been asked for, what's done, and what's next.
Last updated: Sunday 18th October 2026 (v1.1).

Legend: ✅ done · 🟡 in progress / partial · ⬜ to do · 🧊 parked / nice-to-have

---

## 1. Original brief (Travis, 18-10-2026) — every item tracked

| # | Ask | Status | Notes |
|---|-----|--------|-------|
| 1 | New public PWA, shareable with CoPCO | ✅ | github.com/Travis-coder712/gorn-fishing → travis-coder712.github.io/gorn-fishing |
| 2 | Based on existing PWAs | ✅ | Single-file pattern from Pour Over Club (manifest, network-first SW, icons) |
| 3 | App called **Gorn Fishing** | ✅ | |
| 4 | CoPCO logo for merch | ✅ | 4 logos: Badge, Retro '87, Crest, Uncle Uncle Approved stamp + 2-colour print version + 3000px PNGs |
| 5 | Crew: Merv, Ace, Northy, Bouncing | ✅ | `CREW` array in index.html |
| 6 | Directory for photos + Gemini chat | ✅ | `inbox/` (gitignored). 18 curated photos published to `photos/` (EXIF/GPS stripped; rego papers with owner name/address deliberately NOT published) |
| 7 | **Boat section** — everything we know, history, assumed value | ✅ | Identity, specs, builder history, value table, good-for/not, inspection checklist, 18 photos |
| 8 | Explore the boat's history, value, good for / not | ✅ | Caribbean 205 Commodore, International Marine (Scoresby, est. 1958). As-is ~$4–8k; running ~$9–15k |
| 9 | Examples of what it looked like new | 🟡 | **Travis to ring Caribbean (03 9763 7233)** quoting Model P209 / s/n 2513 — build year + brochure. Fallbacks: Trove, ANMM, Pride President 20.5, Ausfish |
| 10 | Realities of fishing: towing capacity | ✅ | Rig ~1.7–2.1t est.; Kia Carnival borderline; calculator. Real weight needs a weighbridge |
| 11 | Hints and tricks | ✅ | On the Water tab |
| 12 | Boat licence, fishing licence, rego, insurance — what, cost, easiest, how long | ✅ | Get Legal tab |
| 13 | Port Phillip Bay; nearest ramp to Seaford; maybe Mornington | ✅ | Patterson River = home ramp; Mornington under upgrade (check reopened) |
| 14 | Maiden voyage supplies + what to check | ✅ | Tick-list + pre-departure checks |
| 15 | **Getting the boat ready** tab | ✅ | Test-day log, no-spark steps, Heathmont mechanics |
| 16 | Gemini chat — check & verify accuracy | ✅ | Fact-check table in Get it Ready |
| 17 | Fishing season guide — what when, weather | ✅ | Seasons tab |
| 18 | Watch conditions / when fishing is good, automated | ✅ | Gorn Index (Open-Meteo, live on open). 🧊 push alerts ("Saturday looks great") — needs a scheduled job |
| 19 | Scrape a fishing website/service | 🧊 | Decided against scraping (ToS/CORS); link out to VFA/BOM instead |
| 20 | Money tracker | ✅ | Split 4 ways + settle-up. 🧊 live shared sync (could reuse the vote Worker) |
| 21 | To-do list | ✅ | Now / Before maiden / Shopping / Someday |
| 22 | Upgrade options; boat cover cost & where | ✅ | Upgrades tab |
| 23 | Do up the cabin on the cheap — ideas, layout, fridge, examples, how-to, cost | 🟡 | Live; **todo:** add Caribbean-specific refit examples (The Captain Invader rebuild, Trade-a-Boat project) |

## 2. Second round (Travis, 18-10-2026)

| # | Ask | Status | Notes |
|---|-----|--------|-------|
| 24 | Use photos + Gemini chat as content | ✅ | |
| 25 | Own deep research: boat history, style, value | ✅ | `research/boat.md`, `research/engine.md` |
| 26 | First thing in app: members choose preferred logo | ✅ | Welcome screen on first open (who are you + logo pick) |
| 27 | Merch mockups: hats, tees, polos, fishing jackets, golf gear, beer holders — each logo | ✅ | 8 products × 4 logos, colour swatches |
| 28 | Members vote | ✅ | Live shared voting via Cloudflare Worker `copco-votes` |
| 29 | Add to Studio + Dashboard | ✅ | |
| 30 | README + backlog | ✅ | This file + README.md |

## 3. Next up (suggested order)
1. 🙋 **Travis:** ring Caribbean (03 9763 7233) — Model P209, s/n 2513 → build year, original spec, brochure/photos. Feed answers back here.
2. ⬜ **Shared kitty + to-dos** — reuse the `copco-votes` Worker so all four phones see the same expenses and jobs (right now each phone keeps its own).
3. ⬜ **Caribbean refit examples** in Upgrades (The Captain Invader rebuild ~$35k, Trade-a-Boat 1976 Invader $32,450 breakdown, Ausfish restored-cruiser thread) + a Commodore-specific cabin plan.
4. ⬜ **Boat name poll** — same voting engine as the logo.
5. ⬜ **Mechanic outcome** — when the brother reports back: diagnosis, compression numbers, transom verdict → update value, stage bar (→ Service), kitty.
6. ⬜ **Merch order helper** — once votes settle: sizes per member, quotes from a local printer/embroiderer, cost per head into the kitty.
7. 🧊 Push alerts for good fishing days (scheduled Worker cron → ntfy/email).
8. 🧊 Trip & catch log with photos (needs Worker + R2 storage).

## 4. Open questions for the crew
- Purchase price agreed with Uncle Uncle?
- Whose name goes on the rego?
- Which mechanic: Outboard Motor Services (Bayswater) vs Streaker (Bayswater, Yamaha dealer) vs Regal (Vermont) vs JV Marine (Braeside — the original dealer)?
- Tow vehicle? (Carnival is borderline — who has a Ranger/Prado-class car?)
- Boat name!
