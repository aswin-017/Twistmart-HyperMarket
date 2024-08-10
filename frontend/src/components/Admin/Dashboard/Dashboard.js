import React from 'react';
import { FaUser, FaUsers, FaBox, FaTruck } from 'react-icons/fa'; // Importing icons from react-icons
import '../../../assets/css/admin/Dashboard.css';

import Charts from './Legend';

// StatsCard Component
const StatsCard = ({ title, count, icon }) => {
  return (
    <div className="stats-card">
      <div className="icon-container">
        {icon}
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <main className="dashboard">
      <h2>Dashboard Statistics</h2>
      <div className="card-grid">
        <StatsCard
          title="Users"
          count="1,245"
          icon={<FaUser size={40} />}
        />
        <StatsCard
          title="Partners"
          count="98"
          icon={<FaUsers size={40} />}
        />
        <StatsCard
          title="Orders"
          count="3,456"
          icon={<FaBox size={40} />}
        />
        
      </div>
      <Charts/>
    </main>
  );
};

export default Dashboard;