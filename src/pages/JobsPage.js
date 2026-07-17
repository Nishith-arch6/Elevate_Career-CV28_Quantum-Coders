import React, { useState } from 'react';

const JobsPage = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$70,000 - $90,000',
      type: 'Full-time',
      description: 'Build amazing user interfaces with React and modern web technologies.',
      requirements: ['React', 'JavaScript', 'CSS', 'HTML', '2+ years experience'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      salary: '$80,000 - $120,000',
      type: 'Full-time',
      description: 'Work on both frontend and backend systems using modern tech stack.',
      requirements: ['Node.js', 'React', 'MongoDB', 'Express', '3+ years experience'],
      posted: '1 week ago'
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'DataFlow Solutions',
      location: 'New York, NY',
      salary: '$75,000 - $100,000',
      type: 'Full-time',
      description: 'Design and implement scalable backend systems and APIs.',
      requirements: ['Python', 'Django', 'PostgreSQL', 'AWS', '2+ years experience'],
      posted: '3 days ago'
    },
    {
      id: 4,
      title: 'React Developer',
      company: 'WebTech Solutions',
      location: 'Remote',
      salary: '$65,000 - $85,000',
      type: 'Contract',
      description: 'Join our team to build cutting-edge web applications.',
      requirements: ['React', 'TypeScript', 'Redux', 'Jest', '1+ years experience'],
      posted: '5 days ago'
    }
  ]);

  return (
    <div className="jobs-page">
      <div className="container">
        <div className="page-header">
          <h1>Job Opportunities</h1>
          <p>Discover your next career opportunity in tech</p>
        </div>

        <div className="jobs-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-title-section">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-company">{job.company}</div>
                </div>
                <div className="job-type-badge">{job.type}</div>
              </div>
              
              <div className="job-meta">
                <div className="job-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{job.location}</span>
                </div>
                <div className="job-salary">
                  <i className="fas fa-dollar-sign"></i>
                  <span>{job.salary}</span>
                </div>
                <div className="job-posted">
                  <i className="fas fa-calendar"></i>
                  <span>{job.posted}</span>
                </div>
              </div>
              
              <p className="job-description">{job.description}</p>
              
              <div className="job-requirements">
                <h4>Requirements:</h4>
                <div className="requirements-list">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="requirement-tag">{req}</span>
                  ))}
                </div>
              </div>
              
              <div className="job-actions">
                <button className="btn btn-primary">Apply Now</button>
                <button className="btn btn-outline">Save Job</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;