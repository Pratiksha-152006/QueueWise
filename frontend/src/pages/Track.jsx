
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Users, Search, ArrowLeft } from "lucide-react";

function Track() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();

    if (token.trim() === "") {
      alert("Please enter your token number");
      return;
    }

    setSearched(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f7ff",
      padding: "40px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "35px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "480px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={22} /> Back to Home
        </button>

        <h1 style={{ textAlign: "center", marginTop: "30px" }}>
          Track My Token
        </h1>

        <p style={{ textAlign: "center", color: "#64748b" }}>
          Enter your queue token to check your status.
        </p>

        <form onSubmit={handleTrack}>
          <input
            type="text"
            placeholder="Example: A001"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setSearched(false);
            }}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              marginTop: "20px",
              fontSize: "16px"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "15px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            <Search size={17} /> Track Token
          </button>
        </form>

        {searched && (
          <div style={{
            marginTop: "25px",
            padding: "20px",
            background: "#eaf1ff",
            borderRadius: "12px"
          }}>
            <h2 style={{ color: "#2563eb", textAlign: "center" }}>
              {token.toUpperCase()}
            </h2>
            <p><Users size={17} /> Queue Position: 1</p>
            <p><Clock size={17} /> Estimated Wait: 10 minutes</p>
            <p>Status: Waiting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Track;
