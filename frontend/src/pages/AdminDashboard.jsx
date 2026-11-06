import React from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>QueueFlow</h2>
        <p className="sidebar-subtitle">Smart Queue Platform</p>

        <nav>
          <a className="active" href="#">Dashboard</a>
          <a href="#">Register Queue</a>
          <a href="#">Queue Status</a>
          <a href="#">My Token</a>
          <a href="#">Settings</a>
        </nav>

        <div className="sidebar-footer">Smart service. Less waiting.</div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Admin Dashboard</h1>
            <p>Monitor queues and manage service counters.</p>
          </div>

          <button className="primary-button">+ Add Service</button>
        </header>

        <section className="welcome-panel">
          <div>
            <p>QUEUE MANAGEMENT</p>
            <h2>Good day, Administrator 👋</h2>
            <span>Here's what's happening across your services today.</span>
          </div>
          <div className="welcome-icon">⌛</div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total Waiting</span>
            <h2>128</h2>
            <small>Across all services</small>
          </div>

          <div className="stat-card">
            <span>Now Serving</span>
            <h2>24</h2>
            <small>Currently being served</small>
          </div>

          <div className="stat-card">
            <span>Avg. Wait Time</span>
            <h2>18 min</h2>
            <small>Estimated waiting time</small>
          </div>

          <div className="stat-card">
            <span>Active Counters</span>
            <h2>08</h2>
            <small>Currently operational</small>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <h3>Queue by Service</h3>
                <p>People currently waiting</p>
              </div>
              <span className="live-label">● LIVE DEMO</span>
            </div>

            <div className="service-row">
              <span>Customer Support</span>
              <strong>42</strong>
              <div className="progress"><span style={{ width: "85%" }} /></div>
            </div>

            <div className="service-row">
              <span>Payments & Billing</span>
              <strong>35</strong>
              <div className="progress"><span style={{ width: "70%" }} /></div>
            </div>

            <div className="service-row">
              <span>Appointments</span>
              <strong>28</strong>
              <div className="progress"><span style={{ width: "56%" }} /></div>
            </div>

            <div className="service-row">
              <span>General Enquiries</span>
              <strong>23</strong>
              <div className="progress"><span style={{ width: "46%" }} /></div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-heading">
              <div>
                <h3>Now Serving</h3>
                <p>Current counter activity</p>
              </div>
            </div>

            <div className="serving-item">
              <div><strong>#A024</strong><small>Customer Support</small></div>
              <span>Counter 01</span>
            </div>

            <div className="serving-item">
              <div><strong>#B012</strong><small>Payments & Billing</small></div>
              <span>Counter 03</span>
            </div>

            <div className="serving-item">
              <div><strong>#C008</strong><small>Appointments</small></div>
              <span>Counter 05</span>
            </div>
          </div>
        </section>

        <p className="demo-note">
          Demo dashboard — sample figures are displayed until the backend is connected.
        </p>
      </main>
    </div>
  );
}

export default AdminDashboard;