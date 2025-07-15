// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, requireVerified = false }) => {
  const { userData, isVerified } = useAuth();
  const location = useLocation();

  const cameFrom = location.state?.from || '/';

  // 1. Not logged in
  if (!userData) {
    return (
      <AccessDenied message="You must be logged in to access this page." from={cameFrom} />
    );
  }

  // 2. Logged in but not verified and trying to access verified-only page
  if (requireVerified && !isVerified) {
    return (
      <AccessDenied message="You must verify your account to access this page." from={cameFrom} />
    );
  }

  // 3. Authorized
  return children;
};

const AccessDenied = ({ message, from }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h2 className="mb-4 text-2xl font-semibold text-red-600">Access Denied</h2>
      <p className="mb-6">{message}</p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default ProtectedRoute;
