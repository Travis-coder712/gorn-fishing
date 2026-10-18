# Gorn Fishing — Backlog

Single source of truth for what's been asked for, what's done, and what's next.
Last updated: Sunday 18th October 2026.

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
| 7 | **Boat section** — everything we know, history, assumed value | 🟡 | v1 placeholders live; deep research done (`research/boat.md`, `research/engine.md`) → **needs writing into the Boat tab** |
| 8 | Explore the boat's history, value, good for / not | 🟡 | Researched: Caribbean 205 Commodore by International Marine (Scoresby, est. 1958, Spooner family, still operating). Value as-is ~$4–8k; running ~$9–15k. Write into app. |
| 9 | Examples of what it looked like new | ⬜ | No brochure found yet. Next: ring Caribbean (03 9763 7233) quoting Model P209 / s/n 2513; search Trove/ANMM/old Modern Boating; ask Ausfish |
| 10 | Realities of fishing: towing capacity | 🟡 | Generic towing guide + "can my car tow it?" calculator live. Update with real rig weight (~1.7–2.1t est.) + Kia Carnival verdict (2,000kg braked — borderline/no) |
| 11 | Hints and tricks | ✅ | On the Water tab |
| 12 | Boat licence, fishing licence, rego, insurance — what, cost, easiest, how long | ✅ | Get Legal tab |
| 13 | Port Phillip Bay; nearest ramp to Seaford; maybe Mornington | ✅ | Patterson River = home ramp; Mornington under upgrade (check reopened) |
| 14 | Maiden voyage supplies + what to check | ✅ | Tick-list + pre-departure checks |
| 15 | **Getting the boat ready** tab | 🟡 | Live; needs Gemini chat story + verified engine findings + Heathmont-area mechanics |
| 16 | Gemini chat — check & verify accuracy | 🟡 | Read in full (share link). Verification done in `research/engine.md` — write corrections into app (e.g. engine ~180kg not 215kg; starter fluid discouraged; kill-wire colour unconfirmed) |
| 17 | Fishing season guide — what when, weather | ✅ | Seasons tab |
| 18 | Watch conditions / when fishing is good, automated | ✅ | Gorn Index (Open-Meteo, live on open). 🧊 push alerts ("Saturday looks great") — needs a scheduled job |
| 19 | Scrape a fishing website/service | 🧊 | Decided against scraping (ToS/CORS); link out to VFA/BOM instead |
| 20 | Money tracker | ✅ | Split 4 ways + settle-up. 🧊 live shared sync (could reuse the vote Worker) |
| 21 | To-do list | ✅ | Now / Before maiden / Shopping / Someday |
| 22 | Upgrade options; boat cover cost & where | ✅ | Upgrades tab |
| 23 | Do up the cabin on the cheap — ideas, layout, fridge, examples, how-to, cost | 🟡 | Live; add Caribbean-specific refit examples from research (The Captain Invader rebuild, Trade-a-Boat project) |

## 2. Second round (Travis, 18-10-2026)

| # | Ask | Status | Notes |
|---|-----|--------|-------|
| 24 | Use photos + Gemini chat as content | 🟡 | Photos in; Gemini content → Boat & Ready tabs (to write) |
| 25 | Own deep research: boat history, style, value | ✅ research / ⬜ in app | `research/boat.md` |
| 26 | First thing in app: members choose preferred logo | ✅ | Welcome screen on first open (who are you + logo pick) |
| 27 | Merch mockups: hats, tees, polos, fishing jackets, golf gear, beer holders — each logo | ✅ | 8 products × 4 logos, colour swatches |
| 28 | Members vote | 🟡 | Works per phone + share-to-group-chat. **Live shared voting** = Cloudflare Worker `worker/` (deploying once Travis's wrangler login works) |
| 29 | Add to Studio + Dashboard | ⬜ | |
| 30 | README + backlog | ✅ | This file + README.md |

## 3. Next up (suggested order)
1. ⬜ Deploy vote Worker → set `VOTE_API` in index.html → push.
2. ⬜ Write the Boat tab properly from `research/boat.md` (identity, history timeline, specs, value table, good-for/not, inspection checklist, photo gallery).
3. ⬜ Write the Gemini test-day story + verified corrections into Get it Ready; swap Seaford mechanics for Heathmont-area ones (boat is in Heathmont).
4. ⬜ Towing: Kia Carnival verdict + weighbridge task.
5. ⬜ Studio + Dashboard cards.
6. ⬜ Add to-dos: ring Caribbean re P209/s/n 2513; transom/stringer inspection; weighbridge; compression test; Precision Blend decision.
7. 🧊 Shared money/to-do via the Worker; push alerts for good fishing days; boat name poll; trip log / catch log with photos.

## 4. Open questions for the crew
- Purchase price agreed with Uncle Uncle?
- Whose name goes on the rego?
- Which mechanic: Outboard Motor Services (Bayswater) vs Streaker (Bayswater, Yamaha dealer) vs Regal (Vermont) vs JV Marine (Braeside — the original dealer)?
- Tow vehicle? (Carnival is borderline — who has a Ranger/Prado-class car?)
- Boat name!
