import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
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
        <button type="submit" className="btn btn-primary mt-4">Send Password Reset Email</button>
        {error && <p className="text-danger mt-3">{error}</p>}
        {success && <p className="text-success mt-3">Password reset email sent! Please check your inbox.</p>}
      </form>
    </div>
  );
}

export default ResetPasswordPage;
