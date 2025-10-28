import { NextRequest } from 'next/server';
import { cfbd } from '@/lib/cfbd';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') ?? String(new Date().getFullYear());
  const week = searchParams.get('week') ?? '';
  const seasonType = searchParams.get('seasonType') ?? 'regular';
  const pollParam = searchParams.get('poll') ?? 'AP Top 25';
  const desiredPoll = pollParam === 'Playoff Committee' ? 'Playoff Committee' : 'AP Top 25';

  const data = await cfbd('/rankings', { year, week, seasonType });
  const latest = Array.isArray(data) && data.length ? data[data.length - 1] : { polls: [] };
  const polls = (latest as any).polls || [];

  let selected = polls.find((p: any) => p.poll === desiredPoll);
  let usedPoll = desiredPoll;
  let note: string | undefined;

  if (!selected) {
    selected = polls.find((p: any) => p.poll === 'AP Top 25') || polls[0];
    if (desiredPoll === 'Playoff Committee' && selected?.poll !== 'Playoff Committee') {
      usedPoll = selected?.poll || 'AP Top 25';
      note = 'CFP rankings not available for the selected week yet; showing AP instead.';
    }
  }

  const rankings = (selected?.ranks || []).map((r: any) => ({ team: r.team, rank: r.rank, conference: r.conference }));
  return Response.json({ rankings, poll: usedPoll, note });
}
