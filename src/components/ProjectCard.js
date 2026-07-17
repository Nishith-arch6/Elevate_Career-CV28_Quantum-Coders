import React, { memo } from 'react';

const ProjectCard = memo(({ project }) => (
  <div className="project-card">
    <div className="project-header">
      <div className={`project-icon ${project.color}`}>
        <i className={project.icon}></i>
      </div>
      <div className="project-meta">
        <div className={`project-difficulty ${project.color}`}>
          {project.difficulty}
        </div>
        <div className="project-duration">{project.duration}</div>
      </div>
    </div>
    <h3 className="project-title">{project.title}</h3>
    <p className="project-description">{project.description}</p>
    <div className="project-skills">
      {project.skills.map((skill, index) => (
        <span key={index} className="skill-tag">{skill}</span>
      ))}
    </div>
  </div>
));

export default ProjectCard;