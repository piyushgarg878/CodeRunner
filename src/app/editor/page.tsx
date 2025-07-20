'use client'
import { useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import LanguageSelector from "../../components/LanguageSelector";
import EditorPanel from "../../components/EditorPanel";
import InputBox from "../../components/InputBox";
import OutputPanel from "../../components/OutputPanel";
import Footer from "../../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010/api";

export default function EditorPage() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [editorHeight, setEditorHeight] = useState(350);

  const handleRun = async () => {
    setLoading(true);
    setStatus("Running code...");
    setOutput("");
    try {
      const res = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, input }),
      });
      const data = await res.json();
      if (data.success) {
        let out = data.output || "";
        if (data.stderr) out += `\n[stderr]\n${data.stderr}`;
        if (data.error) out += `\n[error]\n${data.error}`;
        setOutput(out);
        setStatus("Execution finished.");
      } else {
        setOutput("");
        setStatus(data.error || "Unknown error");
      }
    } catch (err: unknown) {
      setOutput("");
      if (err instanceof Error) {
        setStatus("Network or server error: " + err.message);
      } else {
        setStatus("Network or server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setInput("");
    setOutput("");
    setStatus(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff" }}>
      <HeaderBar />
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 32, gap: 32 }}>
        <div style={{ background: "#181818", borderRadius: 16, boxShadow: "0 2px 16px #0004", padding: 36, minWidth: 350, maxWidth: 700, width: "100%", display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "space-between" }}>
            <LanguageSelector language={language} setLanguage={setLanguage} disabled={loading} />
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleClear}
                style={{ fontSize: 15, padding: "7px 20px", borderRadius: 7, background: "#333", color: "#fff", border: "1px solid #444", cursor: "pointer", transition: "background 0.2s" }}
                disabled={loading}
              >
                Clear
              </button>
              <button
                onClick={handleRun}
                disabled={loading}
                style={{ fontSize: 16, padding: "7px 28px", borderRadius: 7, background: loading ? "#444" : "#61dafb", color: loading ? "#bbb" : "#181818", border: "none", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
              >
                {loading ? "Running..." : "Run"}
              </button>
            </div>
          </div>
          <EditorPanel
            language={language}
            code={code}
            setCode={setCode}
            height={editorHeight}
            setHeight={setEditorHeight}
            disabled={loading}
          />
          <InputBox input={input} setInput={setInput} disabled={loading} />
          <OutputPanel output={output} status={status} />
        </div>
        <Footer />
      </main>
    </div>
  );
} 