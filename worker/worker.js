// CoPCO server — Cloudflare Worker + one Durable Object (strongly consistent) + KV (photos, daily backups).
//   Votes:  GET /votes · POST /vote {member, logo, items}  — one record per member.
//   Shared: GET /state · POST /op {coll, op, item|id|items} — kitty, to-dos, wishlist, names, sizes, trips, plans, upkeep.
//   All shared state lives in a single Durable Object, so every op runs one at a time against the latest data —
//   two phones saving at once can't overwrite each other (KV alone is eventually consistent and could).
//   Photos: POST /photo, GET /photo/:id — immutable JPEGs in KV.
import { DurableObject } from 'cloudflare:workers';
const MEMBERS = ['merv', 'ace', 'bouncing', 'mervson', 'northy'];
const COLLS = ['expenses', 'todos', 'wish', 'names', 'sizes', 'trips', 'plans', 'upkeep'];
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
  if (coll === 'plans') {
    const rsvp = {};
    for (const [m, v] of Object.entries(x.rsvp || {})) if (MEMBERS.includes(m) && ['in', 'maybe', 'out'].includes(v)) rsvp[m] = v;
    return { id, date: str(x.date, 10), when: str(x.when, 20), ramp: str(x.ramp, 40), title: str(x.title, 120), by: MEMBERS.includes(x.by) ? x.by : '', rsvp };
  }
  if (coll === 'upkeep') return { id, t: str(x.t, 120), cat: str(x.cat, 20), due: str(x.due, 10), every: Math.max(0, Math.min(120, Math.round(Number(x.every) || 0))), last: str(x.last, 10), notes: str(x.notes, 300), who: str(x.who, 40) };
  if (coll === 'wish') return { id, t: str(x.t, 120), v: Math.max(0, Math.min(999, Math.round(Number(x.v) || 0))) };
  return null;
}


const today = () => new Date().toISOString().slice(0, 10);

// Pure function: apply one op to a list. Returns {list, error, removed}.
function applyOp(coll, list, b) {
  if (b.op === 'upsert') {
    const x = sanitise(coll, b.item || {});
    if (!x) return { error: 'invalid item' };
    const i = list.findIndex(y => y.id === x.id);
    if (i >= 0) list[i] = x; else if (list.length < MAX_ITEMS) list.unshift(x);
    return { list };
  }
  if (b.op === 'delete') {
    const removed = list.find(y => y.id === clean(b.id));
    return { list: list.filter(y => y.id !== clean(b.id)), removed };
  }
  if (b.op === 'toggle' && coll === 'names') {
    const n = list.find(y => y.id === clean(b.id));
    if (n && MEMBERS.includes(b.member)) n.voters = n.voters.includes(b.member) ? n.voters.filter(m => m !== b.member) : [...n.voters, b.member];
    return { list };
  }
  if (b.op === 'rsvp' && coll === 'plans') {
    const pl = list.find(y => y.id === clean(b.id));
    if (pl && MEMBERS.includes(b.member) && ['in', 'maybe', 'out'].includes(b.val)) pl.rsvp = { ...pl.rsvp, [b.member]: b.val };
    return { list };
  }
  if (b.op === 'vote' && coll === 'wish') {
    const w = list.find(y => y.id === clean(b.id));
    if (w) w.v = Math.min(999, (w.v || 0) + 1);
    return { list };
  }
  return { error: 'bad op' };
}

// One instance ("copco") holds everything. A Durable Object handles one request at a time, and storage
// reads/writes don't let another request in mid-way, so read → change → write is atomic.
export class CopcoState extends DurableObject {
  constructor(ctx, env) { super(ctx, env); this.env = env; }

  async migrate() {
    if (await this.ctx.storage.get('migrated')) return;
    // One-off import of the old KV data (external I/O, so do it inside blockConcurrencyWhile).
    await this.ctx.blockConcurrencyWhile(async () => {
      if (await this.ctx.storage.get('migrated')) return;
      const st = (await this.env.VOTES.get('state', 'json')) || {};
      const votes = (await this.env.VOTES.get('votes', 'json')) || {};
      const put = { migrated: new Date().toISOString(), rev: st.rev || 0, updated: st.updated || '', votes };
      for (const c of COLLS) put['c:' + c] = Array.isArray(st[c]) ? st[c] : null;
      await this.ctx.storage.put(put);
    });
  }

  async state() {
    const keys = ['rev', 'updated', ...COLLS.map(c => 'c:' + c)];
    const m = await this.ctx.storage.get(keys);
    const st = { rev: m.get('rev') || 0, updated: m.get('updated') || '' };
    for (const c of COLLS) st[c] = m.has('c:' + c) ? m.get('c:' + c) : null;
    return st;
  }

  async fetch(req) {
    await this.migrate();
    const url = new URL(req.url);
    if (url.pathname === '/state') return json(await this.state());
    if (url.pathname === '/votes') return json((await this.ctx.storage.get('votes')) || {});

    if (url.pathname === '/vote') {
      const b = await req.json().catch(() => null);
      if (!b || !MEMBERS.includes(b.member)) return json({ error: 'unknown member' }, 400);
      const items = {};
      for (const [k, v] of Object.entries(b.items || {}).slice(0, 20)) items[clean(k)] = clean(v);
      const all = (await this.ctx.storage.get('votes')) || {};
      all[b.member] = { logo: clean(b.logo), items, at: new Date().toISOString() };
      await this.ctx.storage.put('votes', all);
      return json(all);
    }

    if (url.pathname === '/op') {
      const b = await req.json().catch(() => null);
      if (!b || !COLLS.includes(b.coll)) return json({ error: 'bad collection' }, 400);
      const key = 'c:' + b.coll;
      const cur = await this.ctx.storage.get(key);
      let next = cur ?? null, removed;
      if (b.op === 'seed') {
        // Only fills an empty collection — the first phone online donates its list.
        if (cur == null) next = (b.items || []).slice(0, MAX_ITEMS).map(x => sanitise(b.coll, x)).filter(Boolean);
      } else {
        const r = applyOp(b.coll, Array.isArray(cur) ? cur : [], b);
        if (r.error) return json({ error: r.error }, 400);
        next = r.list; removed = r.removed;
      }
      const rev = ((await this.ctx.storage.get('rev')) || 0) + 1, updated = new Date().toISOString();
      await this.ctx.storage.put({ [key]: next, rev, updated });
      const st = await this.state();
      // Side effects after the write (these await the network, which would let other requests interleave).
      this.ctx.waitUntil(this.after(b.coll, removed, st));
      return json(st);
    }
    return json({ error: 'not found' }, 404);
  }

  async after(coll, removed, st) {
    if (coll === 'trips' && removed) for (const p of removed.photos || []) await this.env.VOTES.delete('photo-' + p);
    const day = 'backup-' + today();
    if (!(await this.env.VOTES.get(day))) {
      await this.env.VOTES.put(day, JSON.stringify({ ...st, votes: (await this.ctx.storage.get('votes')) || {} }), { expirationTtl: 60 * 60 * 24 * 60 });
    }
  }
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    const url = new URL(req.url);

    if (['/state', '/votes'].includes(url.pathname) && req.method === 'GET'
      || ['/op', '/vote'].includes(url.pathname) && req.method === 'POST') {
      const stub = env.STATE.get(env.STATE.idFromName('copco'));
      return stub.fetch(req);
    }

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
    return json({ ok: true, service: 'copco' });
  },
};
