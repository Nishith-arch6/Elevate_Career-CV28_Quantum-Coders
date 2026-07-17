import { useState } from 'react';

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '', email: '', phone: '', location: '',
      linkedin: '', github: '', portfolio: '', summary: ''
    },
    experience: [{ id: 1, jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }],
    // ... rest of initial state
  });

  const updateResumeField = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = value;
      } else if (section === 'skills') {
        newData[section][field] = value.split(',').map(skill => skill.trim()).filter(skill => skill);
      } else {
        newData[section][field] = value;
      }
      return newData;
    });
  };

  return { resumeData, updateResumeField };
};