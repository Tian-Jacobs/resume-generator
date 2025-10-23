import { useState, useEffect } from 'react';

const STORAGE_KEY = 'resumeGeneratorData';

// Load data from localStorage
const loadFromStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return null;
};

// Save data to localStorage
const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

export const useResumeData = () => {
  const initialData = {
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
    achievements: [''],
    accomplishments: [''],
    references: [{
      name: '',
      title: '',
      company: '',
      email: '',
      phone: ''
    }]
  };

  const [formData, setFormData] = useState(() => {
    const savedData = loadFromStorage();
    return savedData || initialData;
  });

  // Save to localStorage whenever formData changes
  useEffect(() => {
    saveToStorage(formData);
  }, [formData]);

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