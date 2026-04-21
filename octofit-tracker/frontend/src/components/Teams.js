import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const apiUrl = codespaceName === 'localhost' 
    ? 'http://localhost:8000/api/teams/'
    : `https://${codespaceName}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        console.log('Teams fetched:', items);
        console.log('API endpoint:', apiUrl);
        setTeams(items);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">Teams</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Team Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => (
                <tr key={team.id}>
                  <td><strong>{team.name}</strong></td>
                  <td>{team.description}</td>
                  <td>{team.members?.length || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
