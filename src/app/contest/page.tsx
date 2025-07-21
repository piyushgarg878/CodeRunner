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
  const [createdContest, setCreatedContest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'contest' | 'questions' | 'done'>('contest');
  const [questions, setQuestions] = useState<any[]>([]);
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    testcases: [{ input: "", output: "" }],
    points: 100,
  });
  const [adding, setAdding] = useState(false);

  // Contest form handlers
  const handleContestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContest({ ...contest, [e.target.name]: e.target.value });
  };

  const handleContestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/contests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contest),
      });
      if (!res.ok) throw new Error("Failed to create contest");
      const data = await res.json();
      setCreatedContest(data);
      setStep('questions');
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  // Question form handlers
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };
  const handleTestcaseChange = (idx: number, field: 'input' | 'output', value: string) => {
    const newTestcases = question.testcases.map((tc, i) => i === idx ? { ...tc, [field]: value } : tc);
    setQuestion({ ...question, testcases: newTestcases });
  };
  const addTestcase = () => setQuestion({ ...question, testcases: [...question.testcases, { input: "", output: "" }] });
  const removeTestcase = (idx: number) => setQuestion({ ...question, testcases: question.testcases.filter((_, i) => i !== idx) });

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setError(null);
    try {
      const res = await fetch(`/api/contests/${createdContest.id}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
      });
      if (!res.ok) throw new Error("Failed to add question");
      const data = await res.json();
      setQuestions([...questions, data]);
      setQuestion({ title: "", description: "", testcases: [{ input: "", output: "" }], points: 100 });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setAdding(false);
    }
  };

  const finish = () => setStep('done');

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ background: "#181818", borderRadius: 16, boxShadow: "0 2px 16px #0004", padding: 48, maxWidth: 600, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", gap: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>Create a Contest</h1>
        {step === 'contest' && (
          <form onSubmit={handleContestSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            <label>
              Name:
              <input name="name" value={contest.name} onChange={handleContestChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
            </label>
            <label>
              Description:
              <textarea name="description" value={contest.description} onChange={handleContestChange} required rows={2} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4, resize: "vertical" }} />
            </label>
            <label>
              Start Time:
              <input name="start" type="datetime-local" value={contest.start} onChange={handleContestChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
            </label>
            <label>
              End Time:
              <input name="end" type="datetime-local" value={contest.end} onChange={handleContestChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
            </label>
            <button type="submit" style={{ marginTop: 10, background: "#61dafb", color: "#181818", fontWeight: 600, fontSize: 17, padding: "10px 0", borderRadius: 7, border: "none", cursor: "pointer" }}>Create Contest</button>
            {error && <div style={{ color: "#ff6b6b", marginTop: 8 }}>{error}</div>}
          </form>
        )}
        {step === 'questions' && createdContest && (
          <>
            <div style={{ marginBottom: 18, color: "#61dafb", fontWeight: 600, fontSize: 20 }}>Add Questions for: {createdContest.name}</div>
            <form onSubmit={handleQuestionSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
              <label>
                Title:
                <input name="title" value={question.title} onChange={handleQuestionChange} required style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
              </label>
              <label>
                Description:
                <textarea name="description" value={question.description} onChange={handleQuestionChange} required rows={2} style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4, resize: "vertical" }} />
              </label>
              <label>
                Points:
                <input name="points" type="number" value={question.points} onChange={handleQuestionChange} min={1} max={1000} required style={{ width: 120, padding: 8, borderRadius: 6, border: "1px solid #444", background: "#191919", color: "#fff", marginTop: 4 }} />
              </label>
              <div style={{ marginTop: 8 }}>
                <b>Testcases:</b>
                {question.testcases.map((tc, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <input placeholder="Input" value={tc.input} onChange={e => handleTestcaseChange(idx, 'input', e.target.value)} style={{ flex: 1, padding: 6, borderRadius: 5, border: "1px solid #444", background: "#191919", color: "#fff" }} />
                    <input placeholder="Output" value={tc.output} onChange={e => handleTestcaseChange(idx, 'output', e.target.value)} style={{ flex: 1, padding: 6, borderRadius: 5, border: "1px solid #444", background: "#191919", color: "#fff" }} />
                    {question.testcases.length > 1 && <button type="button" onClick={() => removeTestcase(idx)} style={{ background: "#ff6b6b", color: "#fff", border: "none", borderRadius: 5, padding: "0 8px", cursor: "pointer" }}>✕</button>}
                  </div>
                ))}
                <button type="button" onClick={addTestcase} style={{ marginTop: 6, background: "#61dafb", color: "#181818", border: "none", borderRadius: 5, padding: "4px 12px", cursor: "pointer", fontWeight: 600 }}>+ Add Testcase</button>
              </div>
              <button type="submit" disabled={adding} style={{ marginTop: 12, background: adding ? "#444" : "#61dafb", color: adding ? "#bbb" : "#181818", fontWeight: 600, fontSize: 17, padding: "10px 0", borderRadius: 7, border: "none", cursor: adding ? "not-allowed" : "pointer" }}>Add Question</button>
              {error && <div style={{ color: "#ff6b6b", marginTop: 8 }}>{error}</div>}
            </form>
            <div style={{ marginTop: 18, textAlign: "left" }}>
              <b>Questions Added:</b>
              <ul style={{ color: "#aaa", fontSize: 15, marginTop: 6 }}>
                {questions.map((q, i) => (
                  <li key={q.id || i}><b>{q.title}</b> ({q.points} pts)</li>
                ))}
              </ul>
            </div>
            <button onClick={finish} style={{ marginTop: 18, background: "#222", color: "#61dafb", fontWeight: 600, fontSize: 17, padding: "10px 0", borderRadius: 7, border: "1px solid #61dafb", cursor: "pointer" }}>Finish Contest Setup</button>
          </>
        )}
        {step === 'done' && (
          <div>
            <h2 style={{ color: "#61dafb", marginBottom: 12 }}>Contest Created!</h2>
            <div style={{ color: "#fff", marginBottom: 10 }}><b>{createdContest?.name}</b></div>
            <div style={{ color: "#aaa", marginBottom: 18 }}>Questions: {questions.length}</div>
            <Link href="/contests" style={{ background: "#61dafb", color: "#181818", fontWeight: 600, fontSize: 17, padding: "10px 32px", borderRadius: 7, textDecoration: "none" }}>Go to Contests</Link>
          </div>
        )}
        <Link href="/" style={{ marginTop: 32, color: "#61dafb", textDecoration: "underline", fontSize: 16 }}>← Back to Home</Link>
      </div>
    </div>
  );
} 