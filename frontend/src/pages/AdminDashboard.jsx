import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { getQueue, getQueueStatus } from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");

  const refresh = async () => {
    try {
      const [statusData, queueData] = await Promise.all([getQueueStatus(), getQueue()]);
      setStats(statusData);
      setTokens(queueData);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 5000);
    return () => clearInterval(timer);
  }, []);

  const serviceCounts = Object.entries(tokens.reduce((acc, token) => {
    if (token.status === "Waiting") acc[token.service_type] = (acc[token.service_type] || 0) + 1;
    return acc;
  }, {}));

  return (
    <div className="admin-dashboard">
      <aside className="dashboard-sidebar">
        <h2>QueueFlow</h2>
        <p className="sidebar-subtitle">Smart Queue Platform</p>
        <nav>
          <a className="active" href="/admin">Dashboard</a>
          <a href="/register">Register Queue</a>
          <a href="/track">Queue Status</a>
          <a href="/">Home</a>
        </nav>
        <div className="sidebar-footer">Smart service. Less waiting.</div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div><p className="eyebrow">OVERVIEW</p><h1>Admin Dashboard</h1><p>Live queue information from the backend.</p></div>
          <button className="primary-button" onClick={refresh}>Refresh</button>
        </header>
        <section className="welcome-panel">
          <div><p>QUEUE MANAGEMENT</p><h2>Queue overview</h2><span>Live status of registered tokens.</span></div>
          <div className="welcome-icon">⌛</div>
        </section>
        {error && <p className="demo-note">{error}</p>}
        <section className="stats-grid">
          <div className="stat-card"><span>Total Tokens</span><h2>{stats?.total_tokens ?? "—"}</h2><small>All registered tokens</small></div>
          <div className="stat-card"><span>Total Waiting</span><h2>{stats?.waiting ?? "—"}</h2><small>Across services</small></div>
          <div className="stat-card"><span>Now Serving</span><h2>{stats?.serving ?? "—"}</h2><small>Currently being served</small></div>
          <div className="stat-card"><span>Completed</span><h2>{stats?.completed ?? "—"}</h2><small>Completed tokens</small></div>
        </section>
        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-heading"><div><h3>Queue by Service</h3><p>People currently waiting</p></div><span className="live-label">● LIVE</span></div>
            {serviceCounts.length ? serviceCounts.map(([service, count]) => <div className="service-row" key={service}><span>{service}</span><strong>{count}</strong><div className="progress"><span style={{ width: `${Math.min(100, count * 10)}%` }} /></div></div>) : <p>No waiting tokens.</p>}
          </div>
          <div className="panel">
            <div className="panel-heading"><div><h3>Recent Tokens</h3><p>Latest queue activity</p></div></div>
            {tokens.slice(-6).reverse().map(token => <div className="serving-item" key={token.id}><div><strong>{token.token_number}</strong><small>{token.service_type}</small></div><span>{token.status}</span></div>)}
            {!tokens.length && <p>No tokens registered yet.</p>}
          </div>
        </section>
        <p className="demo-note">Dashboard refreshes automatically every 5 seconds.</p>
      </main>
    </div>
  );
}
export default AdminDashboard;
