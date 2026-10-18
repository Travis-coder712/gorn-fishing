// CoPCO vote server — tiny Cloudflare Worker + KV. One record per member; re-voting overwrites your own.
const MEMBERS = ['merv', 'ace', 'northy', 'bouncing'];
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });

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
      const clean = s => String(s || '').slice(0, 24).replace(/[^a-z0-9-]/gi, '');
      const items = {};
      for (const [k, v] of Object.entries(b.items || {}).slice(0, 20)) items[clean(k)] = clean(v);
      const all = (await env.VOTES.get('votes', 'json')) || {};
      all[b.member] = { logo: clean(b.logo), items, at: new Date().toISOString() };
      await env.VOTES.put('votes', JSON.stringify(all));
      return json(all);
    }
    return json({ ok: true, service: 'copco-votes' });
  },
};
