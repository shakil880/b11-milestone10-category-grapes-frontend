import { NavLink } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully');
      })
      .catch((error) => {
        toast.error('Error logging out');
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link">
            TaskMarket
          </NavLink>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>

        <div className="navbar-menu">
          <ul className={`navbar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-task" className="nav-link" onClick={closeMobileMenu}>Add Task</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/browse-tasks" className="nav-link" onClick={closeMobileMenu}>Browse Tasks</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/my-posted-tasks" className="nav-link" onClick={closeMobileMenu}>My Posted Tasks</NavLink>
            </li>
            {user ? (
              <li className="nav-item mobile-auth">
                <div className="mobile-user-info">
                  <img 
                    src={user?.photoURL || 'https://via.placeholder.com/40'} 
                    alt={user?.displayName || 'User'}
                    className="user-avatar"
                    title={user?.displayName || user?.email}
                  />
                  <button onClick={() => { handleLogOut(); closeMobileMenu(); }} className="logout-btn">
                    Log Out
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item mobile-auth">
                <NavLink to="/login" className="auth-btn login-btn" onClick={closeMobileMenu}>Login</NavLink>
                <NavLink to="/register" className="auth-btn signup-btn" onClick={closeMobileMenu}>Signup</NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <img 
                  src={user?.photoURL || 'https://via.placeholder.com/40'} 
                  alt={user?.displayName || 'User'}
                  className="user-avatar"
                  title={user?.displayName || user?.email}
                />
                <button onClick={handleLogOut} className="logout-btn">
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink to="/login" className="auth-btn login-btn">Login</NavLink>
              <NavLink to="/register" className="auth-btn signup-btn">Signup</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar
