import React from "react";
import { useTheme } from "../theme/ThemeContext";
import { timeAgo, domainOf, accentColor } from "../utils/timeAgo";

// ── SVG icons ────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

export default function WebsiteCard({ website, onEdit, onDelete }) {
  const { theme } = useTheme();
  const accent = accentColor(website.title + website.url);
  const domain = domainOf(website.url);
  const initial = (website.title || "?")[0].toUpperCase();

  return (
    <div style={{ ...styles.card, background: theme.cardBg, boxShadow: theme.shadow, border: `1px solid ${theme.border}` }}>
      {/* Colored initial icon */}
      <div style={{ ...styles.iconWrap, background: accent }}>
        <span style={styles.initial}>{initial}</span>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.title, color: theme.text }}
        >
          {website.title}
        </a>

        {website.description && (
          <p style={{ ...styles.desc, color: theme.textSecondary }}>
            {website.description}
          </p>
        )}

        <p style={{ ...styles.meta, color: theme.mutedText }}>
          {domain}
        </p>
        <p style={{ ...styles.meta, color: theme.mutedText }}>
          Added: {timeAgo(website.created_at)}
        </p>

        {/* Actions */}
        <div style={styles.actions}>
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.btn, color: theme.textSecondary, border: `1px solid ${theme.border}`, background: theme.inputBg }}
          >
            <EyeIcon /> View
          </a>
          <button
            onClick={() => onEdit(website)}
            style={{ ...styles.btn, color: theme.textSecondary, border: `1px solid ${theme.border}`, background: theme.inputBg }}
          >
            <PencilIcon /> Edit
          </button>
          <button
            onClick={() => onDelete(website.id)}
            style={{ ...styles.btn, color: "#ef4444", border: "1px solid #fecaca", background: theme.inputBg }}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: 12,
    padding: 16,
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    transition: "box-shadow 0.2s",
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 10,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  initial: { fontSize: 22, fontWeight: 700, color: "#fff" },
  content: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 },
  title: {
    fontWeight: 600,
    fontSize: 15,
    textDecoration: "none",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  desc: {
    fontSize: 13,
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  meta: { fontSize: 12, margin: 0 },
  actions: { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "inherit",
  },
};
