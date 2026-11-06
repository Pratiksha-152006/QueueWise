import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, User, Phone, Building2, Ticket } from "lucide-react";
import "./Register.css";
import { createToken } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const organizationAliases = {
    Banks: "Bank",
    Hospitals: "Hospital",
    Restaurants: "Restaurant",
    Government: "Government",
    Airports: "Airport",
    "Shopping Malls": "Shopping Mall"
  };
  const [organization, setOrganization] = useState(organizationAliases[location.state?.organization] || "");
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const organizationServices = {
    Bank: ["Cash Deposit", "Cash Withdrawal", "Account Services", "Loan Enquiry"],
    Hospital: ["General Consultation", "Specialist Consultation", "Lab Tests", "Pharmacy"],
    Restaurant: ["Table Booking", "Food Ordering", "Takeaway"],
    Government: ["Document Services", "Certificate Application", "Public Enquiry"],
    Airport: ["Check-in Assistance", "Customer Support", "Baggage Services"],
    "Shopping Mall": ["Customer Support", "Billing", "Returns and Exchange"],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!organization || !service || !name.trim() || !phone.trim()) {
      alert("Please complete all the fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createToken({
        visitor_name: name.trim(),
        phone_number: phone,
        organization_type: organization,
        service_type: service,
        priority: "Normal"
      });

      navigate("/token", {
        state: {
          token: result.token_number,
          name: result.visitor_name,
          phone,
          organization,
          service: result.service_type,
          status: result.status
        }
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
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
            <label>Organization Type</label>
            <select
              value={organization}
              onChange={(e) => {
                setOrganization(e.target.value);
                setService("");
              }}
              required
            >
              <option value="">Select an organization</option>
              {Object.keys(organizationServices).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

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

            <button className="generate-button" type="submit" disabled={submitting}>
              {submitting ? "Generating..." : "Generate My Token"} <ArrowRight size={18} />
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