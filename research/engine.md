# Yamaha 200AETO (6G6) research - 18 Oct 2026
Confidence tags: [S]=sourced via web search this session, [K]=my background knowledge, unverified. Check against the Yamaha service manual for 6G5/6G6 (LIT-18616-xx series) before cutting any wiring.

## 1. Engine background
- 90-degree V6, 2,596 cc, carburetted (3 carbs, each feeding a pair of cylinders), 200 hp @ ~5000 rpm, oil injection ("Precision Blend" pre-mix style auto-blend). [S]
- Production code: 6G5 -> 6G6 is the early-to-mid 1990s family. A rib.net thread dates a 200 BETO 6G6 to 1995. Model letters (A/B...) = shaft/variant; E = electric start, T = power trim/tilt, O = oil injection. Estimate your engine ~1992-96; 200 2-strokes (2.6L) were replaced by the 3.1L (E/L200 later) then HPDI/VMAX. [S partial, rest K]
- Year decoding: the serial prefix after the 6G6 code is a sequence number; the production-code-to-year map is in Yamaha's serial table (rib.net thread "Help! Yamaha 200 2-stroke model/serial number interpretation" covers it but returned 403). Pull the serial from the transom plate and ask a Yamaha dealer to decode; a number alone is not a reliable year.
- Weight: dry ~178-186 kg depending on shaft length (L ~516 mm, X ~642 mm). [S] Gemini's 215 kg is FALSE (too high, unless it means rigged with oil/prop/leg).
- Fuel: [K, rough] ~35-45 L/h at WOT, ~20-25 L/h at 4000 rpm cruise on a 6.1 m hull; forum quote 40-50 L/h WOT for a 200 VMAX-class 2-stroke. [S weak]
- Reputation [K]: a robust, simple old-school V6; parts are largely proven. Weak points: CDI/power pack units (2), stator/charge coils, rectifier/regulator, oil injection pump + lines, overheating from stuck thermostats/impeller, and water-pump/seal wear. Many owners disable Precision Blend and run 50:1 pre-mix.
- Parts AU 2026 [K]: good availability of aftermarket (Sierra, Quicksilver-equivalents, seals/gaskets, impellers, plugs). NOS or reman CDI/power packs: eBay, Yamaha dealers' obsolete-list, wreckers (Outboard Motor Services-type shops), USA suppliers. Ignition electronics are the likely scarce items.

## 2. Gemini claims
a. Kill wire is Black/Yellow, Yamaha uses White: PARTLY/UNCERTAIN. On Yamaha remote-control harnesses and key switches, Black/Yellow is generally the engine-stop (magneto) circuit that gets grounded via the key OFF/lanyard switch; White appears on some other/older Yamaha CDI wiring and generic CDI stop-wire descriptions. Mercury's kill wire is also Black/Yellow, so "B/Y is Mercury only" is wrong. Web results: "white wire from CDI to stop switch" is a generic CDI description; a manual notes "black wire with yellow stripe may be specified". Verify using the 6G6 wiring diagram. [S weak + K]
b. "No spark on all cylinders is almost always the interlock/kill circuit": PARTLY TRUE. It is the first, cheapest check, but dead-on-all-cylinders can also be stator/charge coils, both power packs, or a pulser failure. Unplugging the remote harness stop wire (B/Y at the engine harness) from the engine isolates the control box/lanyard.
c. Charge coil Brown & Blue, >100V cranking: PARTLY. Brown is a Yamaha charge-coil wire, but charge coil tests I found reference Brown to Brown/Yellow ~150V DVA minimum while cranking and some models Brown-to-Red 100V min. Blue was ~25V (lighting/pulser). So ">100 V" is plausible but the pairing and numbers vary; use the service manual table for the 6G6. Cranking speed needs >250-300 rpm. [S]
d. Compression 100-120 psi within 10%: PARTLY. Sources cite 110-130 psi good, ~125 psi typical for a late-80s 200, spread within 10-15%. Yamaha does not publish an official number in public sources. [S]
e. Starter fluid on a 2-stroke: PARTLY/DISCOURAGED. Brief use is possible, but ether strips cylinder-wall oil (dry scuffing risk), and can kick back. Preferred: a small shot of premixed fuel/fogging oil into the carb throats or fresh fuel. (No source found; K.)
f. Choke on the 703: PARTLY. The 703 box has a push-in-on-key electric choke (push key in = choke solenoid) and a neutral/fast-idle ("throttle only") lever lifted at neutral to open throttle for start-up without engaging gear. Procedure: neutral, lanyard in, key on, push key to choke for a few seconds while cranking, release as it fires. [K]
g. 215 kg: FALSE, ~180-186 kg. [S]
h. Main fuse 20-30A near starter solenoid: PARTLY. Yamaha uses a larger in-line fuse (typically 20A control circuit in the 703 harness/relay area and a separate main on battery lead); the fuse you found fixed power to trim/engine, so check anything else in series too. Verify value from the manual. [K]
i. Value: AUD $1,500-3,500 running / $500-1,200 non-runner: PLAUSIBLE but unverified; a clean running early-90s 200 usually sells $2,000-4,000; non-runners $500-1,000 for parts. [K]
j. 2022 Kia Carnival diesel: TRUE for the braked limit 2,000 kg and 200 kg towball download (unbraked 750 kg); FWD is TRUE. [S]

