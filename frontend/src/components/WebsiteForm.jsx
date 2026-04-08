import React, { useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";

const EMPTY = { url: "", title: "", description: "" };

export default function WebsiteForm({ initial, onSubmit, onCancel }) {
  const { theme } = useTheme();
  const [values, setValues] = useState(EMPTY);

  useEffect(() => {
    setValues(
      initial
        ? { url: initial.url, title: initial.title, description: initial.description || "" }
        : EMPTY
    );
  }, [initial]);

  const handleChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const inputStyle = {
    padding: "10px 12px",
    border: `1px solid ${theme.border}`,
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    background: theme.inputBg,
    color: theme.text,
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    // Overlay
    <div style={styles.overlay} onClick={onCancel}>
      <div
        style={{ ...styles.modal, background: theme.cardBg, boxShadow: theme.shadow, border: `1px solid ${theme.border}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.modalHeader}>
          <h3 style={{ ...styles.heading, color: theme.text }}>
            {initial ? "Edit website" : "Add new website"}
          </h3>
          <button onClick={onCancel} style={{ ...styles.closeBtn, color: theme.textSecondary }}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={{ ...styles.label, color: theme.textSecondary }}>
            URL *
            <input
              name="url"
              type="url"
              value={values.url}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="https://example.com"
            />
          </label>

          <label style={{ ...styles.label, color: theme.textSecondary }}>
            Title *
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="My Favourite Site"
            />
          </label>

          <label style={{ ...styles.label, color: theme.textSecondary }}>
            Description
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              style={{ ...inputStyle, height: 80, resize: "vertical" }}
              placeholder="Optional notes…"
            />
          </label>

          <div style={styles.row}>
            <button type="submit" style={styles.saveBtn}>
              {initial ? "Save changes" : "Add website"}
            </button>
            <button type="button" onClick={onCancel} style={{ ...styles.cancelBtn, border: `1px solid ${theme.border}`, color: theme.textSecondary, background: theme.inputBg }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    width: "100%",
    maxWidth: 480,
    borderRadius: 14,
    padding: "28px 28px 24px",
    margin: "0 16px",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: { margin: 0, fontSize: 18, fontWeight: 700 },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    padding: "2px 6px",
  },
  form: { display: "flex", flexDirection: "column", gap: 14 },
  label: { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 500 },
  row: { display: "flex", gap: 10, marginTop: 4 },
  saveBtn: {
    flex: 1,
    padding: "10px 0",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },
  cancelBtn: {
    flex: 1,
    padding: "10px 0",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontFamily: "inherit",
  },
};
