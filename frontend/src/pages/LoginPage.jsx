import React from "react";
import { useTheme } from "../theme/ThemeContext";
import GoogleLoginButton from "../components/GoogleLoginButton";

function DarkToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{
        width: 48,
        height: 26,
        borderRadius: 13,
        border: "none",
        background: isDark ? "#4f46e5" : "#d1d5db",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.25s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: isDark ? 24 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

export default function LoginPage() {
  const { theme } = useTheme();

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, display: "flex", flexDirection: "column", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Top bar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>🔗</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: theme.text }}>LinkHub</span>
        </div>
        <DarkToggle />
      </header>

      {/* Center card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          boxShadow: theme.shadow,
          borderRadius: 16,
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
          maxWidth: 380,
        }}>
          <div style={{ fontSize: 48 }}>🔗</div>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: theme.text }}>
              Welcome to LinkHub
            </h1>
            <p style={{ margin: 0, color: theme.textSecondary, fontSize: 14 }}>
              Save and organise your favourite websites in one place.
            </p>
          </div>
          <GoogleLoginButton />
          <p style={{ margin: 0, fontSize: 12, color: theme.mutedText, textAlign: "center" }}>
            © 2025 LinkHub. Simple. Organised. Secure.
          </p>
        </div>
      </div>
    </div>
  );
}
