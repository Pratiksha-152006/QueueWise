import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, User, Phone, Building2, Ticket } from "lucide-react";
import "./Register.css";

function Register() {
const navigate = useNavigate();
const location = useLocation();

const selectedOrganization = new URLSearchParams(location.search)
  .get("organization");

console.log("Selected organization:", selectedOrganization);

const [organization, setOrganization] = useState(
  selectedOrganization || location.state?.organization || ""
);
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const organizationServices = {
    Bank: ["Cash Deposit", "Cash Withdrawal", "Account Services", "Loan Enquiry"],
    Hospital: ["General Consultation", "Specialist Consultation", "Lab Tests", "Pharmacy"],
    Restaurant: ["Table Booking", "Food Ordering", "Takeaway"],
    Government: ["Document Services", "Certificate Application", "Public Enquiry"],
    Airport: ["Check-in Assistance", "Customer Support", "Baggage Services"],
    "Shopping Mall": ["Customer Support", "Billing", "Returns and Exchange"],
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  if (!organization || !service || !name.trim() || !phone.trim()) {
    alert("Please complete all the fields.");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Generate a new demo token
  const tokenNumber =
    Number(localStorage.getItem("queueTokenCounter") || "0") + 1;

  localStorage.setItem("queueTokenCounter", tokenNumber);

  const generatedToken = `Q${String(tokenNumber).padStart(3, "0")}`;

  // Send registration details to the token page
  navigate("/token", {
    state: {
      token: generatedToken,
      name: name,
      phone: phone,
      organization: organization,
      service: service,
    },
  });
};
  return (
    <div className="register-page">
      <header className="register-header">
        <a href="/" className="register-brand">
          <Ticket size={23} /> QueueFlow
        </a>
        <span>Customer Registration</span>
      </header>

      <main className="register-container">
        <a href="/" className="back-link">
          <ArrowLeft size={17} /> Back to Home
        </a>

        <div className="register-card">
          <div className="register-heading">
            <div className="register-icon"><Building2 size={27} /></div>
            <h1>Join a Queue</h1>
            <p>Enter your details and get your digital queue token.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="selected-organization">
  <Building2 size={18} />
  <span>Registering for: <strong>{organization}</strong></span>
</div>

            <label>Select Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              disabled={!organization}
              required
            >
              <option value="">Select a service</option>
              {(organizationServices[organization] || []).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <label>Your Full Name</label>
            <div className="register-input">
              <User size={18} />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <label>Mobile Number</label>
            <div className="register-input">
              <Phone size={18} />
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                required
              />
            </div>

            <button className="generate-button" type="submit">
              Generate My Token <ArrowRight size={18} />
            </button>
          </form>

          <p className="privacy-note">
            No account required. Your queue registration is quick and simple.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;
