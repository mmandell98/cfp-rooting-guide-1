import { NextRequest } from 'next/server';
import { cfbd } from '@/lib/cfbd';
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') ?? String(new Date().getFullYear());
  const seasonType = searchParams.get('seasonType') ?? 'regular';
  const cal = await cfbd('/calendar', { year, seasonType });
  return Response.json({ weeks: cal });
}
