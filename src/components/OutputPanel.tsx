import React from "react";

interface OutputPanelProps {
  output: string;
  status?: string | null;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, status }) => (
  <>
    {status && (
      <div style={{ background: "#222", color: "#61dafb", borderRadius: 6, padding: "8px 14px", fontSize: 15, fontWeight: 500, marginBottom: 8 }}>
        {status}
      </div>
    )}
    <div style={{ width: "100%", minHeight: 80, background: "#151515", border: "1px solid #222", borderRadius: 8, padding: 16, fontFamily: "monospace", fontSize: 15, color: "#fff" }}>
      <strong style={{ color: "#61dafb" }}>Output:</strong>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
    </div>
  </>
);

export default OutputPanel; 