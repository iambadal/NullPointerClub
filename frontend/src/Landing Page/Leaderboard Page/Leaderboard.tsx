
import "./Leaderboard.css";

type LeaderboardEntry = {
  rank: number;
  username: string;
  score: number;
  solved: number;
  streak: number;
};

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: "cipher_queen", score: 9840, solved: 142, streak: 23 },
  { rank: 2, username: "null_hunter", score: 9615, solved: 139, streak: 19 },
  { rank: 3, username: "segfault_sam", score: 9380, solved: 133, streak: 17 },
  { rank: 4, username: "bitwise_bruce", score: 9050, solved: 127, streak: 11 },
  { rank: 5, username: "stack_overflower", score: 8820, solved: 119, streak: 9 },
  { rank: 6, username: "loop_lord", score: 8590, solved: 113, streak: 14 },
  { rank: 7, username: "runtime_ren", score: 8445, solved: 108, streak: 8 },
  { rank: 8, username: "binary_bella", score: 8210, solved: 101, streak: 7 },
];

const topThree = leaderboardData.slice(0, 3);

export default function Leaderboard() {
  return (
    <div className="leaderboard-wrapper">
      <section className="leaderboard-hero">
        <div>
          <p className="leaderboard-kicker">NullPointerClub Rankings</p>
          <h1>Climb the board. Stay consistent.</h1>
          <p className="leaderboard-subtitle">
            Weekly score updates based on solved challenges, streaks, and event
            performance.
          </p>
        </div>
        <div className="leaderboard-stats">
          <div>
            <h3>2,348</h3>
            <p>Active Competitors</p>
          </div>
          <div>
            <h3>14,920</h3>
            <p>Challenges Solved</p>
          </div>
          <div>
            <h3>11:59 PM</h3>
            <p>Weekly Reset (Sunday)</p>
          </div>
        </div>
      </section>

      <section className="podium-grid">
        {topThree.map((entry) => (
          <article
            key={entry.username}
            className={`podium-card podium-rank-${entry.rank}`}
          >
            <span className="podium-badge">#{entry.rank}</span>
            <h2>{entry.username}</h2>
            <p className="podium-score">{entry.score.toLocaleString()} pts</p>
            <p className="podium-meta">
              {entry.solved} solved - {entry.streak} day streak
            </p>
          </article>
        ))}
      </section>

      <section className="leaderboard-table-card">
        <div className="leaderboard-table-header">
          <h2>Global Standings</h2>
          <span>Season 2026</span>
        </div>
        <div className="leaderboard-table-scroll">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Handle</th>
                <th>Score</th>
                <th>Solved</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr key={entry.username}>
                  <td>#{entry.rank}</td>
                  <td>{entry.username}</td>
                  <td>{entry.score.toLocaleString()}</td>
                  <td>{entry.solved}</td>
                  <td>{entry.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
