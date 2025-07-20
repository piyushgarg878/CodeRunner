import React from "react";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  disabled?: boolean;
}

const LANGUAGES = [
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage, disabled }) => (
  <div>
    <label htmlFor="language-select" style={{ fontWeight: 500, marginRight: 8 }}>Language:</label>
    <select
      id="language-select"
      value={language}
      onChange={e => setLanguage(e.target.value)}
      style={{ fontSize: 16, padding: "4px 8px", borderRadius: 6 }}
      disabled={disabled}
    >
      {LANGUAGES.map(lang => (
        <option key={lang.value} value={lang.value}>{lang.label}</option>
      ))}
    </select>
  </div>
);

export default LanguageSelector; 