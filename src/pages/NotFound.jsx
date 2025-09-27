import { Link } from 'react-router';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-description">
            The page you are looking for might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="home-btn">
            Back to Home
          </Link>
        </div>
        <div className="error-illustration">
          <div className="floating-task">📋</div>
          <div className="floating-task">💼</div>
          <div className="floating-task">⚡</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;