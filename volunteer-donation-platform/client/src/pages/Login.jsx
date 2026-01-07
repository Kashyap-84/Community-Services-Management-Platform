import React, { useState } from "react";
import { api, setToken } from "../api.js";

export default function Login() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [msg, setMsg] = useState("");

  async function onLogin(e) {
    e.preventDefault();
    setMsg("");
    try {
      const data = await api("/api/auth/login", { method: "POST", body: { email, password } });
      setToken(data.token);
      window.location.reload();
    } catch (err) {
      setMsg(String(err.message));
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "system-ui" }}>
      <h2>Login</h2>
      <p style={{ color: "#666" }}>Create an admin via POST /api/auth/register</p>
      <form onSubmit={onLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" style={{ width: "100%", marginBottom: 8 }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" style={{ width: "100%", marginBottom: 8 }} />
        <button style={{ width: "100%" }}>Login</button>
      </form>
      {msg ? <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{msg}</pre> : null}
    </div>
  );
}
