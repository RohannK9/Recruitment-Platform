import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ logout, isAuthenticated }) => (
  <nav className="bg-white shadow mb-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <Link
            to="/dashboard"
            className="flex-shrink-0 flex items-center text-xl font-bold text-blue-600"
          >
            Colbin
          </Link>
          <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Jobs
            </Link>
            {isAuthenticated && (
              <Link
                to="/post-job"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                Post Job
              </Link>
            )}
            <Link
              to="/profile"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Profile
            </Link>
          </div>
        </div>
        {isAuthenticated && (
          <div className="flex items-center">
            <button
              onClick={logout}
              className="text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  logout: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

Navbar.defaultProps = {
  logout: undefined,
  isAuthenticated: false,
};

export default Navbar;
