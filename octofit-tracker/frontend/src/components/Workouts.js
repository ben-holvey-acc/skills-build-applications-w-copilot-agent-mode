import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/workouts/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        console.log('Workouts fetched:', items);
        console.log('API endpoint:', apiUrl);
        setWorkouts(items);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      'Easy': 'bg-success',
      'Medium': 'bg-warning text-dark',
      'Hard': 'bg-danger'
    };
    return <span className={`badge ${colors[difficulty] || 'bg-secondary'}`}>{difficulty}</span>;
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h2 className="mb-0">Workouts</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Workout Name</th>
                <th>Description</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => (
                <tr key={workout.id}>
                  <td><strong>{workout.name}</strong></td>
                  <td>{workout.description}</td>
                  <td>{getDifficultyBadge(workout.difficulty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
