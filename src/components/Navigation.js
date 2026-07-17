import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-code' },
    { id: 'jobs', label: 'Jobs', icon: 'fas fa-briefcase' },
    { id: 'resume', label: 'Resume', icon: 'fas fa-file-alt' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <i className="fas fa-rocket"></i>
          <span>DevCareer</span>
        </div>
        
        <ul className="nav-menu">
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;