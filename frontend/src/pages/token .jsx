
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, Users, Ticket } from "lucide-react";

function Token() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f3f7ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        maxWidth: "480px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
      }}>
        <CheckCircle size={55} color="#16a34a" />

        <h1 style={{
  fontSize: "32px",
  lineHeight: "1.2",
  margin: "20px 0 10px",
  textAlign: "center"
}}>
  You're in the Queue!
</h1>
        <p>Your registration was successful.</p>

        <div style={{
          background: "#eaf1ff",
          padding: "25px",
          borderRadius: "15px",
          margin: "25px 0"
        }}>
          <Ticket size={30} color="#2563eb" />
          <p>Your Queue Token</p>
          <h1 style={{ color: "#2563eb", fontSize: "42px" }}>
            A001
          </h1>
        </div>

        <div style={{ textAlign: "left", lineHeight: "2.5" }}>
          <p><Users size={18} /> Queue Position: 1</p>
          <p><Clock size={18} /> Estimated Wait: 10 minutes</p>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "14px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px"
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Token;
