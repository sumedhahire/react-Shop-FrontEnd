import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AddUser.css';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    address: '',
  });



  // Handle form input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(
        '/api/v1/user/admin',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          birthdate: new Date(formData.birthDate).toISOString(),
          address: formData.address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        address: '',
      });
      
    } catch (err) {
      setError('Failed to add user');
      console.error(err.response || err);
    }
  };

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      {/* Add User Form */}
      <form className="user-add-form" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h3>Add New User</h3>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="submit">Add User</button>
      </form>

    </div>
  );
};

export default UserList;