## 3. No-spark diagnostic order
Basics: fresh battery with >12V while cranking (>250 rpm needed), lanyard IN, key ON, shift in neutral (neutral switch/interlock on start but not on spark).
1. Unplug the engine-side stop/key leads from the remote harness (B/Y per diagram) and retest spark - isolates 703 box, key switch and lanyard.
2. Ohm the 703 key switch and lanyard: stop circuit should be open when key ON/lanyard in, closed (to ground) when OFF/removed. Corrosion in the box and a stuck lanyard clip are common.
3. Main harness plug (bullet/multi-pin) cleaning at the engine; check kill wire for chafing.
4. With a DVA/peak adapter: stator charge coil peak while cranking (service manual values, ~150V DVA seen in sources) - low means stator or flywheel magnets/key.
5. Pulser coil (trigger) peak voltage, then check each power pack (V6 has two CDI/power packs, one per bank). If only one bank sparks, suspect that pack; if neither, suspect charge coil/kill circuit.
6. Check ignition coils resistance (primary ~0.1-0.3 ohm, secondary a few kohm - confirm to manual) and plug caps.
7. Give up/call a mechanic if: peak voltages are low and you cannot resolve with wiring, both power packs test dead, or no spark after steps 1-5. Also stop if compression/seizure is suspected after long storage (check turning by hand with plugs out first).

## 4. Recommission checklist (mechanic) and cost estimate (Melbourne 2026)
- Drain and discard old fuel (varnish), clean tank, replace fuel lines/primer bulb, fuel filters. Pull and clean all 3 carbs (rebuild kits ~$30-60 each).
- Oil injection: test the pump flow, tank level/lines; decision usually to disable Precision Blend and run 50:1 pre-mix, or replace pump (~$300-600 parts) if seizing history is a concern.
- Plugs/compression test, fogged cylinders after pulling plugs and squirt oil; new plugs.
- Water pump impeller + housing, thermostats (2), anodes, gearbox oil, grease points, prop shaft seals, lower-unit pressure test, trim/tilt oil and seals check.
- Electrical: battery/cables, rectifier/regulator, stator, power packs if faulty; remote harness cleaning.
- Estimate (K): basic service + diagnosis $600-1,200; carb rebuilds $400-800; impeller kit $250-450 incl. labour; thermostats $150-250; ignition parts $300-1,200 each CDI; total typical recommission $1,500-3,500, up to $4,000+ with ignition + lower unit seals. Mobile callout $150-250 extra.

## 5. Mechanics near Heathmont 3135 (verify before calling)
- Regal Marine, 514 Canterbury Rd, Vermont VIC 3133: EXISTS (full service division, mechanical workshop; well-known 30+ years). [S] Brand dealer status not confirmed in results - ask whether they will take a 1990s 2-stroke.
- Outboard Motor Services, Unit 1, 13 Malvern St, Bayswater VIC 3153: EXISTS, ph (03) 9738 1311, Mon-Fri 8:30-5, Sat 9-12; services/repairs all marine engines. [S] Best match for an old carburetted 2-stroke.
- Streaker Marine, Bayswater: EXISTS (family-owned, Yamaha dealer since 1993, also Quintrex/Cruise Craft). [S] Phone not found; Yamaha dealer locator page lists it. Mountain Hwy/Michellan Ct addresses unconfirmed. Dealer workshops may be busy and prefer newer 4-strokes; ask.
- Martins Marine, Boronia: NOT CONFIRMED by search (no results). Treat as unverified.
- Casey Marine (mobile): NOT CONFIRMED by search (no results). Unverified.
- Other Yamaha-authorised options near the east/south-east (from Yamaha AU dealer listings): Fleet Marine (Chelsea Heights, big service centre), Central Marine (Hastings), R & M Marine Services (Rosebud), Geelong Boating Centre. [S] No Yamaha-authorised dealer in Ringwood/Croydon/Mitcham confirmed. Use the Yamaha AU dealer locator at yamaha-motor.com.au/find-a-dealer.

## Sources
- rib.net: Help! Yamaha 200 2-stroke model/serial interpretation (403 on fetch; snippet only): https://rib.net/forum/f36/help-yamaha-200-2-stroke-model-serial-number-interpretation-85168.html
- Yamaha global 200-85ps two strokes: https://global.yamaha-motor.com/business/outboards/products/2st/200-85/
- marineengine.com kill switch wire thread: https://marineengine.com/boat-forum/threads/wire-for-a-kill-switch.406415/
- CDI Electronics ignition troubleshooting: https://www.marineengine.com/parts/cdi-electronics-outboard-parts/outboard-ignition-troubleshooting/150/
- Kia Carnival towing (CarsGuide): https://www.carsguide.com.au/kia/carnival/towing-capacity/2022
- Regal Marine: https://regalmarine.boatpoint.com.au/about-us/
- Yamaha AU dealers: https://www.yamaha-motor.com.au/find-a-dealer/australia/
