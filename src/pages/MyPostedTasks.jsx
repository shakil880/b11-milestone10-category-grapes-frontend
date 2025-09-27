import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import './MyPostedTasks.css';
import { API_ENDPOINTS, apiRequest } from '../config/api';

const MyPostedTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      apiRequest.get(API_ENDPOINTS.MY_TASKS(user.email))
        .then(data => {
          setTasks(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
          toast.error('Error loading your tasks');
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (taskId, taskTitle) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${taskTitle}"? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#95a5a6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_ENDPOINTS.TASKS}/${taskId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setTasks(tasks.filter(task => task._id !== taskId));
          toast.success('Task deleted successfully!');
        } else {
          throw new Error('Failed to delete task');
        }
      } catch (error) {
        toast.error('Error deleting task. Please try again.');
      }
    }
  };

  const viewBids = async (taskId, taskTitle) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.BIDS}/${taskId}`);
      const bids = await response.json();
      
      if (bids.length === 0) {
        Swal.fire({
          title: 'No Bids Yet',
          text: `No one has bid on "${taskTitle}" yet.`,
          icon: 'info'
        });
        return;
      }

      const bidsHtml = bids.map(bid => `
        <div style="text-align: left; margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <strong>${bid.bidderName}</strong> - $${bid.amount}<br>
          <small style="color: #666;">${bid.bidderEmail}</small><br>
          <p style="margin: 5px 0 0 0; font-size: 14px;">${bid.message}</p>
        </div>
      `).join('');

      Swal.fire({
        title: `Bids for "${taskTitle}"`,
        html: `<div style="max-height: 400px; overflow-y: auto;">${bidsHtml}</div>`,
        width: '600px',
        confirmButtonText: 'Close'
      });
    } catch (error) {
      toast.error('Error loading bids');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="my-posted-tasks-page">
      <div className="container">
        <div className="page-header">
          <div className="page-header-content">
            <h1>My Posted Tasks</h1>
          </div>
          <Link to="/add-task" className="add-task-btn">Post New Task</Link>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks posted yet</h3>
            <p>Start by posting your first task to find talented freelancers.</p>
            <Link to="/add-task" className="cta-btn">Post Your First Task</Link>
          </div>
        ) : (
          <div className="tasks-table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Category</th>
                  <th>Budget</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task._id}>
                    <td>
                      <div className="task-title-cell">
                        <h4>{task.title}</h4>
                        <p>{task.description.substring(0, 80)}...</p>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{task.category}</span>
                    </td>
                    <td>
                      <span className="budget-amount">${task.budget}</span>
                    </td>
                    <td>
                      <span className="deadline-date">
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/update-task/${task._id}`} 
                          className="action-btn update-btn"
                          title="Update Task"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(task._id, task.title)}
                          className="action-btn delete-btn"
                          title="Delete Task"
                        >
                          Delete
                        </button>
                        <button 
                          onClick={() => viewBids(task._id, task.title)}
                          className="action-btn bids-btn"
                          title="View Bids"
                        >
                          View Bids
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostedTasks;