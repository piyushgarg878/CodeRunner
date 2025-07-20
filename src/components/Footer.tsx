import React from "react";

const Footer: React.FC = () => (
  <footer style={{ marginTop: 32, color: "#888", fontSize: 14, textAlign: "center" }}>
    © {new Date().getFullYear()} Remote Code Execution UI &mdash; Powered by Next.js & Monaco Editor
  </footer>
);

export default Footer; 