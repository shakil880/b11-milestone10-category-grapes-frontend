import { useState, useEffect } from 'react';
import './Home.css';

import SimpleHome from './SimpleHome';

const Home = () => {
  const [featuredTasks, setFeaturedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Try to fetch from backend, but provide fallback data
    fetch('http://localhost:5000/tasks/featured')
      .then(res => res.json())
      .then(data => {
        setFeaturedTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Backend not available, using mock data:', error);
        // Provide mock data when backend is not available
        setFeaturedTasks([
          {
            _id: '1',
            title: 'Build a React Website',
            category: 'Web Development',
            description: 'Need a modern React website with responsive design and clean UI.',
            budget: 500,
            deadline: '2025-10-15',
            userName: 'John Doe'
          },
          {
            _id: '2',
            title: 'Logo Design',
            category: 'Design',
            description: 'Create a professional logo for a tech startup company.',
            budget: 200,
            deadline: '2025-10-10',
            userName: 'Jane Smith'
          },
          {
            _id: '3',
            title: 'Content Writing',
            category: 'Writing',
            description: 'Write SEO-optimized blog posts for a marketing website.',
            budget: 150,
            deadline: '2025-10-20',
            userName: 'Mike Johnson'
          }
        ]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bannerSlides = [
    {
      id: 1,
      title: "Find Expert Freelancers",
      subtitle: "Connect with skilled professionals for your projects",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Post Your Tasks",
      subtitle: "Get quality work done by talented freelancers",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Build Your Career",
      subtitle: "Start your freelancing journey with us today",
      image: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="home-page">
      <section className="banner-section">
        <div className="banner-slider">
          {bannerSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
              style={{backgroundImage: `url(${slide.image})`}}
            >
              <div className="banner-overlay">
                <div className="banner-content">
                  <h1 className="banner-title">{slide.title}</h1>
                  <p className="banner-subtitle">{slide.subtitle}</p>
                  <button className="cta-button">Get Started</button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="banner-indicators">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <SimpleHome />

      <section className="featured-tasks-section">
        <div className="container">
          <h2 className="section-title">Featured Tasks</h2>
          <p className="section-subtitle">Discover the latest opportunities</p>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading featured tasks...</p>
            </div>
          ) : (
            <div className="featured-tasks-grid">
              {featuredTasks.map(task => (
                <div key={task._id} className="task-card">
                  <div className="task-category">{task.category}</div>
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description.substring(0, 100)}...</p>
                  <div className="task-details">
                    <span className="task-budget">${task.budget}</span>
                    <span className="task-deadline">{new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="task-footer">
                    <span className="task-poster">By {task.userName}</span>
                    <a href={`/task/${task._id}`} className="view-details-btn">View Details</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">10,000+</h3>
              <p className="stat-label">Active Freelancers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">5,000+</h3>
              <p className="stat-label">Completed Projects</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">2,500+</h3>
              <p className="stat-label">Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">99%</h3>
              <p className="stat-label">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-icon">📝</div>
              <h3 className="step-title">Post Your Task</h3>
              <p className="step-description">Describe your project and set your budget</p>
            </div>
            <div className="step-item">
              <div className="step-icon">👥</div>
              <h3 className="step-title">Get Proposals</h3>
              <p className="step-description">Receive bids from qualified freelancers</p>
            </div>
            <div className="step-item">
              <div className="step-icon">🤝</div>
              <h3 className="step-title">Choose & Collaborate</h3>
              <p className="step-description">Select the best freelancer and work together</p>
            </div>
            <div className="step-item">
              <div className="step-icon">✅</div>
              <h3 className="step-title">Get Results</h3>
              <p className="step-description">Receive quality work on time</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;