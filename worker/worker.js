// CoPCO server — tiny Cloudflare Worker + KV.
//   Votes:  GET /votes · POST /vote {member, logo, items}  — one record per member.
//   Shared: GET /state · POST /op {coll, op, item|id|items} — kitty, to-dos and the upgrade wishlist,
//           shared by every phone. Ops are applied server-side one at a time so two phones can't clobber each other.
const MEMBERS = ['merv', 'ace', 'bouncing', 'mervson', 'northy'];
const COLLS = ['expenses', 'todos', 'wish', 'names', 'sizes', 'trips'];
const MAX_PHOTO = 1_500_000; // bytes — the app shrinks photos to ~1600px JPEG first
const MAX_ITEMS = 500;
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const SPECIES_MAX = 30;
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });
const clean = s => String(s || '').slice(0, 24).replace(/[^a-z0-9-]/gi, '');

// Whitelist + trim each collection's fields so the store only ever holds what the app expects.
function sanitise(coll, x) {
  const str = (v, n = 200) => String(v ?? '').slice(0, n);
  const id = clean(x.id) || Date.now().toString(36);
  if (coll === 'expenses') {
    const amt = Math.round(Number(x.amt) * 100) / 100;
    if (!(amt > 0 && amt < 1e6) || !MEMBERS.includes(x.who)) return null;
    const split = (Array.isArray(x.split) ? x.split : []).filter(m => MEMBERS.includes(m));
    if (!split.length) return null;
    return { id, what: str(x.what, 120), amt, who: x.who, cat: str(x.cat, 40), date: str(x.date, 10), split, mode: x.mode === 'share' ? 'share' : 'equal', by: MEMBERS.includes(x.by) ? x.by : '' };
  }
  if (coll === 'todos') return { id, t: str(x.t), who: str(x.who, 40), list: str(x.list, 40), done: !!x.done };
  if (coll === 'names') return { id, t: str(x.t, 60), by: MEMBERS.includes(x.by) ? x.by : '', voters: (Array.isArray(x.voters) ? x.voters : []).filter(m => MEMBERS.includes(m)) };
  if (coll === 'sizes') {
    if (!MEMBERS.includes(x.id)) return null;
    const sz = v => str(v, 6), n = v => Math.max(0, Math.min(50, Math.round(Number(v) || 0)));
    return { id: x.id, tee: sz(x.tee), polo: sz(x.polo), jacket: sz(x.jacket), cap: n(x.cap), stubby: n(x.stubby), towel: n(x.towel), balls: n(x.balls) };
  }
  if (coll === 'trips') {
    const who = (Array.isArray(x.who) ? x.who : []).filter(m => MEMBERS.includes(m));
    const catches = (Array.isArray(x.catches) ? x.catches : []).slice(0, 100).map(c => ({
      species: str(c.species, SPECIES_MAX), len: Math.max(0, Math.min(300, Math.round(Number(c.len) || 0))),
      by: MEMBERS.includes(c.by) ? c.by : '', kept: !!c.kept,
    }));
    const photos = (Array.isArray(x.photos) ? x.photos : []).slice(0, 12).map(clean).filter(Boolean);
    return { id, date: str(x.date, 10), ramp: str(x.ramp, 40), spot: str(x.spot, 80), who, hours: Math.max(0, Math.min(24, Number(x.hours) || 0)),
      score: Math.max(0, Math.min(100, Math.round(Number(x.score) || 0))), notes: str(x.notes, 1000), catches, photos, by: MEMBERS.includes(x.by) ? x.by : '' };
  }
  if (coll === 'wish') return { id, t: str(x.t, 120), v: Math.max(0, Math.min(999, Math.round(Number(x.v) || 0))) };
  return null;
}

