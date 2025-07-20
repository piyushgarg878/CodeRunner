import React from "react";

interface InputBoxProps {
  input: string;
  setInput: (input: string) => void;
  disabled?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ input, setInput, disabled }) => (
  <div>
    <label htmlFor="input-area" style={{ fontWeight: 500 }}>Input (stdin):</label>
    <textarea
      id="input-area"
      value={input}
      onChange={e => setInput(e.target.value)}
      rows={3}
      style={{ width: "100%", borderRadius: 6, border: "1px solid #222", background: "#191919", color: "#fff", fontSize: 15, marginTop: 6, padding: 8, resize: "vertical" }}
      placeholder="Enter input for your code (optional)"
      disabled={disabled}
    />
  </div>
);

export default InputBox; 