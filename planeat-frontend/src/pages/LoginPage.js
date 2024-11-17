import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null); // For storing user details
  const navigate = useNavigate();
  const auth = getAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/details/${email}`);
      setUserDetails(response.data);
      console.log('Fetched User Details:', response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await fetchUserDetails(email); // Fetch additional user details
      navigate('/'); // Redirect to homepage
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (userDetails) {
      console.log('User Details loaded in state:', userDetails);
      // Perform any post-login actions with user details, if needed
    }
  }, [userDetails]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>

          <p className="text-center mt-4">
            Forgot your password? <Link to="/reset-password">Reset it</Link>
          </p>

          <p className="text-center mt-4">
            Not a user? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
