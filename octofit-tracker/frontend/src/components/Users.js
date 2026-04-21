import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/users/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        console.log('Users fetched:', items);
        console.log('API endpoint:', apiUrl);
        setUsers(items);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h2 className="mb-0">Users</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
                <th>Superhero</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>{user.team?.name || '-'}</td>
                  <td>{user.is_superhero ? <span className="badge bg-warning text-dark">Yes</span> : <span className="badge bg-secondary">No</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
