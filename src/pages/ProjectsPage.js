import React from 'react';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: 'Todo App with React',
      description: 'Build a full-featured todo application with React hooks and local storage',
      difficulty: 'Beginner',
      duration: '2-3 hours',
      technologies: ['React', 'JavaScript', 'CSS'],
      icon: 'fas fa-tasks'
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Create a responsive weather app using APIs and modern CSS',
      difficulty: 'Intermediate',
      duration: '4-5 hours',
      technologies: ['JavaScript', 'API', 'CSS', 'HTML'],
      icon: 'fas fa-cloud-sun'
    },
    {
      id: 3,
      title: 'E-commerce Store',
      description: 'Build a complete online store with cart functionality and payment integration',
      difficulty: 'Advanced',
      duration: '8-10 hours',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      icon: 'fas fa-shopping-cart'
    },
    {
      id: 4,
      title: 'Social Media Dashboard',
      description: 'Create a dashboard to manage multiple social media accounts',
      difficulty: 'Intermediate',
      duration: '6-7 hours',
      technologies: ['React', 'Chart.js', 'API', 'CSS'],
      icon: 'fas fa-chart-line'
    }
  ];

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  return (
    <div className="projects-page">
      <div className="container">
        <div className="page-header">
          <h1>Practice Projects</h1>
          <p>Build real-world projects to enhance your skills and portfolio</p>
        </div>

        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-icon">
                  <i className={project.icon}></i>
                </div>
                <span className={`difficulty-badge ${getDifficultyClass(project.difficulty)}`}>
                  {project.difficulty}
                </span>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-meta">
                <div className="duration">
                  <i className="fas fa-clock"></i>
                  <span>{project.duration}</span>
                </div>
              </div>
              
              <div className="technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <button className="btn btn-primary project-btn">
                Start Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;