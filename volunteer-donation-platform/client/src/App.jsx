import React, { useState } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const token = localStorage.getItem("token");

  if (!token) return <Login />;

  return <Dashboard onNavigate={setPage} page={page} />;
}
