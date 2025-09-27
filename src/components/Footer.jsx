import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="brand-name">TaskMarket</h3>
            <p className="brand-description">Connect talented freelancers with ambitious clients</p>
          </div>
          
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/browse-tasks" className="footer-link">Browse Tasks</Link>
            <Link to="/add-task" className="footer-link">Post Task</Link>
            <a href="#" className="footer-link">Help</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} TaskMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
