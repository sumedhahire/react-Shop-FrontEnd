import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/UserList.css'; // Import CSS


const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/user/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data.items);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      }
    };

    fetchUsers();
  }, [token]);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Birth Date</th>
              <th>Role</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{new Date(user.birthDate).toLocaleDateString()}</td>
                <td>{user.role}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;