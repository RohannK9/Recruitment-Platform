import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../utils/jobService.js';
import Navbar from '../components/Navbar.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const PostJob = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    salaryRange: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createJob(form);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating job');
    }
  };

  if (!user) return null;

  return (
    <div>
      <Navbar logout={logout} isAuthenticated={!!user} />
      <main className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="salaryRange"
            placeholder="Salary Range"
            value={form.salaryRange}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">
            Create Job
          </button>
        </form>
      </main>
    </div>
  );
};

export default PostJob;
