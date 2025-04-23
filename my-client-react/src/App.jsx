import React, { useState, useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]); // State to hold users data
  const [error, setError] = useState(null); // State for error handling

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch('http://localhost:8080/students');
        const response = await fetch('http://localhost/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means it runs once on mount

  return (
    <>
      <h1>Users List</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" style={{ width: '50%', margin: '20px auto' }}>
          <thead>
            <tr>
              <th>StudentID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Age</th>
              <th>Major</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.StudentID}>
                <td>{user.StudentID}</td>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Age}</td>
                <td>{user.Major}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default App
