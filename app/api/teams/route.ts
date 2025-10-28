import { cfbd } from '@/lib/cfbd';
export async function GET() {
  const year = new Date().getFullYear();
  const teams = await cfbd('/teams/fbs', { year });
  return Response.json({ teams });
}