async function loadState(env) {
  const st = (await env.VOTES.get('state', 'json')) || { rev: 0 };
  for (const c of COLLS) if (st[c] === undefined) st[c] = null;
  return st;
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(req.url);

    if (url.pathname === '/votes' && req.method === 'GET') {
      return json((await env.VOTES.get('votes', 'json')) || {});
    }
    if (url.pathname === '/vote' && req.method === 'POST') {
      const b = await req.json().catch(() => null);
      if (!b || !MEMBERS.includes(b.member)) return json({ error: 'unknown member' }, 400);
      const items = {};
      for (const [k, v] of Object.entries(b.items || {}).slice(0, 20)) items[clean(k)] = clean(v);
      const all = (await env.VOTES.get('votes', 'json')) || {};
      all[b.member] = { logo: clean(b.logo), items, at: new Date().toISOString() };
      await env.VOTES.put('votes', JSON.stringify(all));
      return json(all);
    }

    if (url.pathname === '/state' && req.method === 'GET') return json(await loadState(env));

    // Trip photos — JPEGs stored straight in KV (well under KV's 25 MB value limit).
    if (url.pathname === '/photo' && req.method === 'POST') {
      const buf = await req.arrayBuffer();
      const b = new Uint8Array(buf);
      if (buf.byteLength > MAX_PHOTO || b[0] !== 0xff || b[1] !== 0xd8) return json({ error: 'JPEG under 1.5 MB only' }, 400);
      const pid = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      await env.VOTES.put('photo-' + pid, buf);
      return json({ id: pid });
    }
    const pm = url.pathname.match(/^\/photo\/([a-z0-9-]{1,24})$/i);
    if (pm && req.method === 'GET') {
      const img = await env.VOTES.get('photo-' + pm[1], 'arrayBuffer');
      if (!img) return new Response('not found', { status: 404, headers: cors });
      return new Response(img, { headers: { ...cors, 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' } });
    }

    if (url.pathname === '/op' && req.method === 'POST') {
      const b = await req.json().catch(() => null);
      if (!b || !COLLS.includes(b.coll)) return json({ error: 'bad collection' }, 400);
      const st = await loadState(env);
      const list = st[b.coll] || [];
      if (b.op === 'seed') {
        // Only fills an empty collection — the first phone online donates its list.
        if (st[b.coll] === null) st[b.coll] = (b.items || []).slice(0, MAX_ITEMS).map(x => sanitise(b.coll, x)).filter(Boolean);
      } else if (b.op === 'upsert') {
        const x = sanitise(b.coll, b.item || {});
        if (!x) return json({ error: 'invalid item' }, 400);
        const i = list.findIndex(y => y.id === x.id);
        if (i >= 0) list[i] = x; else if (list.length < MAX_ITEMS) list.unshift(x);
        st[b.coll] = list;
      } else if (b.op === 'delete') {
        const gone = list.find(y => y.id === clean(b.id));
        if (b.coll === 'trips' && gone) for (const p of gone.photos || []) await env.VOTES.delete('photo-' + p);
        st[b.coll] = list.filter(y => y.id !== clean(b.id));
      } else if (b.op === 'toggle' && b.coll === 'names') {
        // Approval voting: a member can back as many names as they like, once each.
        const n = list.find(y => y.id === clean(b.id));
        if (n && MEMBERS.includes(b.member)) n.voters = n.voters.includes(b.member) ? n.voters.filter(m => m !== b.member) : [...n.voters, b.member];
        st[b.coll] = list;
      } else if (b.op === 'vote' && b.coll === 'wish') {
        const w = list.find(y => y.id === clean(b.id));
        if (w) w.v = Math.min(999, (w.v || 0) + 1);
        st[b.coll] = list;
      } else return json({ error: 'bad op' }, 400);
      st.rev = (st.rev || 0) + 1;
      st.updated = new Date().toISOString();
      await env.VOTES.put('state', JSON.stringify(st));
      // Daily snapshot so a bad edit can be rolled back by hand.
      const day = 'backup-' + st.updated.slice(0, 10);
      if (!(await env.VOTES.get(day))) await env.VOTES.put(day, JSON.stringify(st), { expirationTtl: 60 * 60 * 24 * 60 });
      return json(st);
    }

    return json({ ok: true, service: 'copco' });
  },
};
