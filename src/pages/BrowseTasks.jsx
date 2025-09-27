import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './BrowseTasks.css';
import { API_ENDPOINTS, apiRequest } from '../config/api';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    apiRequest.get(API_ENDPOINTS.TASKS)
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.category.toLowerCase() === filter.toLowerCase());

  const categories = ['all', 'Web Development', 'Design', 'Writing', 'Marketing', 'Data Entry'];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="browse-tasks-page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Tasks</h1>
          <p>Find the perfect project for your skills</p>
        </div>

        <div className="filters">
          <h3>Filter by Category:</h3>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="tasks-grid">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div key={task._id} className="task-card">
                <div className="task-category">{task.category}</div>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">
                  {task.description.length > 120 
                    ? `${task.description.substring(0, 120)}...` 
                    : task.description}
                </p>
                <div className="task-details">
                  <span className="task-budget">${task.budget}</span>
                  <span className="task-deadline">
                    Due: {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="task-footer">
                  <span className="task-poster">By {task.userName}</span>
                  <Link to={`/task/${task._id}`} className="details-btn">
                    See Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-tasks">
              <h3>No tasks found</h3>
              <p>Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseTasks;