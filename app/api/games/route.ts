import { NextRequest } from 'next/server';
import { cfbd } from '@/lib/cfbd';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') ?? String(new Date().getFullYear());
  const week = searchParams.get('week') ?? '';
  const seasonType = searchParams.get('seasonType') ?? 'regular';
  const conference = searchParams.get('conference') ?? '';

  const data = await cfbd('/games', { year, week, seasonType, conference });
  const games = data.map((g: any) => ({
    id: g.id ?? `${g.season}-${g.week}-${g.home_team}-${g.away_team}`,
    week: g.week,
    home: g.home_team,
    away: g.away_team,
    conference: g.conference ?? g.home_conference ?? g.away_conference ?? '',
    start_date: g.start_date
  }));
  return Response.json({ games });
}
