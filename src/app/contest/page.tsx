"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContestCreatePage() {
  const [contest, setContest] = useState({
    name: "",
    description: "",
    start: "",
    end: "",
  });
  const [created, setCreated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContest({ ...contest, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ background: "#181818", borderRadius: 16, boxShadow: "0 2px 16px #0004", padding: 48, maxWidth: 500, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>Create a Contest</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
          <label>
            Name:
            <input name="name" value={contest.name} onChange={handleChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
          </label>
          <label>
            Description:
            <textarea name="description" value={contest.description} onChange={handleChange} required rows={2} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4, resize: "vertical" }} />
          </label>
          <label>
            Start Time:
            <input name="start" type="datetime-local" value={contest.start} onChange={handleChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
          </label>
          <label>
            End Time:
            <input name="end" type="datetime-local" value={contest.end} onChange={handleChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
          </label>
          <button type="submit" style={{ marginTop: 10, background: "#61dafb", color: "#181818", fontWeight: 600, fontSize: 17, padding: "10px 0", borderRadius: 7, border: "none", cursor: "pointer" }}>Create Contest</button>
        </form>
        {created && (
          <div style={{ marginTop: 18, background: "#181818", borderRadius: 8, padding: 16, color: "#fff" }}>
            <h3 style={{ color: "#61dafb", marginBottom: 6 }}>Contest Created!</h3>
            <div><b>Name:</b> {contest.name}</div>
            <div><b>Description:</b> {contest.description}</div>
            <div><b>Start:</b> {contest.start.replace('T', ' ')}</div>
            <div><b>End:</b> {contest.end.replace('T', ' ')}</div>
          </div>
        )}
        <Link href="/" style={{ marginTop: 24, color: "#61dafb", textDecoration: "underline", fontSize: 16 }}>← Back to Home</Link>
      </div>
    </div>
  );
} 