import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import './UpdateTask.css';

const UpdateTask = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    budget: ''
  });

  const categories = [
    'Web Development',
    'Mobile Development', 
    'Design',
    'Writing',
    'Marketing',
    'Data Entry',
    'Translation',
    'Virtual Assistant',
    'Other'
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.userEmail !== user?.email) {
          toast.error('You can only update your own tasks');
          navigate('/my-posted-tasks');
          return;
        }
        
        setFormData({
          title: data.title,
          category: data.category,
          description: data.description,
          deadline: data.deadline.split('T')[0],
          budget: data.budget.toString()
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching task:', error);
        toast.error('Error loading task');
        navigate('/my-posted-tasks');
      });
  }, [id, user, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const updateData = {
      ...formData,
      budget: parseFloat(formData.budget)
    };

    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        toast.success('Task updated successfully!');
        navigate('/my-posted-tasks');
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      toast.error('Error updating task. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading task...</p>
      </div>
    );
  }

  return (
    <div className="update-task-page">
      <div className="container">
        <div className="page-header">
          <h1>Update Task</h1>
          <p>Modify your task details</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="update-task-form">
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter a clear, descriptive title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Describe what needs to be done, requirements, and expectations"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deadline">Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="budget">Budget ($)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="userEmail">Your Email</label>
                <input
                  type="email"
                  id="userEmail"
                  value={user?.email || ''}
                  disabled
                  className="readonly-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="userName">Your Name</label>
                <input
                  type="text"
                  id="userName"
                  value={user?.displayName || user?.email?.split('@')[0] || ''}
                  disabled
                  className="readonly-field"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/my-posted-tasks')} 
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="update-btn" disabled={updating}>
                {updating ? 'Updating...' : 'Update Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;