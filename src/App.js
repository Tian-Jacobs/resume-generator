import { useState } from 'react';
import { Download, User, Briefcase, GraduationCap, Award, Plus, Trash2 } from 'lucide-react';

const ResumeGenerator = () => {
  const [currentTemplate, setCurrentTemplate] = useState('modern');
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

  const templates = {
    modern: 'Modern',
    classic: 'Classic',
    minimal: 'Minimal',
    creative: 'Creative'
  };

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (section === 'personalInfo') {
        newData.personalInfo = { ...prev.personalInfo, [field]: value };
      } else if (section === 'summary') {
        newData.summary = value;
      } else if (Array.isArray(prev[section])) {
        if (index !== null) {
          // Updating an object in an array (experience, education)
          if (typeof prev[section][index] === 'object') {
            newData[section] = [...prev[section]];
            newData[section][index] = { ...prev[section][index], [field]: value };
          } else {
            // Updating a string in an array (skills)
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

  const exportToPDF = () => {
    try {
      // Check if html2pdf is available
      if (typeof window.html2pdf === 'undefined') {
        // Load html2pdf script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
          setTimeout(() => exportToPDF(), 100);
        };
        script.onerror = () => {
          alert('Failed to load PDF library. Please check your internet connection and try again.');
        };
        document.head.appendChild(script);
        return;
      }

      const element = document.getElementById('resume-template');
      if (!element) {
        alert('Resume template not found. Please try again.');
        return;
      }

      const opt = {
        margin: 0,
        filename: `${formData.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
          width: 816,
          height: 1056
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };

      window.html2pdf().set(opt).from(element).save().catch((error) => {
        console.error('PDF generation failed:', error);
        alert('PDF generation failed. Please try again.');
      });

    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    }
  };

  const ModernTemplate = () => (
    <div className="bg-white p-6 shadow-lg" style={{ width: '8.5in', minHeight: '11in' }}>
      <div className="border-l-4 border-blue-600 pl-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.personalInfo.fullName}</h1>
        <div className="text-gray-600 space-y-1 text-sm">
          <p>{formData.personalInfo.email} | {formData.personalInfo.phone}</p>
          <p>{formData.personalInfo.location}</p>
          {formData.personalInfo.linkedin && <p>{formData.personalInfo.linkedin}</p>}
        </div>
      </div>

      {formData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{formData.summary}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">EXPERIENCE</h2>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-gray-800 text-sm">{exp.position}</h3>
              <span className="text-gray-600 text-xs">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-blue-600 font-medium mb-1 text-sm">{exp.company}</p>
            <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">EDUCATION</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">{edu.degree} in {edu.field}</h3>
            <p className="text-blue-600 text-sm">{edu.institution}</p>
            <p className="text-gray-600 text-xs">{edu.graduationDate}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const ClassicTemplate = () => (
    <div className="bg-white p-6 shadow-lg" style={{ width: '8.5in', minHeight: '11in' }}>
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-2xl font-serif font-bold mb-2">{formData.personalInfo.fullName}</h1>
        <div className="text-gray-600 text-sm">
          <p>{formData.personalInfo.email} • {formData.personalInfo.phone}</p>
          <p>{formData.personalInfo.location}</p>
        </div>
      </div>

      {formData.summary && (
        <div className="mb-5">
          <h2 className="text-base font-serif font-bold mb-2 text-center">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 text-center italic text-sm">{formData.summary}</p>
        </div>
      )}

      <div className="mb-5">
        <h2 className="text-base font-serif font-bold mb-3 text-center">PROFESSIONAL EXPERIENCE</h2>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="text-center mb-2">
              <h3 className="font-bold text-sm">{exp.position}</h3>
              <p className="italic text-sm">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="text-gray-700 text-xs text-center leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <h2 className="text-base font-serif font-bold mb-3 text-center">EDUCATION</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="text-center mb-2">
            <p className="font-semibold text-sm">{edu.degree} in {edu.field}</p>
            <p className="italic text-sm">{edu.institution}, {edu.graduationDate}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-base font-serif font-bold mb-3 text-center">SKILLS</h2>
        <p className="text-center text-gray-700 text-sm">
          {formData.skills.filter(skill => skill.trim()).join(' • ')}
        </p>
      </div>
    </div>
  );

  const MinimalTemplate = () => (
    <div className="bg-white p-6 shadow-lg" style={{ width: '8.5in', minHeight: '11in' }}>
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-800 mb-3">{formData.personalInfo.fullName}</h1>
        <div className="text-gray-500 text-xs space-y-1">
          <p>{formData.personalInfo.email}</p>
          <p>{formData.personalInfo.phone}</p>
          <p>{formData.personalInfo.location}</p>
        </div>
      </div>

      {formData.summary && (
        <div className="mb-6">
          <p className="text-gray-700 leading-loose text-sm">{formData.summary}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Experience</h2>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-sm font-medium text-gray-800">{exp.position}</h3>
              <span className="text-gray-400 text-xs">{exp.startDate}—{exp.endDate}</span>
            </div>
            <p className="text-gray-600 mb-1 text-sm">{exp.company}</p>
            <p className="text-gray-600 text-xs leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <h3 className="text-sm font-medium text-gray-800">{edu.degree}</h3>
            <p className="text-gray-600 text-sm">{edu.institution}, {edu.graduationDate}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Skills</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {formData.skills.filter(skill => skill.trim()).join(', ')}
        </p>
      </div>
    </div>
  );

  const CreativeTemplate = () => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50" style={{ width: '8.5in', minHeight: '11in', padding: '16px' }}>
      {/* Header Section */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-purple-600" style={{ color: '#9333ea' }}>
              {formData.personalInfo.fullName}
            </h1>
            <div className="text-gray-600 text-xs">
              <p>{formData.personalInfo.email} | {formData.personalInfo.phone}</p>
              <p>{formData.personalInfo.location}</p>
            </div>
          </div>
        </div>
        {formData.summary && (
          <p className="text-gray-700 italic text-xs mt-2 leading-relaxed">{formData.summary}</p>
        )}
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex items-center mb-3">
          <Briefcase className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
          <h2 className="text-sm font-bold text-purple-600">Experience</h2>
        </div>
        {formData.experience.map((exp, index) => (
          <div key={index} className="mb-3 last:mb-0 pl-3 border-l-2 border-purple-200">
            <h3 className="font-semibold text-gray-800 text-sm">{exp.position}</h3>
            <p className="text-purple-600 font-medium text-xs">{exp.company}</p>
            <p className="text-gray-500 text-xs mb-1">{exp.startDate} - {exp.endDate}</p>
            <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education and Skills Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Education Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <GraduationCap className="w-4 h-4 text-pink-600 mr-2 flex-shrink-0" />
            <h2 className="text-sm font-bold text-pink-600">Education</h2>
          </div>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="font-semibold text-gray-800 text-xs">{edu.degree}</h3>
              <p className="text-pink-600 text-xs">{edu.institution}</p>
              <p className="text-gray-500 text-xs">{edu.graduationDate}</p>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <Award className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
            <h2 className="text-sm font-bold text-purple-600">Skills</h2>
          </div>
          <div className="space-y-1">
            {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-md px-2 py-1">
                <span className="text-purple-800 font-medium text-xs">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'modern': return <ModernTemplate />;
      case 'classic': return <ClassicTemplate />;
      case 'minimal': return <MinimalTemplate />;
      case 'creative': return <CreativeTemplate />;
      default: return <ModernTemplate />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Resume Generator</h1>
          
          {/* Template Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Choose Template</h2>
            <div className="flex gap-4">
              {Object.entries(templates).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setCurrentTemplate(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentTemplate === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.personalInfo.location}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn Profile"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Professional Summary</h3>
                <textarea
                  placeholder="Write a brief professional summary..."
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', null, e.target.value)}
                  rows={4}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Experience */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Work Experience</h3>
                  <button
                    onClick={() => addArrayItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">Experience {index + 1}</span>
                      {formData.experience.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('experience', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                          className="p-2 border rounded-md text-sm"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                          className="p-2 border rounded-md text-sm"
                        />
                      </div>
                      <textarea
                        placeholder="Job description..."
                        value={exp.description}
                        onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                        rows={3}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <button
                    onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', graduationDate: '' })}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.education.map((edu, index) => (
                  <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">Education {index + 1}</span>
                      {formData.education.length > 1 && (
                        <button
                          onClick={() => removeArrayItem('education', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Graduation Date"
                        value={edu.graduationDate}
                        onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <button
                    onClick={() => addArrayItem('skills', '')}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => handleInputChange('skills', null, e.target.value, index)}
                      className="flex-1 p-2 border rounded-md text-sm"
                    />
                    {formData.skills.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Export Button */}
              <button
                onClick={exportToPDF}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Export to PDF
              </button>
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-4">
              <h3 className="text-lg font-semibold mb-4">Preview ({templates[currentTemplate]} Template)</h3>
              <div className="bg-gray-200 p-2 rounded-lg border-2 border-gray-300" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex justify-center">
                  <div 
                    style={{ 
                      transform: 'scale(0.7)', 
                      transformOrigin: 'top center',
                      marginBottom: '-30%',
                      width: '816px'
                    }}
                  >
                    <div id="resume-template">
                      {renderTemplate()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;