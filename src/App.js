import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedJobRole, setSelectedJobRole] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      profilePicture: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const [coverLetterData, setCoverLetterData] = useState({
    companyName: '',
    position: '',
    hiringManager: '',
    content: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const jobRoles = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    datascience: 'Data Scientist',
    fullstack: 'Full Stack Developer',
    mobile: 'Mobile App Developer',
    uiux: 'UI/UX Designer',
    devops: 'DevOps Engineer',
    cybersecurity: 'Cybersecurity Analyst'
  };

  const jobProjects = {
    frontend: [
      { name: 'Responsive Portfolio Website', link: 'https://youtu.be/sQoiM7i5Nqc?si=Wk21F0OqfcmQy4j7', icon: 'fab fa-youtube', difficulty: 'Beginner', duration: '4-6 hours' },
      { name: 'React Movie App', link: 'https://youtu.be/jc9_Bqzy2YQ?si=W-5KQoCFxrLM42L4', icon: 'fab fa-react', difficulty: 'Intermediate', duration: '8-10 hours' },
      { name: 'Vue.js E-commerce Site', link: 'https://youtu.be/gkRb4YKFD1A?si=L6Vy6KxEY1_5MDKP', icon: 'fab fa-vuejs', difficulty: 'Advanced', duration: '12-15 hours' },
      { name: 'Frontend Roadmap', link: 'https://roadmap.sh/frontend', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ],
    backend: [
      { name: 'Flask REST API with Dave', link: 'https://youtu.be/z3YMz-Gocmw?si=8roHkCbXfQPwQ6Zv', icon: 'fab fa-python', difficulty: 'Intermediate', duration: '6-8 hours' },
      { name: 'Django Blog App', link: 'https://youtu.be/jBzwzrDvZ18?si=kz6xb2haEdul1N8A', icon: 'fas fa-blog', difficulty: 'Intermediate', duration: '10-12 hours' },
      { name: 'Node.js Microservices', link: 'https://youtu.be/7IFJb-uLEaI?si=s9DFEf_tbGp1Oiql', icon: 'fab fa-node-js', difficulty: 'Advanced', duration: '15-20 hours' },
      { name: 'Backend Roadmap', link: 'https://roadmap.sh/backend', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ],
    datascience: [
      { name: 'Titanic Survival Predictor', link: 'https://youtu.be/I3FBJdiExcg?si=Aw8cv95RDu7vWwzW', icon: 'fas fa-ship', difficulty: 'Beginner', duration: '4-6 hours' },
      { name: 'Netflix Data Analysis', link: 'https://youtu.be/tjIWRqqMDaw?si=2-5Y13XIuBm4ql8t', icon: 'fas fa-chart-bar', difficulty: 'Intermediate', duration: '8-10 hours' },
      { name: 'ML Stock Price Predictor', link: 'https://youtu.be/1O_BenficgE?si=NuW6kq8jzN15-abp', icon: 'fas fa-chart-line', difficulty: 'Advanced', duration: '12-15 hours' },
      { name: 'Data Science Roadmap', link: 'https://roadmap.sh/ai-data-scientist', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ],
    fullstack: [
      { name: 'MERN Stack Blog App', link: 'https://youtu.be/WsoT4sHX7oU?si=c4xDPpImR4h1pKoH', icon: 'fas fa-layer-group', difficulty: 'Intermediate', duration: '12-15 hours' },
      { name: 'Fullstack Ecommerce Site', link: 'https://youtu.be/y99YgaQjgx4?si=KEUtObYIzARRMGFM', icon: 'fas fa-shopping-cart', difficulty: 'Advanced', duration: '20-25 hours' },
      { name: 'Social Media Platform', link: 'https://youtu.be/7oKFzriZt0A?si=7ZnLZJA827L2fKxL', icon: 'fas fa-users', difficulty: 'Advanced', duration: '25-30 hours' },
      { name: 'Fullstack Roadmap', link: 'https://roadmap.sh/full-stack', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ],
    mobile: [
      { name: 'React Native Todo App', link: 'https://youtu.be/CfSK9niSAxY?si=X19lZjMdQTAA_FtQ', icon: 'fab fa-react', difficulty: 'Beginner', duration: '6-8 hours' },
      { name: 'Flutter Weather App', link: 'https://youtu.be/yLtpMqvMgdY?si=R76UFbiy6oVdznz2', icon: 'fab fa-android', difficulty: 'Intermediate', duration: '8-10 hours' },
      { name: 'Cross-Platform Chat App', link: 'https://youtu.be/-w2iReTvHWo?si=84KQCSKDsfARRBX5', icon: 'fas fa-comments', difficulty: 'Advanced', duration: '15-20 hours' },
      { name: 'Mobile Dev Roadmap', link: 'https://roadmap.sh/android', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ],
    uiux: [
      { name: 'Figma Beginner Tutorial', link: 'https://youtu.be/ezldKx-jPag?si=rLdHzeZ9p851w7in', icon: 'fab fa-figma', difficulty: 'Beginner', duration: '3-4 hours' },
      { name: 'Adobe XD Design Guide', link: 'https://youtu.be/C-_pr1Hzlvg?si=TWX0hP8Nk7QlyR0h', icon: 'fab fa-adobe', difficulty: 'Intermediate', duration: '5-6 hours' },
      { name: 'Complete Design System', link: 'https://youtu.be/YLo6g58vUm0?si=7kyhzbk491Rvorgz', icon: 'fas fa-palette', difficulty: 'Advanced', duration: '10-12 hours' },
      { name: 'UX Design Roadmap', link: 'https://roadmap.sh/ux-design', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ],
    devops: [
      { name: 'CI/CD with GitHub Actions', link: 'https://youtu.be/R8_veQiYBjI?si=6GlKWzXEUZ0yOtnk', icon: 'fab fa-github', difficulty: 'Intermediate', duration: '6-8 hours' },
      { name: 'Docker & Kubernetes', link: 'https://youtu.be/2vMEQ5zs1ko?si=r_O1Kux7PqfbtfId', icon: 'fab fa-docker', difficulty: 'Advanced', duration: '12-15 hours' },
      { name: 'AWS Cloud Infrastructure', link: 'https://youtu.be/iULyXSYs0PI?si=DoYjEvCogOD68uke', icon: 'fab fa-aws', difficulty: 'Advanced', duration: '15-20 hours' },
      { name: 'DevOps Roadmap', link: 'https://roadmap.sh/devops', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ],
    cybersecurity: [
      { name: 'Intro to Cybersecurity', link: 'https://youtu.be/z5nc9MDbvkw?si=5yhrcePdYUs1Rcl1', icon: 'fas fa-shield-alt', difficulty: 'Beginner', duration: '4-5 hours' },
      { name: 'Wireshark for Beginners', link: 'https://youtu.be/qTaOZrDnMzQ?si=Lq9aAjQ43grff60u', icon: 'fas fa-network-wired', difficulty: 'Intermediate', duration: '6-8 hours' },
      { name: 'Ethical Hacking Course', link: 'https://youtu.be/XLvPpirlmEs?si=kZkkvRslOOo0B1XK', icon: 'fas fa-user-secret', difficulty: 'Advanced', duration: '20-25 hours' },
      { name: 'Cybersecurity Roadmap', link: 'https://roadmap.sh/cyber-security', icon: 'fas fa-route', difficulty: 'Guide', duration: 'Self-paced' }
    ]
  };

  const certifications = [
    { name: 'FreeCodeCamp Certifications', link: 'https://www.freecodecamp.org/learn', icon: 'fab fa-free-code-camp', description: 'Free coding certifications in web development, data science, and more' },
    { name: 'Coursera Professional Certificates', link: 'https://www.coursera.org/professional-certificates', icon: 'fas fa-graduation-cap', description: 'Industry-recognized certificates from top companies' },
    { name: 'Udemy Certificates', link: 'https://www.udemy.com', icon: 'fas fa-chalkboard-teacher', description: 'Practical skills courses with completion certificates' },
    { name: 'AWS Certifications', link: 'https://aws.amazon.com/certification/', icon: 'fab fa-aws', description: 'Cloud computing certifications for DevOps and Backend roles' },
    { name: 'Google Cloud Certifications', link: 'https://cloud.google.com/certification', icon: 'fab fa-google', description: 'Professional cloud architect and developer certifications' },
    { name: 'Microsoft Azure Certifications', link: 'https://docs.microsoft.com/en-us/learn/certifications/', icon: 'fab fa-microsoft', description: 'Azure cloud services and development certifications' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple mock authentication
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirm = formData.get('confirm');
    
    if (email && password && password === confirm) {
      setUser({ email, name: email.split('@')[0] });
      setIsLoggedIn(true);
      setShowSignup(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const updateResumeData = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (index !== null && Array.isArray(newData[section])) {
        newData[section][index] = { ...newData[section][index], [field]: value };
      } else if (section === 'personalInfo') {
        newData.personalInfo[field] = value;
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  const addArrayItem = (section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: Date.now() }]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const generateCoverLetter = () => {
    const template = `Dear ${coverLetterData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${coverLetterData.position} position at ${coverLetterData.companyName}. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

${coverLetterData.content || 'In my previous roles, I have developed expertise in modern web technologies and have successfully delivered projects that improved user experience and business outcomes. I am particularly drawn to this role because it aligns perfectly with my career goals and technical interests.'}

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to ${coverLetterData.companyName}'s continued success. Thank you for considering my application.

Sincerely,
${resumeData.personalInfo.fullName || 'Your Name'}`;

    return template;
  };

  const downloadResumePDF = async () => {
    const element = document.querySelector('.resume-document');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a1a'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
        
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const downloadCoverLetterPDF = async () => {
    const element = document.querySelector('.cover-letter-document');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a1a'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const fileName = `${coverLetterData.companyName || 'Company'}_Cover_Letter.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateResumeData('personalInfo', 'profilePicture', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

 const [showChatbot, setShowChatbot] = useState(false);
const [chatMessages, setChatMessages] = useState([
  { type: 'bot', message: 'Hi! I\'m your career assistant. How can I help you today?' }
]);
  const [chatInput, setChatInput] = useState('');

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { type: 'user', message: chatInput };
    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(chatInput);
      setChatMessages(prev => [...prev, { type: 'bot', message: botResponse }]);
    }, 1000);

    setChatInput('');
  };

  const generateBotResponse = (input) => {
    const responses = {
      resume: "📝 Great choice! I can help you create a professional resume that stands out! Navigate to the Resume Builder section and let's highlight your amazing skills and achievements. ✨",
      cover: "💌 Perfect! Let's craft a personalized cover letter that shows why you're the ideal candidate. Head to the Cover Letter section and I'll guide you through it! 🚀",
      job: "🔍 Exciting! Check out our Job Roles section to explore different career paths. I'll help you understand what skills and requirements each role needs! 💪",
      skills: "🎯 Smart thinking! Focus on both technical and soft skills. For developers, showcase your programming languages, frameworks, and tools. Don't forget leadership and communication skills too! 🌟",
      hello: "👋 Hello! It's wonderful to meet you! I'm so excited to help you on your career journey today! How can I assist you in reaching your professional goals? 😊✨",
      hi: "👋 Hi there! Welcome! I'm thrilled you're here! Let's work together to build something amazing for your career. What would you like to focus on? 🌟",
      hey: "👋 Hey! Great to see you! I'm your friendly career companion, ready to help you succeed! What exciting project should we tackle together? 🚀",
      good: "🌟 Good to see you too! I'm here and ready to help make your career dreams come true! What would you like to work on today? �✨",
      thanks: "🙏 You're so welcome! I'm always here to help you shine in your career journey! Keep being awesome! ⭐",
      help: "🤝 I'm here to assist you with: \n📝 Resume building \n💌 Cover letter writing \n🔍 Job search tips \n🎯 Skill development \n💼 Career advice \n\nWhat interests you most? 😊",
      default: "😊 I'm here to help with your career development! Ask me about resumes, cover letters, job searching, or skill development. Let's make your career dreams come true! ✨"
    };

    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('resume')) return responses.resume;
    if (lowerInput.includes('cover')) return responses.cover;
    if (lowerInput.includes('job')) return responses.job;
    if (lowerInput.includes('skill')) return responses.skills;
    if (lowerInput.includes('hello')) return responses.hello;
    if (lowerInput.includes('hi')) return responses.hi;
    if (lowerInput.includes('hey')) return responses.hey;
    if (lowerInput.includes('good morning') || lowerInput.includes('good afternoon') || lowerInput.includes('good evening')) return responses.good;
    if (lowerInput.includes('thank')) return responses.thanks;
    if (lowerInput.includes('help')) return responses.help;
    return responses.default;
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <div className="brand-icon">
              <i className="fas fa-code"></i>
            </div>
            <span className="brand-text">ElevateCareer</span>
          </div>
          
          <ul className="nav-menu">
            <li><button onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}><i className="fas fa-home"></i> <span>Home</span></button></li>
            <li><button onClick={() => scrollToSection('job-roles')} className={activeSection === 'job-roles' ? 'active' : ''}><i className="fas fa-briefcase"></i> <span>Job Roles</span></button></li>
            <li><button onClick={() => scrollToSection('resume')} className={activeSection === 'resume' ? 'active' : ''}><i className="fas fa-file-alt"></i> <span>Resume</span></button></li>
            <li><button onClick={() => scrollToSection('cover-letter')} className={activeSection === 'cover-letter' ? 'active' : ''}><i className="fas fa-envelope"></i> <span>Cover Letter</span></button></li>
            <li><button onClick={() => scrollToSection('certifications')} className={activeSection === 'certifications' ? 'active' : ''}><i className="fas fa-certificate"></i> <span>Certifications</span></button></li>
            <li><button onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}><i className="fas fa-phone"></i> <span>Contact</span></button></li>
          </ul>

          <div className="nav-auth">
            {isLoggedIn ? (
              <div className="user-menu">
                <span className="user-greeting">Hello, {user.name}!</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button onClick={() => setShowLogin(true)} className="btn btn-outline btn-sm">
                  <i className="fas fa-sign-in-alt"></i> Login
                </button>
                <button onClick={() => setShowSignup(true)} className="btn btn-primary btn-sm">
                  <i className="fas fa-user-plus"></i> Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="code-rain"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Build Your <span className="gradient-text">Career Path</span>
              </h1>
              <p className="hero-subtitle">
                Choose your job role, explore curated projects & certifications, and generate your Resume or Cover Letter.
              </p>
              <div className="hero-buttons">
                <button onClick={() => scrollToSection('job-roles')} className="btn btn-primary">
                  <i className="fas fa-rocket"></i>
                  Get Started
                </button>
                <button onClick={() => scrollToSection('resume')} className="btn btn-outline">
                  <i className="fas fa-file-alt"></i>
                  Create Resume
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Job Roles Section */}
      <section id="job-roles" className="job-roles-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Select Your Job Role</h2>
            <p className="section-subtitle">Choose your career path and discover curated projects and learning resources</p>
          </div>
          
          <div className="job-role-selector">
            <select 
              className="form-select"
              value={selectedJobRole}
              onChange={(e) => setSelectedJobRole(e.target.value)}
            >
              <option value="">-- Choose a Job Role --</option>
              {Object.entries(jobRoles).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          {selectedJobRole && jobProjects[selectedJobRole] && (
            <div className="recommended-projects">
              <h3 className="projects-title">
                <i className="fas fa-lightbulb"></i>
                Recommended Projects & Learning for {jobRoles[selectedJobRole]}
              </h3>
              <div className="projects-grid">
                {jobProjects[selectedJobRole].map((project, index) => (
                  <div key={index} className="project-card">
                    <div className="project-header">
                      <div className="project-icon">
                        <i className={project.icon}></i>
                      </div>
                      <span className={`difficulty-badge difficulty-${project.difficulty.toLowerCase()}`}>
                        {project.difficulty}
                      </span>
                    </div>
                    
                    <h4 className="project-title">{project.name}</h4>
                    
                    <div className="project-meta">
                      <div className="duration">
                        <i className="fas fa-clock"></i>
                        <span>{project.duration}</span>
                      </div>
                    </div>
                    
                    <div className="project-actions">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <i className="fas fa-external-link-alt"></i>
                        Start Learning
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resume Builder Section */}
      <section id="resume" className="resume-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><i className="fas fa-file-alt"></i> Professional Resume Builder</h2>
            <p className="section-subtitle">Create a stunning resume that gets you hired</p>
            
            <div className="external-tools">
              <a href="https://www.kickresume.com/en/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <i className="fas fa-external-link-alt"></i>
                KickResume
              </a>
              <a href="https://www.canva.com/resumes/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <i className="fas fa-paint-brush"></i>
                Canva Resume
              </a>
            </div>
          </div>
          
          <div className="resume-builder">
            <div className="resume-form">
              <div className="form-section">
                <h3><i className="fas fa-user"></i> Personal Information</h3>
                
                <div className="profile-picture-upload">
                  <label htmlFor="profilePicture" className="profile-picture-label">
                    {resumeData.personalInfo.profilePicture ? (
                      <img 
                        src={resumeData.personalInfo.profilePicture} 
                        alt="Profile" 
                        className="profile-picture-preview"
                      />
                    ) : (
                      <div className="profile-picture-placeholder">
                        <i className="fas fa-camera"></i>
                        <span>Add Photo</span>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="profile-picture-input"
                  />
                </div>
                
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updateResumeData('personalInfo', 'fullName', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updateResumeData('personalInfo', 'email', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updateResumeData('personalInfo', 'phone', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updateResumeData('personalInfo', 'location', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn Profile"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updateResumeData('personalInfo', 'linkedin', e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="url"
                    placeholder="GitHub Profile"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => updateResumeData('personalInfo', 'github', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3><i className="fas fa-align-left"></i> Professional Summary</h3>
                <textarea
                  placeholder="Write a compelling summary of your professional background..."
                  value={resumeData.summary}
                  onChange={(e) => updateResumeData('summary', null, e.target.value)}
                  className="form-textarea"
                  rows="4"
                />
              </div>

              <div className="form-section">
                <h3><i className="fas fa-briefcase"></i> Work Experience</h3>
                <button 
                  onClick={() => addArrayItem('experience', { title: '', company: '', duration: '', description: '' })}
                  className="btn btn-outline btn-sm"
                >
                  <i className="fas fa-plus"></i> Add Experience
                </button>
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="experience-item">
                    <div className="form-grid">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => updateResumeData('experience', 'title', e.target.value, index)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateResumeData('experience', 'company', e.target.value, index)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 2020-2023)"
                        value={exp.duration}
                        onChange={(e) => updateResumeData('experience', 'duration', e.target.value, index)}
                        className="form-input"
                      />
                    </div>
                    <textarea
                      placeholder="Job description and achievements..."
                      value={exp.description}
                      onChange={(e) => updateResumeData('experience', 'description', e.target.value, index)}
                      className="form-textarea"
                      rows="3"
                    />
                    <button 
                      onClick={() => removeArrayItem('experience', index)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-section">
                <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                <button 
                  onClick={() => addArrayItem('education', { degree: '', school: '', year: '', gpa: '' })}
                  className="btn btn-outline btn-sm"
                >
                  <i className="fas fa-plus"></i> Add Education
                </button>
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="education-item">
                    <div className="form-grid">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateResumeData('education', 'degree', e.target.value, index)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => updateResumeData('education', 'school', e.target.value, index)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateResumeData('education', 'year', e.target.value, index)}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="GPA (optional)"
                        value={edu.gpa}
                        onChange={(e) => updateResumeData('education', 'gpa', e.target.value, index)}
                        className="form-input"
                      />
                    </div>
                    <button 
                      onClick={() => removeArrayItem('education', index)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-section">
                <h3><i className="fas fa-cogs"></i> Skills</h3>
                <input
                  type="text"
                  placeholder="Add skills separated by commas (e.g., React, Node.js, Python)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                      setResumeData(prev => ({
                        ...prev,
                        skills: [...prev.skills, ...skills]
                      }));
                      e.target.value = '';
                    }
                  }}
                  className="form-input"
                />
                <div className="skills-list">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      <button 
                        onClick={() => removeArrayItem('skills', index)}
                        className="skill-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="resume-preview">
              <div className="preview-header">
                <h3>Live Preview</h3>
                <button className="btn btn-primary" onClick={downloadResumePDF}>
                  <i className="fas fa-download"></i> Download PDF
                </button>
              </div>
              
              <div className="resume-document">
                <div className="resume-header">
                  <div className="resume-header-content">
                    <div className="resume-text">
                      <h1>{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                      <div className="contact-info">
                        <div className="contact-info-row">
                          {resumeData.personalInfo.email && <span><i className="fas fa-envelope"></i> {resumeData.personalInfo.email}</span>}
                          {resumeData.personalInfo.phone && <span><i className="fas fa-phone"></i> {resumeData.personalInfo.phone}</span>}
                        </div>
                        <div className="contact-info-row">
                          {resumeData.personalInfo.location && <span><i className="fas fa-map-marker-alt"></i> {resumeData.personalInfo.location}</span>}
                          {resumeData.personalInfo.linkedin && <span><i className="fab fa-linkedin"></i> LinkedIn</span>}
                        </div>
                        {resumeData.personalInfo.github && (
                          <div className="contact-info-row">
                            <span><i className="fab fa-github"></i> GitHub</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {resumeData.personalInfo.profilePicture && (
                      <div className="resume-profile-picture">
                        <img 
                          src={resumeData.personalInfo.profilePicture} 
                          alt="Profile" 
                          className="resume-profile-img"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {resumeData.summary && (
                  <div className="resume-section">
                    <h3>Professional Summary</h3>
                    <p>{resumeData.summary}</p>
                  </div>
                )}

                {resumeData.experience.length > 0 && (
                  <div className="resume-section">
                    <h3>Work Experience</h3>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="experience-entry">
                        <div className="entry-header">
                          <h4>{exp.title} - {exp.company}</h4>
                          <span className="duration">{exp.duration}</span>
                        </div>
                        <p>{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {resumeData.education.length > 0 && (
                  <div className="resume-section">
                    <h3>Education</h3>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="education-entry">
                        <div className="entry-header">
                          <h4>{edu.degree} - {edu.school}</h4>
                          <span className="duration">{edu.year}</span>
                        </div>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {resumeData.skills.length > 0 && (
                  <div className="resume-section">
                    <h3>Skills</h3>
                    <div className="skills-grid">
                      {resumeData.skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                          <div className={`skill-icon ${skill.toLowerCase().replace(/[^a-z0-9]/g, '')}`}></div>
                          <span className="skill-name">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Letter Section */}
      <section id="cover-letter" className="cover-letter-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><i className="fas fa-envelope-open-text"></i> Cover Letter Generator</h2>
            <p className="section-subtitle">Create personalized cover letters for your job applications</p>
            
            <div className="external-tools">
              <a href="https://www.kickresume.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <i className="fas fa-envelope-open-text"></i>
                KickResume Cover Letter
              </a>
            </div>
          </div>
          
          <div className="cover-letter-builder">
            <div className="cover-letter-form">
              <div className="form-section">
                <h3><i className="fas fa-building"></i> Job Details</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={coverLetterData.companyName}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Position Title"
                    value={coverLetterData.position}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, position: e.target.value }))}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Hiring Manager Name (optional)"
                    value={coverLetterData.hiringManager}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, hiringManager: e.target.value }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3><i className="fas fa-edit"></i> Personal Message</h3>
                <textarea
                  placeholder="Write about your relevant experience, achievements, and why you're interested in this role..."
                  value={coverLetterData.content}
                  onChange={(e) => setCoverLetterData(prev => ({ ...prev, content: e.target.value }))}
                  className="form-textarea"
                  rows="6"
                />
              </div>
            </div>

            <div className="cover-letter-preview">
              <div className="preview-header">
                <h3>Cover Letter Preview</h3>
                <button className="btn btn-primary" onClick={downloadCoverLetterPDF}>
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
              
              <div className="cover-letter-document">
                <pre className="cover-letter-text">{generateCoverLetter()}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"><i className="fas fa-certificate"></i> Professional Certifications</h2>
            <p className="section-subtitle">Boost your career with industry-recognized certifications</p>
          </div>
          
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-icon">
                  <i className={cert.icon}></i>
                </div>
                <h4 className="cert-title">{cert.name}</h4>
                <p className="cert-description">{cert.description}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <i className="fas fa-external-link-alt"></i>
                  Explore Certifications
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">Have questions? We'd love to hear from you!</p>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="form-input"
                />
              </div>
              <textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                className="form-textarea"
                rows="5"
                required
              />
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Login</h3>
              <button onClick={() => setShowLogin(false)} className="modal-close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-section">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                  required
                />
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </button>
              </div>
            </form>
            <p className="text-center">
              Don't have an account? 
              <button 
                onClick={() => { setShowLogin(false); setShowSignup(true); }}
                className="link-button"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create Your Account</h3>
              <button onClick={() => setShowSignup(false)} className="modal-close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSignup}>
              <div className="form-section">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  name="confirm"
                  placeholder="Confirm Password"
                  className="form-input"
                  required
                />
                <button type="submit" className="btn btn-primary w-100">
                  <i className="fas fa-user-plus"></i>
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center">
              Already have an account? 
              <button 
                onClick={() => { setShowSignup(false); setShowLogin(true); }}
                className="link-button"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-icon">
                <i className="fas fa-code"></i>
              </div>
              <span className="brand-text">Elevate Career</span>
            </div>
            <p className="footer-text">
              © 2025 Elevate Career | Designed with ❤️ for aspiring professionals.
            </p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <div className={`chatbot-container ${showChatbot ? 'active' : ''}`}>
        <button 
          className="chatbot-toggle"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          <i className="fas fa-smile"></i>
        </button>
        
        {showChatbot && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <h4><i className="fas fa-robot"></i> Career Assistant</h4>
              <button onClick={() => setShowChatbot(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="chatbot-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content">{msg.message}</div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleChatSubmit} className="chatbot-input">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything about your career..."
                className="chat-input"
              />
              <button type="submit" className="chat-send">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
