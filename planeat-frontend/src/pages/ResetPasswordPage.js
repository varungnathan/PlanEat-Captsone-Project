// planeat-frontend\src\pages\ResetPasswordPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('${process.env.REACT_APP_BACKEND_URL}/api/users/reset-password', { email });
      const resetLink = response.data.resetLink;

      window.open(resetLink, '_blank');

      setSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No account found with this email address.');
      } else {
        setError('Error generating password reset link. Please try again.');
      }
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Reset Password</h2>
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">Send Reset Link</button>
            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">Password reset link generated! Redirecting...</p>}
          </form>
          <div className="mt-3 text-center">
            <Link to="/login">Back to Login</Link> {/* Added Link */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
