import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <Navbar logout={logout} />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user?.name}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Email:</span> {user?.email}
        </p>
        <button
          onClick={logout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      </div>
    </div>
  );
};

export default Profile;
