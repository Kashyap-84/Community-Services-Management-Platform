import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Volunteers() {
  const [me, setMe] = useState({ phone: "", skills: "", availability: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api("/api/volunteers/me");
        if (data) {
          setMe({
            phone: data.phone || "",
            skills: (data.skills || []).join(", "),
            availability: data.availability || ""
          });
        }
      } catch (e) {}
    })();
  }, []);

  async function save() {
    setMsg("");
    const body = {
      phone: me.phone,
      skills: me.skills.split(",").map((s) => s.trim()).filter(Boolean),
      availability: me.availability
    };
    try {
      await api("/api/volunteers/me", { method: "POST", body });
      setMsg("✅ Saved");
    } catch (err) {
      setMsg(String(err.message));
    }
  }

  return (
    <div>
      <h3>My Volunteer Profile</h3>
      <input value={me.phone} onChange={(e) => setMe({ ...me, phone: e.target.value })} placeholder="phone" style={{ width: "100%", marginBottom: 8 }} />
      <input value={me.skills} onChange={(e) => setMe({ ...me, skills: e.target.value })} placeholder="skills (comma separated)" style={{ width: "100%", marginBottom: 8 }} />
      <input value={me.availability} onChange={(e) => setMe({ ...me, availability: e.target.value })} placeholder="availability" style={{ width: "100%", marginBottom: 8 }} />
      <button onClick={save}>Save</button>
      {msg ? <p>{msg}</p> : null}
      <p style={{ color: "#666" }}>Admin can list all volunteers via GET /api/volunteers</p>
    </div>
  );
}
