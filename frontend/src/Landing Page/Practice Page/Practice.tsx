import "./practice.css";

const tracks = [
  {
    title: "Web Exploitation",
    level: "Beginner -> Advanced",
    focus: "SQLi, auth bypass, XSS chains, and SSRF pivoting",
    labs: 42,
  },
  {
    title: "Binary & Reverse",
    level: "Intermediate -> Expert",
    focus: "ELF internals, ROP, heap primitives, and patch diffing",
    labs: 31,
  },
  {
    title: "Cloud Misconfig",
    level: "Beginner -> Intermediate",
    focus: "IAM abuse, container escapes, and secret extraction",
    labs: 27,
  },
];

const featuredLabs = [
  {
    tag: "New",
    name: "Ghost Header",
    category: "Web",
    difficulty: "Medium",
    solves: 318,
  },
  {
    tag: "Hot",
    name: "Container Drift",
    category: "Cloud",
    difficulty: "Hard",
    solves: 149,
  },
  {
    tag: "Classic",
    name: "Ret2School",
    category: "Pwn",
    difficulty: "Easy",
    solves: 622,
  },
];

export default function Practice() {
  return (
    <main className="practice-page">
      <section className="practice-hero">
        <p className="practice-kicker">NullPointerClub Practice Arena</p>
        <h1>Train like a team, solve like a finalist.</h1>
        <p className="practice-subtitle">
          Pick a learning track, run guided labs, and ship writeups with your
          squad. Every challenge is built around real attack paths and defense
          habits.
        </p>

        <div className="practice-hero-metrics">
          <article>
            <h3>124</h3>
            <p>Hands-on labs</p>
          </article>
          <article>
            <h3>18</h3>
            <p>Skill paths</p>
          </article>
          <article>
            <h3>9,700+</h3>
            <p>Community solves</p>
          </article>
        </div>
      </section>

      <section className="practice-tracks">
        <div className="section-heading">
          <h2>Pick Your Track</h2>
          <span>Structured by difficulty and exploit pattern</span>
        </div>
        <div className="track-grid">
          {tracks.map((track) => (
            <article className="track-card" key={track.title}>
              <p className="track-level">{track.level}</p>
              <h3>{track.title}</h3>
              <p>{track.focus}</p>
              <div className="track-footer">
                <span>{track.labs} labs</span>
                <button type="button">Start Track</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="practice-featured">
        <div className="section-heading">
          <h2>Featured Labs</h2>
          <span>Fresh drops and community favorites</span>
        </div>
        <div className="featured-grid">
          {featuredLabs.map((lab) => (
            <article key={lab.name} className="featured-card">
              <span className="featured-tag">{lab.tag}</span>
              <h3>{lab.name}</h3>
              <p>{lab.category}</p>
              <div className="featured-meta">
                <span>{lab.difficulty}</span>
                <span>{lab.solves} solves</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="practice-cta">
        <h2>Ready for your next exploit chain?</h2>
        <p>
          Join this week&apos;s sprint, solve 5 labs, and get your handle on the
          Practice Leaderboard.
        </p>
        <div className="cta-actions">
          <button type="button" className="primary-btn">
            Enter Practice
          </button>
          <button type="button" className="ghost-btn">
            View Weekly Sprint
          </button>
        </div>
      </section>
    </main>
  );
}
