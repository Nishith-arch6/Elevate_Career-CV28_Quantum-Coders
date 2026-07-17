import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Elevate Your <span className="gradient-text">Developer Career</span>
            </h1>
            <p className="hero-subtitle">
              Build projects, create professional resumes, and land your dream job in tech
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">
                <i className="fas fa-rocket"></i>
                Get Started
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-play"></i>
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="code-window">
              <div className="window-header">
                <div className="window-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
                <span className="window-title">career.js</span>
              </div>
              <div className="code-content">
                <div className="code-line">
                  <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}
                </div>
                <div className="code-line">
                  &nbsp;&nbsp;<span className="property">name</span>: <span className="string">'Your Name'</span>,
                </div>
                <div className="code-line">
                  &nbsp;&nbsp;<span className="property">skills</span>: [<span className="string">'React'</span>, <span className="string">'Node.js'</span>],
                </div>
                <div className="code-line">
                  &nbsp;&nbsp;<span className="property">goal</span>: <span className="string">'Dream Job'</span>
                </div>
                <div className="code-line">{'}'}</div>
                <div className="code-line">
                  <span className="comment">// Success awaits! 🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Practice Projects</h3>
              <p>Build real-world projects with step-by-step guidance and modern technologies.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3>Resume Builder</h3>
              <p>Create professional, ATS-friendly resumes that get you noticed by employers.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Job Opportunities</h3>
              <p>Discover curated job listings from top companies in the tech industry.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;