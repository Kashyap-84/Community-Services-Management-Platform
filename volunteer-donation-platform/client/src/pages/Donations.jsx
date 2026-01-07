import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Donations() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ donorName: "", amount: 10, note: "" });
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    try {
      const data = await api("/api/donations");
      setItems(data);
    } catch (err) {
      setMsg("Only admin can access donations list.");
    }
  }

  useEffect(() => { load(); }, []);

  async function create() {
    setMsg("");
    try {
      await api("/api/donations", { method: "POST", body: { ...form, amount: Number(form.amount) } });
      setForm({ donorName: "", amount: 10, note: "" });
      await load();
    } catch (err) {
      setMsg("Create failed (admin only).");
    }
  }

  return (
    <div>
      <h3>Donations (Admin)</h3>

      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input value={form.donorName} onChange={(e) => setForm({ ...form, donorName: e.target.value })} placeholder="donor name" />
        <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="amount" type="number" />
        <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="note" />
        <button onClick={create}>Add</button>
      </div>

      {msg ? <p style={{ color: "crimson" }}>{msg}</p> : null}

      <ul>
        {items.map((d) => (
          <li key={d._id}>
            {d.donorName} — {d.amount} {d.currency} ({new Date(d.createdAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
