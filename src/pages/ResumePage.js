import React, { useState } from 'react';

const ResumePage = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: []
  });

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateSummary = (value) => {
    setResumeData(prev => ({
      ...prev,
      summary: value
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        title: '',
        company: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const addSkill = () => {
    const skill = prompt('Enter a skill:');
    if (skill) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  return (
    <div className="resume-page">
      <div className="container">
        <div className="page-header">
          <h1>Resume Builder</h1>
          <p>Create a professional resume that gets you noticed</p>
        </div>

        <div className="resume-builder">
          <div className="resume-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="form-input"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="form-input"
                />
                <input
                  type="url"
                  placeholder="LinkedIn Profile"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="form-input"
                />
                <input
                  type="url"
                  placeholder="GitHub Profile"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Professional Summary</h3>
              <textarea
                placeholder="Write a brief summary of your professional background and career objectives..."
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h3>Work Experience</h3>
                <button onClick={addExperience} className="btn btn-outline btn-sm">
                  <i className="fas fa-plus"></i> Add Experience
                </button>
              </div>
              {resumeData.experience.length === 0 && (
                <p className="empty-state">No work experience added yet. Click "Add Experience" to get started.</p>
              )}
            </div>

            <div className="form-section">
              <div className="section-header">
                <h3>Skills</h3>
                <button onClick={addSkill} className="btn btn-outline btn-sm">
                  <i className="fas fa-plus"></i> Add Skill
                </button>
              </div>
              <div className="skills-list">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                    <button 
                      onClick={() => {
                        setResumeData(prev => ({
                          ...prev,
                          skills: prev.skills.filter((_, i) => i !== index)
                        }));
                      }}
                      className="skill-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {resumeData.skills.length === 0 && (
                <p className="empty-state">No skills added yet. Click "Add Skill" to get started.</p>
              )}
            </div>
          </div>

          <div className="resume-preview">
            <div className="preview-header">
              <h3>Preview</h3>
              <button className="btn btn-primary">
                <i className="fas fa-download"></i> Download PDF
              </button>
            </div>
            
            <div className="resume-document">
              <div className="resume-header">
                <h1>{resumeData.personalInfo.name || 'Your Name'}</h1>
                <div className="contact-info">
                  {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                  {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
                  {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                </div>
              </div>

              {resumeData.summary && (
                <div className="resume-section">
                  <h3>Professional Summary</h3>
                  <p>{resumeData.summary}</p>
                </div>
              )}

              {resumeData.skills.length > 0 && (
                <div className="resume-section">
                  <h3>Skills</h3>
                  <div className="skills-preview">
                    {resumeData.skills.join(' • ')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;