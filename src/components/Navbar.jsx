import { NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import "./Navbar.css";

// Default Profile Picture SVG Component
const DefaultProfileIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" className="default-profile-icon">
    <circle cx="20" cy="20" r="20" fill="#667eea"/>
    <circle cx="20" cy="16" r="6" fill="white"/>
    <path d="M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="white"/>
  </svg>
);

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
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error("Error logging out");
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
          <ul className={`navbar-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/browse-tasks"
                className="nav-link"
                onClick={closeMobileMenu}
              >
                Browse Tasks
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <NavLink
                  to="/my-posted-tasks"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  My Posted Tasks
                </NavLink>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <NavLink
                  to="/add-task"
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  Add Task
                </NavLink>
              </li>
            )}
            {user ? (
              <li className="nav-item mobile-auth">
                <div className="mobile-user-info">
                  <div className="user-profile">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user?.displayName || "User"}
                        className="user-avatar"
                        title={user?.displayName || user?.email}
                      />
                    ) : (
                      <DefaultProfileIcon />
                    )}
                    <span className="user-name">
                      {user?.displayName || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogOut();
                      closeMobileMenu();
                    }}
                    className="logout-btn"
                  >
                    Log Out
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item mobile-auth">
                <NavLink
                  to="/login"
                  className="auth-btn login-btn"
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="auth-btn signup-btn"
                  onClick={closeMobileMenu}
                >
                  Signup
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <div className="user-profile">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user?.displayName || "User"}
                      className="user-avatar"
                      title={user?.displayName || user?.email}
                    />
                  ) : (
                    <DefaultProfileIcon />
                  )}
                  <span className="user-name">
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <button onClick={handleLogOut} className="logout-btn">
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink to="/login" className="auth-btn login-btn">
                Login
              </NavLink>
              <NavLink to="/register" className="auth-btn signup-btn">
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
