"use client";
import Link from "next/link";

const sampleContests = [
  {
    id: 1,
    name: "Spring Coding Challenge",
    description: "A fast-paced contest with algorithmic problems.",
    start: "2024-06-10 10:00",
    end: "2024-06-10 13:00",
  },
  {
    id: 2,
    name: "Beginner's Luck",
    description: "Perfect for new coders!",
    start: "2024-06-12 15:00",
    end: "2024-06-12 17:00",
  },
  {
    id: 3,
    name: "Night Owl Marathon",
    description: "Solve problems all night long!",
    start: "2024-06-15 22:00",
    end: "2024-06-16 06:00",
  },
];

export default function ContestsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ background: "#181818", borderRadius: 16, boxShadow: "0 2px 16px #0004", padding: 48, maxWidth: 600, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>Active Contests</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {sampleContests.map(contest => (
            <div key={contest.id} style={{ background: "#222", borderRadius: 10, padding: 20, textAlign: "left", boxShadow: "0 1px 6px #0002", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#61dafb" }}>{contest.name}</div>
              <div style={{ color: "#bbb", fontSize: 16 }}>{contest.description}</div>
              <div style={{ color: "#aaa", fontSize: 15 }}>
                <b>Start:</b> {contest.start} &nbsp; <b>End:</b> {contest.end}
              </div>
              <Link href={`/contests/${contest.id}`} style={{ marginTop: 8, alignSelf: "flex-end", background: "#61dafb", color: "#181818", fontWeight: 600, fontSize: 16, padding: "8px 28px", borderRadius: 7, textDecoration: "none", transition: "background 0.2s" }}>
                Join
              </Link>
            </div>
          ))}
        </div>
        <Link href="/" style={{ marginTop: 32, color: "#61dafb", textDecoration: "underline", fontSize: 16 }}>← Back to Home</Link>
      </div>
    </div>
  );
} 