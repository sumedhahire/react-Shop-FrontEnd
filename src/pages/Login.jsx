import React, { useState } from 'react';
import axios from 'axios';
import './styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  const data = new URLSearchParams();
  data.append('client_id', process.env.REACT_APP_CLIENT_ID);       // your client_id here
  data.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);   // your client_secret here
  data.append('username', email);
  data.append('password', password);
  data.append('grant_type', 'password');

  try {
    const response = await axios.post('/api/login', data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Check if tokens are present in response
    if (response.data && response.data.data && response.data.data.access_token) {
      const { access_token, refresh_token, expires_in } = response.data.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', expires_in);
      localStorage.setItem('token_timestamp', Date.now());

      // Now fetch user info
      const userResponse = await axios.get('/api/v1/user', {
        headers: {
          Authorization: `Bearer ${response.data.data.access_token}`,
        },
      });

      // Save user info
      localStorage.setItem('user', JSON.stringify(userResponse.data.data)); // adjust if your user data is nested differently


      window.location.href = '/inventory'; // redirect after login
    } else {
      throw new Error('Invalid credentials or no access token returned');
    }
  } catch (err) {
    console.error(err);
    setError('Login failed. Please check your credentials.');
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
          <button className="login-button" type="submit">Log In</button>
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
