import React, { useRef } from "react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface EditorPanelProps {
  language: string;
  code: string;
  setCode: (code: string) => void;
  height: number;
  setHeight: (height: number) => void;
  disabled?: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ language, code, setCode, height, setHeight, disabled }) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newHeight = Math.max(150, startHeight.current + (e.clientY - startY.current));
    setHeight(newHeight);
  };
  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={editorContainerRef} style={{ width: "100%", border: "1px solid #222", borderRadius: 8, overflow: "hidden", position: "relative", background: "#1e1e1e" }}>
      <MonacoEditor
        height={height}
        width="100%"
        language={language === "cpp" ? "cpp" : "python"}
        value={code}
        onChange={value => setCode(value || "")}
        options={{ fontSize: 16, minimap: { enabled: false }, theme: "vs-dark" }}
      />
      {/* Resize handle */}
      <div
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, cursor: "ns-resize", background: "#2228" }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default EditorPanel; 