import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Clock,
  MapPin,
  ArrowRight,
  Building2,
  HeartPulse,
  Utensils,
  Landmark,
  Plane,
  ShoppingBag,
  Ticket,
  Search,
  Users,
  Zap,
} from "lucide-react";
import "./Home.css";

const services = [
  { name: "Banks", icon: Landmark, description: "Banking and financial services" },
  { name: "Hospitals", icon: HeartPulse, description: "Healthcare and appointments" },
  { name: "Restaurants", icon: Utensils, description: "Dining and food services" },
  { name: "Government", icon: Building2, description: "Public and citizen services" },
  { name: "Airports", icon: Plane, description: "Airport service queues" },
  { name: "Shopping Malls", icon: ShoppingBag, description: "Stores and customer services" },
];

function Home() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <header className="home-navbar">
        <a className="brand" href="#">
          <span className="brand-icon"><Ticket size={23} /></span>
          QueueFlow
        </a>

        <nav className="home-nav-links">
          <a href="#services">Explore Services</a>
          <a href="#how-it-works">How It Works</a>
        </nav>

      <button
  className="track-button"
  onClick={() => navigate("/track")}
>
  <Clock size={17} /> Track My Token
</button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">
              <Zap size={15} /> SMART QUEUE MANAGEMENT
            </span>

            <h1>
              Your Time Matters.
              <br />
              <span>Skip the Waiting.</span>
            </h1>

            <p>
              Join queues online, get your digital token, and track your
              waiting time from anywhere. No more standing in long lines!
            </p>

            <a className="hero-button" href="#services">
              Join a Queue <ArrowRight size={18} />
            </a>

            <div className="hero-benefits">
              <span><Clock size={16} /> Save your time</span>
              <span><MapPin size={16} /> Queue from anywhere</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="ticket-card">
              <div className="ticket-top">
                <span>YOUR DIGITAL TOKEN</span>
                <Ticket size={22} />
              </div>
              <div className="ticket-number">A-024</div>
              <div className="ticket-status">Example token preview</div>
              <div className="ticket-divider" />
              <div className="ticket-details">
                <div>
                  <small>People ahead</small>
                  <strong>5</strong>
                </div>
                <div>
                  <small>Estimated wait</small>
                  <strong>15 min</strong>
                </div>
              </div>
              <div className="ticket-footer">
                <span className="status-dot" /> Sample preview only
              </div>
            </div>
            <div className="floating-clock"><Clock size={27} /></div>
            <div className="floating-users"><Users size={25} /></div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="section-heading">
            <span>ONE PLATFORM, MANY SERVICES</span>
            <h2>Where do you want to go?</h2>
            <p>Select a place and find the service you need.</p>
          </div>

          <div className="service-search">
            <Search size={19} />
            <input
              type="text"
              placeholder="Search banks, hospitals, restaurants..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="services-grid">
            {filteredServices.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  className={`service-card ${
                    selectedService === service.name ? "selected" : ""
                  }`}
                  key={service.name}
                  onClick={() => setSelectedService(service.name)}
                >
                  <span className="service-icon"><Icon size={25} /></span>
                  <strong>{service.name}</strong>
                  <small>{service.description}</small>
                  <ArrowRight className="service-arrow" size={18} />
                </button>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <p className="no-results">No matching services found.</p>
          )}

          {selectedService && (
            <div className="selection-message">
              <span>You selected: <strong>{selectedService}</strong></span>
             <button onClick={() => navigate("/register", { state: { organization: selectedService } })}>
                Continue <ArrowRight size={17} />
              </button>
            </div>
          )}
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <span>IT'S SIMPLE</span>
            <h2>How QueueFlow works</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div>01</div>
              <h3>Choose a service</h3>
              <p>Find the organization and service you need.</p>
            </div>
            <div className="step-card">
              <div>02</div>
              <h3>Get your token</h3>
              <p>Enter your details and receive a digital queue token.</p>
            </div>
            <div className="step-card">
              <div>03</div>
              <h3>Track your queue</h3>
              <p>Check your position and estimated waiting time.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <strong>QueueFlow</strong>
        <span>Less waiting. More living.</span>
      </footer>
    </div>
  );
}

export default Home;
