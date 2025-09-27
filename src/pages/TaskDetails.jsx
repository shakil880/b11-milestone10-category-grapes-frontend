import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { API_ENDPOINTS, apiRequest } from '../config/api';
import toast from 'react-hot-toast';
import './TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [submittingBid, setSubmittingBid] = useState(false);

  useEffect(() => {
    fetch(`${API_ENDPOINTS.TASKS}/${id}`)
      .then(res => res.json())
      .then(data => {
        setTask(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching task:', error);
        toast.error('Error loading task details');
        setLoading(false);
      });
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setSubmittingBid(true);

    const bidData = {
      taskId: id,
      bidderEmail: user?.email,
      bidderName: user?.displayName || user?.email?.split('@')[0],
      amount: parseFloat(bidAmount),
      message: bidMessage
    };

    try {
      const response = await fetch(API_ENDPOINTS.BIDS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
      });

      if (response.ok) {
        toast.success('Bid submitted successfully!');
        setBidAmount('');
        setBidMessage('');
      } else {
        throw new Error('Failed to submit bid');
      }
    } catch (error) {
      toast.error('Error submitting bid. Please try again.');
    } finally {
      setSubmittingBid(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="error-container">
        <h2>Task not found</h2>
        <Link to="/browse-tasks" className="back-btn">Back to Browse Tasks</Link>
      </div>
    );
  }

  const isOwnTask = user?.email === task.userEmail;

  return (
    <div className="task-details-page">
      <div className="container">
        <div className="task-header">
          <Link to="/browse-tasks" className="back-link">← Back to Tasks</Link>
          <div className="task-category">{task.category}</div>
        </div>

        <div className="task-content">
          <div className="task-main">
            <h1 className="task-title">{task.title}</h1>
            
            <div className="task-meta">
              <div className="meta-item">
                <span className="label">Budget:</span>
                <span className="budget">${task.budget}</span>
              </div>
              <div className="meta-item">
                <span className="label">Deadline:</span>
                <span className="deadline">{new Date(task.deadline).toLocaleDateString()}</span>
              </div>
              <div className="meta-item">
                <span className="label">Posted by:</span>
                <span className="poster">{task.userName}</span>
              </div>
              <div className="meta-item">
                <span className="label">Posted on:</span>
                <span className="date">{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="task-description">
              <h3>Task Description</h3>
              <p>{task.description}</p>
            </div>
          </div>

          <div className="task-sidebar">
            {!isOwnTask ? (
              <div className="bid-section">
                <h3>Submit Your Proposal</h3>
                <form onSubmit={handleBidSubmit} className="bid-form">
                  <div className="form-group">
                    <label htmlFor="bidAmount">Your Bid Amount ($)</label>
                    <input
                      type="number"
                      id="bidAmount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      min="1"
                      step="0.01"
                      placeholder="Enter your bid"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bidMessage">Proposal Message</label>
                    <textarea
                      id="bidMessage"
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      required
                      rows="4"
                      placeholder="Explain why you're the best fit for this task"
                    />
                  </div>
                  
                  <button type="submit" className="bid-btn" disabled={submittingBid}>
                    {submittingBid ? 'Submitting...' : 'Submit Proposal'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="owner-section">
                <h3>This is your task</h3>
                <p>You cannot bid on your own task.</p>
                <Link to={`/update-task/${task._id}`} className="edit-btn">
                  Edit Task
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;