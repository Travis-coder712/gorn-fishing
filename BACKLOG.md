# Gorn Fishing — Backlog

Single source of truth for what's been asked for, what's done, and what's next.
Last updated: Sunday 18th October 2026 (v1.1).

Legend: ✅ done · 🟡 in progress / partial · ⬜ to do · 🧊 parked / nice-to-have

---

## 1. Original brief (Merv, 18-10-2026) — every item tracked

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
| 9 | Examples of what it looked like new | 🟡 | **Merv to ring Caribbean (03 9763 7233)** quoting Model P209 / s/n 2513 — build year + brochure. Fallbacks: Trove, ANMM, Pride President 20.5, Ausfish |
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
| 20 | Money tracker | ✅ | Split 4 ways + settle-up, shared live across phones |
| 21 | To-do list | ✅ | Now / Before maiden / Shopping / Someday |
| 22 | Upgrade options; boat cover cost & where | ✅ | Upgrades tab |
| 23 | Do up the cabin on the cheap — ideas, layout, fridge, examples, how-to, cost | ✅ | Plus real Caribbean rebuilds and a phased Commodore cabin plan |

## 2. Second round (Merv, 18-10-2026)

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
1. 🙋 **Merv:** ring Caribbean (03 9763 7233) — Model P209, s/n 2513 → build year, original spec, brochure/photos. Feed answers back here.
2. ✅ **Shared kitty + to-dos + wishlist** — `GET /state`, `POST /op` on the `copco-votes` Worker; offline queue; daily KV backups (`backup-YYYY-MM-DD`, 60 days).
3. ✅ **Caribbean refit examples** + a phased Commodore cabin plan (Upgrades tab).
4. ✅ **Boat name poll** — approval voting, shared (`names` collection), 10 seed names, anyone can add.
5. ⬜ **Mechanic outcome** — when the brother reports back: diagnosis, compression numbers, transom verdict → update value, stage bar (→ Service), kitty.
6. 🟡 **Merch order helper** — ✅ sizes & quantities per member (shared `sizes` collection), est. prices, cost per head, shareable order for the printer. ⬜ Real quotes from a local embroiderer once the logo vote settles.
7. ❌ Push alerts — not wanted (Merv, 18-10-2026).
8. ✅ **Trip & catch log** — trips (date, ramp, spot, crew, hours, notes), catches (species, cm, who, kept/released, under-size warning), up to 12 photos per trip (shrunk on-phone to ≤1600px JPEG, stored in KV via `POST /photo`, `GET /photo/:id`), leaderboard (biggest of each species, top anglers), last-trip card on Home. Shared.

## 3b. Third round (Merv, 18-10-2026)
| # | Ask | Status |
|---|---|---|
| 31 | Start shared kitty/to-dos | ✅ |
| 32 | Rename: Travis → Merv, Jason → Ace (crew nicknames everywhere) | ✅ (no Jason mentions existed) |
| 33 | Explain why a 4-stroke is an "upgrade" | ✅ "Keep the two-stroke, or repower?" card on the Boat tab |

## 3c. Fourth round (Merv, 18-10-2026)
| # | Ask | Status |
|---|---|---|
| 34 | Drop the exit/buy-out clause → **tontine** (last one alive owns the boat) | ✅ Draft tontine — named **"The Commodore's Folly"** (joint tenancy with right of survivorship) in Get Legal — needs a solicitor's one-pager |
| 35 | Northy not over the line — don't call him a 25% owner | ✅ Shown as HOLDOUT, unsigned, 12.5% held open |
| 36 | Add Merv's son as a part share; Northy + Merv's son halves of the 4th share | ✅ Merv/Ace/Bouncing 25% each, Merv's son 12.5%, Northy 12.5% (unsigned). Kitty splits by share; Northy left out of default splits until he signs |

## 3d. Fifth round (Merv, 18-10-2026)
| # | Ask | Status |
|---|---|---|
| 37 | Is merch realistic? Quality vs cheap items, costs | ✅ Answered; realistic prices + suppliers in app (`research/` not needed) |
| 38 | Name the tontine "The Commodore's Folly" | ✅ |
| 39 | App version so we can tell if we're on the latest | ✅ v1.6.0 — footer + More sheet + update bar via `version.json` |

## 3e. Sixth round (self-directed, 18-10-2026)
| # | Item | Status |
|---|---|---|
| 40 | **Boat calendar** — plan trips, RSVP (in/maybe/out), Gorn Index per planned day, "Log this trip" → trip log | ✅ v1.7.0 (`plans`) |
| 41 | **Upkeep & renewals** — rego, insurance, service, impeller, bearings, flares, extinguisher, lifejackets, EPIRB; overdue/soon flags, "Done" rolls the date forward | ✅ v1.7.0 (`upkeep`) |
| 42 | Lapsed rego research → boat rego **cancelled** (>3 months), register fresh; trailer UVP | ✅ in Get Legal, Upkeep, To-do (`research/rego-and-photos.md`) |
| 43 | Photos of sister Commodores (1980 listing, JV Marine, Pride President threads) | ✅ Boat tab |

## 4. Open questions for the crew
- When Flash / Northy sign: flip `signed:true` in `CREW`. If neither commits, the 4th quarter is split three ways (or sold?).
- Solicitor for the tontine one-pager? (joint tenancy can be severed by notice/bankruptcy — agreement + wills matter)
- Whose name goes on the rego?
- Which mechanic: Outboard Motor Services (Bayswater) vs Streaker (Bayswater, Yamaha dealer) vs Regal (Vermont) vs JV Marine (Braeside — the original dealer)?
- Boat name!

## 3f. Seventh round (Merv, 18-10-2026)
| # | Item | Status |
|---|---|---|
| 51 | Brother = **Ace**; Merv's son = **Flash**; price **$12k**; **Ace tows** | ✅ app + shared to-dos updated; $12k flagged as top-of-range → make subject to mechanic's report |
| 52 | Rebrand app to **Retro '87** (logo, icon, colours) | ✅ v1.8.0 — vote now only decides merch placement |

## 3g. Eighth round (Merv, 18-10-2026)
| # | Ask | Status |
|---|---|---|
| 53 | Conditions tab: what's running now, bait, depth, habitat (shallows/weed/reef), where | ✅ v1.9.0 "What's running" card (`data/species-guide.json`) |
| 54 | Pleasure-craft destinations: seals, swim spots, lunch stops, + no-fishing zones & hazards | ✅ v1.9.0 Leaflet map + list with run time & fuel cost (`data/spots.json`; pins checked against OpenStreetMap — Chinaman's Hat & Mud Islands corrected) |

| 55 | Flash → not committed (same as Northy) | ✅ v1.9.1 — kitty default split now Merv/Ace/Bouncing ⅓ each |

| 56 | Navigation: photo viewer (swipe/arrows, counter, captions, ✕ / swipe-down / back closes), ‹ Back button, real history (phone back works), bottom **Menu** = jump-to-anything | ✅ v1.10.0 |

## 5. Should look deeper (self-review, 18-10-2026)
| # | Item | Why it matters | Status |
|---|---|---|---|
| 44 | **Shared data can lose edits** — KV is eventually consistent; two phones saving within ~a minute can overwrite each other (kitty!). Move `/state` + `/op` to a Durable Object or D1 | Silent data loss in the money tracker | ⬜ recommended next |
| 45 | **Anyone with the URL can edit/vandalise** shared data (public app on Studio) — add a crew PIN checked by the Worker | Data integrity | ⬜ |
| 46 | **Bag/size limits not verified** (also: species guide bait/depth data partly from model recall) — gummy, calamari, flathead, salmon flagged "check" (VFA site blocked the research fetcher) | Fines | ⬜ verify via browser |
| 47 | **Trailer brakes & real weight** — does the Dunbier have brakes (required >750kg; breakaway >2t)? ATM plate? | Legal to tow at all | ⬜ needs a photo of the compliance plate / drawbar |
| 48 | **Where does she live?** Storage at Heathmont vs Seaford, council rules on boats in driveways/streets, paid storage near Patterson River | Ongoing cost + practicality | ⬜ research |
| 49 | **Gorn Index not validated** — coarse marine model, modelled tides, hand-tuned thresholds | Trust in the go/no-go | 🧊 tune against logged trips |
| 50 | Studio/Dashboard cards still describe v1.1 | Cosmetic | ✅ v1.8 |
