import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import './AddTask.css';

const AddTask = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName || user?.email?.split('@')[0],
      budget: parseFloat(formData.budget)
    };

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        toast.success('Task posted successfully!');
        setFormData({
          title: '',
          category: '',
          description: '',
          deadline: '',
          budget: ''
        });
      } else {
        throw new Error('Failed to post task');
      }
    } catch (error) {
      toast.error('Error posting task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-page">
      <div className="container">
        <div className="page-header">
          <h1>Post a New Task</h1>
          <p>Find the perfect freelancer for your project</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="add-task-form">
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

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Posting Task...' : 'Post Task'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;