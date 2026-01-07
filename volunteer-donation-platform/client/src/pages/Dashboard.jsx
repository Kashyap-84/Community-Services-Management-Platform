import React from "react";
import Volunteers from "./Volunteers.jsx";
import Donations from "./Donations.jsx";

export default function Dashboard({ page, onNavigate }) {
  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 900, margin: "20px auto" }}>
      <h2>Volunteer & Donation Platform</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button onClick={() => onNavigate("volunteers")}>Volunteers</button>
        <button onClick={() => onNavigate("donations")}>Donations</button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      {page === "volunteers" ? <Volunteers /> : null}
      {page === "donations" ? <Donations /> : null}
      {page === "dashboard" ? <p>Choose a section.</p> : null}
    </div>
  );
}
