import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Users, Search, ArrowLeft } from "lucide-react";
import { getToken, getQueuePosition, getWaitEstimate } from "../services/api";

function Track() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Please enter your token number");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const tokenNumber = token.trim().toUpperCase();
      const [details, position, estimate] = await Promise.all([
        getToken(tokenNumber),
        getQueuePosition(tokenNumber),
        getWaitEstimate(tokenNumber)
      ]);
      setResult({ details, position, estimate });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7ff", padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "white", padding: "35px", borderRadius: "20px", width: "100%", maxWidth: "480px", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
        <button onClick={() => navigate("/")} style={{ border: "none", background: "none", cursor: "pointer" }}><ArrowLeft size={22} /> Back to Home</button>
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>Track My Token</h1>
        <p style={{ textAlign: "center", color: "#64748b" }}>Enter your queue token to check your status.</p>
        <form onSubmit={handleTrack}>
          <input type="text" placeholder="Example: Q001" value={token} onChange={(e) => { setToken(e.target.value); setResult(null); setError(""); }} style={{ width: "100%", boxSizing: "border-box", padding: "15px", border: "1px solid #cbd5e1", borderRadius: "10px", marginTop: "20px", fontSize: "16px" }} />
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "15px", marginTop: "15px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px", fontSize: "16px", cursor: "pointer" }}>{loading ? "Checking..." : <><Search size={17} /> Track Token</>}</button>
        </form>
        {error && <p style={{ color: "#dc2626", marginTop: "18px" }}>{error}</p>}
        {result && <div style={{ marginTop: "25px", padding: "20px", background: "#eaf1ff", borderRadius: "12px" }}>
          <h2 style={{ color: "#2563eb", textAlign: "center" }}>{result.details.token_number}</h2>
          <p><strong>Name:</strong> {result.details.visitor_name}</p>
          <p><strong>Service:</strong> {result.details.service_type}</p>
          <p><Users size={17} /> Queue Position: {result.position.position ?? (result.position.status === "Serving" ? "Now serving" : "—")}</p>
          <p><Clock size={17} /> Estimated Wait: {result.estimate.estimated_wait_minutes == null ? "Unavailable" : `${result.estimate.estimated_wait_minutes} minutes`}</p>
          <p><strong>Status:</strong> {result.details.status}</p>
        </div>}
      </div>
    </div>
  );
}
export default Track;
