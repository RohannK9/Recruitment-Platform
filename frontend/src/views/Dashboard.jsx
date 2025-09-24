import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import { getSummary } from '../utils/jobService.js';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [summary, setSummary] = useState({ jobCount: 0, applicationCount: 0, interviewCount: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await getSummary();
      setSummary(data);
    })();
  }, []);

  return (
    <div>
      <Navbar logout={logout} isAuthenticated={!!user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Open Positions</h2>
            <p className="text-gray-600">{summary.jobCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Applications</h2>
            <p className="text-gray-600">{summary.applicationCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Interviews Scheduled</h2>
            <p className="text-gray-600">{summary.interviewCount}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
