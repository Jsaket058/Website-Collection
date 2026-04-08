import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { getWebsites, createWebsite, updateWebsite, deleteWebsite } from "../api/websites";
import WebsiteCard from "../components/WebsiteCard";
import WebsiteForm from "../components/WebsiteForm";

// ── Toggle switch ─────────────────────────────────────────────────────────────
function DarkToggle() {
  const { isDark, toggle, theme } = useTheme();
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
        flexShrink: 0,
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

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ user }) {
  const initial = (user.first_name || user.email || "U")[0].toUpperCase();
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "#4f46e5",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
}

// ── Search icon ───────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ── Main page ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [websites, setWebsites] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const { data } = await getWebsites();
      setWebsites(data);
      setError("");
    } catch {
      setError("Failed to load websites.");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async (values) => {
    try { await createWebsite(values); setShowAdd(false); load(); }
    catch { setError("Failed to add website."); }
  };

  const handleEdit = async (values) => {
    try { await updateWebsite(editing.id, values); setEditing(null); load(); }
    catch { setError("Failed to update website."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this website?")) return;
    try { await deleteWebsite(id); load(); }
    catch { setError("Failed to delete website."); }
  };

  const firstName = user.first_name || user.email?.split("@")[0] || "there";

  const filtered = websites.filter((w) => {
    const q = search.toLowerCase();
    return (
      w.title.toLowerCase().includes(q) ||
      w.url.toLowerCase().includes(q) ||
      (w.description || "").toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header style={{
        background: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        padding: "0 28px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: theme.shadow,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#4f46e5" }}>🔗</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>Website Collection</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <DarkToggle />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar user={user} />
            <span style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>
              {user.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : user.email}
            </span>
          </div>
          <button
            onClick={logout}
            style={{
              padding: "7px 16px",
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              background: theme.inputBg,
              color: theme.textSecondary,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ⏻ Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>
        {error && (
          <p style={{ color: "#ef4444", background: "#fff5f5", padding: "10px 14px", borderRadius: 8, border: "1px solid #fecaca", marginBottom: 20 }}>
            {error}
          </p>
        )}

        <h2 style={{ fontSize: 26, fontWeight: 700, color: theme.text, margin: "0 0 24px" }}>
          Welcome back, {firstName}!
        </h2>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          <button
            onClick={() => { setShowAdd(true); setEditing(null); }}
            style={{
              padding: "10px 20px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: 9,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexShrink: 0,
            }}
          >
            + Add New Website
          </button>

          <div style={{
            flex: 1,
            minWidth: 220,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: 9,
            padding: "0 14px",
            color: theme.textSecondary,
          }}>
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your saved websites…"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 14,
                color: theme.text,
                width: "100%",
                padding: "10px 0",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((w) => (
            <WebsiteCard
              key={w.id}
              website={w}
              onEdit={(w) => { setEditing(w); setShowAdd(false); }}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 0", color: theme.textSecondary }}>
            {search ? `No websites match "${search}".` : "No websites saved yet. Add your first one!"}
          </div>
        )}
      </main>

      {/* Modals */}
      {showAdd && <WebsiteForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />}
      {editing && <WebsiteForm initial={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />}
    </div>
  );
}
