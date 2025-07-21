"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContestsPage() {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContests() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/contests");
        if (!res.ok) throw new Error("Failed to fetch contests");
        const data = await res.json();
        setContests(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchContests();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ background: "#181818", borderRadius: 16, boxShadow: "0 2px 16px #0004", padding: 48, maxWidth: 600, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>Active Contests</h1>
        {loading && <div style={{ color: "#bbb", fontSize: 18 }}>Loading...</div>}
        {error && <div style={{ color: "#ff6b6b", fontSize: 17 }}>{error}</div>}
        {!loading && !error && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {contests.length === 0 && <div style={{ color: "#aaa", fontSize: 17 }}>No contests found.</div>}
            {contests.map(contest => (
              <div key={contest.id} style={{ background: "#222", borderRadius: 10, padding: 20, textAlign: "left", boxShadow: "0 1px 6px #0002", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#61dafb" }}>{contest.name}</div>
                <div style={{ color: "#bbb", fontSize: 16 }}>{contest.description}</div>
                <div style={{ color: "#aaa", fontSize: 15 }}>
                  <b>Start:</b> {new Date(contest.start).toLocaleString()} &nbsp; <b>End:</b> {new Date(contest.end).toLocaleString()}
                </div>
                <Link href={`/contests/${contest.id}`} style={{ marginTop: 8, alignSelf: "flex-end", background: "#61dafb", color: "#181818", fontWeight: 600, fontSize: 16, padding: "8px 28px", borderRadius: 7, textDecoration: "none", transition: "background 0.2s" }}>
                  Join
                </Link>
              </div>
            ))}
          </div>
        )}
        <Link href="/" style={{ marginTop: 32, color: "#61dafb", textDecoration: "underline", fontSize: 16 }}>← Back to Home</Link>
      </div>
    </div>
  );
} 