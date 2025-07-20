"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ background: "#181818", borderRadius: 16, boxShadow: "0 2px 16px #0004", padding: 48, maxWidth: 500, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 28 }}>
        <h1 style={{ fontSize: 38, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>CodeRunner Contest</h1>
        <p style={{ fontSize: 18, color: "#bbb", marginBottom: 0 }}>
          Welcome to the ultimate coding contest platform!<br/>
          Compete, solve problems, and test your code in real time.
        </p>
        <ul style={{ textAlign: "left", color: "#aaa", fontSize: 16, margin: "24px auto 0", maxWidth: 400, lineHeight: 1.7 }}>
          <li>📝 Multiple languages supported (Python, C++)</li>
          <li>⚡ Instant code execution in a safe environment</li>
          <li>🏆 Real-time leaderboard and submissions (coming soon)</li>
        </ul>
        <Link href="/editor" style={{ marginTop: 16, display: "inline-block", background: "#61dafb", color: "#181818", fontWeight: 600, fontSize: 20, padding: "14px 48px", borderRadius: 8, textDecoration: "none", transition: "background 0.2s" }}>
          Go to Code Editor
        </Link>
        <Link href="/contest" style={{ marginTop: 24, display: "inline-block", background: "#222", color: "#61dafb", fontWeight: 600, fontSize: 18, padding: "12px 36px", borderRadius: 8, textDecoration: "none", border: "1px solid #61dafb", transition: "background 0.2s" }}>
          Create Contest
        </Link>
        <Link href="/contests" style={{ marginTop: 16, display: "inline-block", background: "#222", color: "#61dafb", fontWeight: 600, fontSize: 18, padding: "12px 36px", borderRadius: 8, textDecoration: "none", border: "1px solid #61dafb", transition: "background 0.2s" }}>
          Join Contest
        </Link>
      </div>
      <footer style={{ marginTop: 48, color: "#888", fontSize: 14, textAlign: "center" }}>
        © {new Date().getFullYear()} CodeRunner Contest Platform
      </footer>
    </div>
  );
}
