import { useState } from 'react';

export const useResumeData = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: ''
    },
    summary: '',
    experience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    education: [{
      institution: '',
      degree: '',
      field: '',
      graduationDate: ''
    }],
    skills: [''],
    achievements: ['']
  });

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (section === 'personalInfo') {
        newData.personalInfo = { ...prev.personalInfo, [field]: value };
      } else if (section === 'summary') {
        newData.summary = value;
      } else if (Array.isArray(prev[section])) {
        if (index !== null) {
          if (typeof prev[section][index] === 'object') {
            newData[section] = [...prev[section]];
            newData[section][index] = { ...prev[section][index], [field]: value };
          } else {
            newData[section] = [...prev[section]];
            newData[section][index] = value;
          }
        }
      }
      
      return newData;
    });
  };

  const addArrayItem = (section, template = {}) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    addArrayItem,
    removeArrayItem
  };
};