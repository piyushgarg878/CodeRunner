"use client";
import { useState } from 'react';
import EditorPanel from '@/components/EditorPanel';
import InputBox from '@/components/InputBox';
import OutputPanel from '@/components/OutputPanel';
import LanguageSelector from '@/components/LanguageSelector';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010/api";

// This component receives the initial contest data as a prop
export default function ContestArena({ initialContest }: { initialContest: any }) {
  const [selectedQuestion, setSelectedQuestion] = useState<any>(initialContest?.questions?.[0] || null);
  
  // Editor State
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [editorHeight, setEditorHeight] = useState(400);

  const handleSelectQuestion = (question: any) => {
    setSelectedQuestion(question);
    setCode("");
    setInput("");
    setOutput("");
    setStatus(null);
  };

  const handleSubmit = async () => {
    if (!selectedQuestion) return;
    setSubmitting(true);
    setStatus("Submitting code...");
    setOutput("");
    try {
      const res = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, input }),
      });
      const data = await res.json();
      
      const expectedOutput = selectedQuestion.testcases[0]?.output.trim();
      const actualOutput = data.output?.trim();
      
      let submissionResult = `Output:\n${data.output}`;
      if (data.stderr) submissionResult += `\nStderr:\n${data.stderr}`;
      if (data.error) submissionResult += `\nError:\n${data.error}`;

      if (expectedOutput && actualOutput === expectedOutput) {
        setStatus("Submission Accepted!");
      } else if (expectedOutput) {
        setStatus("Wrong Answer.");
      } else {
        setStatus("Submission Finished.");
      }

      setOutput(submissionResult);

    } catch (err: any) {
      setStatus("Submission failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#111', color: '#fff', padding: '20px' }}>
      {/* Left Panel: Question List */}
      <div style={{ flex: '0 0 300px', background: '#181818', borderRadius: '12px', padding: '24px', marginRight: '20px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#61dafb', marginBottom: '24px' }}>{initialContest.name}</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {initialContest.questions?.map((q: any) => (
            <li
              key={q.id}
              onClick={() => handleSelectQuestion(q)}
              style={{
                padding: '12px 16px',
                marginBottom: '10px',
                borderRadius: '8px',
                background: selectedQuestion?.id === q.id ? '#61dafb' : '#2a2a2a',
                color: selectedQuestion?.id === q.id ? '#181818' : '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'background 0.2s',
              }}
            >
              {q.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel: Question Details & Editor */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {selectedQuestion ? (
          <>
            {/* Question Description */}
            <div style={{ background: '#181818', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>{selectedQuestion.title}</h3>
              <p style={{ fontSize: '16px', color: '#bbb', lineHeight: 1.6 }}>{selectedQuestion.description}</p>
            </div>

            {/* Code Execution Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', background: '#181818', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <LanguageSelector language={language} setLanguage={setLanguage} disabled={submitting} />
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{ fontSize: 16, padding: "8px 28px", borderRadius: 7, background: submitting ? "#444" : "#61dafb", color: submitting ? "#bbb" : "#181818", border: "none", fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer" }}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              <EditorPanel
                language={language}
                code={code}
                setCode={setCode}
                height={editorHeight}
                setHeight={setEditorHeight}
                disabled={submitting}
              />
              <div style={{ display: 'flex', gap: '20px', minHeight: '120px' }}>
                <div style={{ flex: 1 }}>
                  <InputBox input={input} setInput={setInput} disabled={submitting} />
                </div>
                <div style={{ flex: 1 }}>
                  <OutputPanel output={output} status={status} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#181818', borderRadius: '12px' }}>
            <p style={{ fontSize: '18px', color: '#aaa' }}>This contest has no questions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
} 