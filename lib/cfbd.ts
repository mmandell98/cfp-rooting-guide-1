const BASE = 'https://api.collegefootballdata.com';
if (!process.env.CFBD_API_KEY) console.warn('Missing CFBD_API_KEY in env');

export async function cfbd(path: string, params?: Record<string, any>) {
  const url = new URL(BASE + path);
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.CFBD_API_KEY}`
    },
    next: { revalidate: 3600 }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`CFBD ${path} ${res.status}: ${text}`);
  }
  return res.json();
}
