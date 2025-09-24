import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../context/AuthContext.jsx';
import Login from '../views/Login.jsx';
import Register from '../views/Register.jsx';
import Profile from '../views/Profile.jsx';
import Dashboard from '../views/Dashboard.jsx';
import JobListings from '../views/JobListings.jsx';
import PostJob from '../views/PostJob.jsx';

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/jobs" element={<JobListings />} />
      <Route
        path="/post-job"
        element={
          <PrivateRoute>
            <PostJob />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </AuthProvider>
);

export default App;
