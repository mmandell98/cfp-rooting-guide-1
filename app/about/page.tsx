export default function AboutPage() {
  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>About this project</h1>
      <p style={{ color:'#333', lineHeight: 1.6 }}>
        The CFP Rooting Guide helps fans decide who to root for each week. It pulls live schedules, rankings, and team info
        from the CollegeFootballData API and applies a transparent scoring heuristic to each matchup.
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 24 }}>How recommendations work</h2>
      <ul style={{ marginTop: 8, lineHeight: 1.7 }}>
        <li><b>Your team must win.</b> Your own game is always top priority.</li>
        <li><b>Chaos slider.</b> Rewards upsets against teams ranked ahead of your favorite.</li>
        <li><b>Strength of schedule.</b> Boosts teams you’ve already played—wins by prior opponents lift your résumé.</li>
        <li><b>Conference bias.</b> Slightly favors outcomes that reduce direct, similarly ranked rivals in your conference.</li>
        <li><b>Goal tuning.</b> Top-12 emphasizes trimming the pack of top seeds; Win-Conference gives a small nudge to helpful tiebreakers.</li>
      </ul>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 24 }}>Polls</h2>
      <p style={{ color:'#333', lineHeight: 1.6 }}>
        Toggle between <b>CFP (Playoff Committee)</b> and <b>AP Top 25</b>. If CFP rankings aren’t published for a week yet, the app gracefully falls back to AP and lets you know.
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 24 }}>Notes</h2>
      <ul style={{ marginTop: 8, lineHeight: 1.7 }}>
        <li>Logos and team data via CFBD. Some teams may not provide a logo—those show a colored initials badge.</li>
        <li>The scoring is heuristic, not a probability model. Future versions can incorporate power ratings and explicit odds.</li>
        <li>Use the Week dropdown to explore future weeks; <i>Current week</i> and <i>Next week</i> buttons help you navigate.</li>
      </ul>
      <div style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration:'none', border:'1px solid #ddd', borderRadius: 10, padding:'8px 12px', color:'#111' }}>← Back to app</a>
      </div>
    </main>
  );
}
