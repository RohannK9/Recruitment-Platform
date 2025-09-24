import React, { useEffect, useState } from 'react';
import { getJobs, applyToJob } from '../utils/jobService.js';
import Navbar from '../components/Navbar.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const JobListings = () => {
  const { user, logout } = React.useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getJobs();
      setJobs(data);
    })();
  }, []);

  const handleApply = async (id) => {
    // simple apply with user.name/email
    await applyToJob(id, {
      applicantName: user?.name || 'Anonymous',
      applicantEmail: user?.email || 'anon@example.com',
    });
    alert('Application submitted!');
  };

  return (
    <div>
      <Navbar logout={logout} isAuthenticated={!!user} />
      <main className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-700 mb-2">{job.description}</p>
              <p className="text-sm text-gray-500 mb-2">Location: {job.location}</p>
              {user && (
                <button
                  onClick={() => handleApply(job._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Apply
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobListings;
