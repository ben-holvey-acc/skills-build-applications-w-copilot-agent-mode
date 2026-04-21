import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/activities/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const items = data.results || data;
        console.log('Activities fetched:', items);
        console.log('API endpoint:', apiUrl);
        setActivities(items);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Activities</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Workout</th>
                <th>Duration (min)</th>
                <th>Calories Burned</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.user?.username || activity.user}</td>
                  <td>{activity.workout?.name || activity.workout}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories_burned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
