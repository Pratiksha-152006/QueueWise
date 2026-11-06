import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Clock, Users, Ticket } from "lucide-react";
import { getQueuePosition, getWaitEstimate } from "../services/api";

function Token() {
  const navigate = useNavigate();
  const location = useLocation();
  const details = location.state || {};
  const [position, setPosition] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!details.token) return;
    let active = true;
    const load = async () => {
      try {
        const [queueData, estimateData] = await Promise.all([
          getQueuePosition(details.token),
          getWaitEstimate(details.token)
        ]);
        if (active) {
          setPosition(queueData);
          setEstimate(estimateData);
        }
      } catch (err) {
        if (active) setError(err.message);
      }
    };
    load();
    return () => { active = false; };
  }, [details.token]);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7ff", display: "flex", justifyContent: "center", alignItems: "center", padding: "30px" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "20px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
        <CheckCircle size={55} color="#16a34a" />
        <h1 style={{ fontSize: "32px", lineHeight: "1.2", margin: "20px 0 10px" }}>You're in the Queue!</h1>
        <p>Your registration was successful.</p>
        {details.token ? <>
          <div style={{ background: "#eaf1ff", padding: "25px", borderRadius: "15px", margin: "25px 0" }}>
            <Ticket size={30} color="#2563eb" />
            <p>Your Queue Token</p>
            <h1 style={{ color: "#2563eb", fontSize: "42px" }}>{details.token}</h1>
            <p>{details.organization} · {details.service}</p>
          </div>
          <div style={{ textAlign: "left", lineHeight: "2" }}>
            <p><strong>Name:</strong> {details.name}</p>
            <p><strong>Status:</strong> {position?.status || details.status || "Loading"}</p>
            <p><Users size={18} /> Queue Position: {position?.position ?? (position?.status === "Serving" ? "Now serving" : "Loading")}</p>
            <p><Clock size={18} /> Estimated Wait: {estimate?.estimated_wait_minutes == null ? "Unavailable" : `${estimate.estimated_wait_minutes} minutes`}</p>
          </div>
          {error && <p style={{ color: "#dc2626" }}>{error}</p>}
        </> : <p>No token details found. Please register again.</p>}
        <button onClick={() => navigate("/track")} style={{ background: "#2563eb", color: "white", border: "none", padding: "14px 25px", borderRadius: "10px", cursor: "pointer", width: "100%", fontSize: "16px", marginTop: "15px" }}>Track My Token</button>
        <button onClick={() => navigate("/")} style={{ background: "transparent", color: "#2563eb", border: "none", padding: "14px 25px", cursor: "pointer", width: "100%" }}>Back to Home</button>
      </div>
    </div>
  );
}
export default Token;
