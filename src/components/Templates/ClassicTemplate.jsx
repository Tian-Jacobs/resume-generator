// components/Templates/ClassicTemplate.jsx
import React from 'react';

export const ClassicTemplate = ({ formData }) => (
  <div className="bg-white p-6 shadow-lg" style={{ width: '8.5in', minHeight: '11in' }}>
    {/* Header Section */}
    <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
      <h1 className="text-2xl font-serif font-bold mb-2">{formData.personalInfo.fullName}</h1>
      <div className="text-gray-600 text-sm">
        <p>{formData.personalInfo.email} • {formData.personalInfo.phone}</p>
        <p>{formData.personalInfo.location}</p>
        {formData.personalInfo.linkedin && (
          <p className="mt-1">{formData.personalInfo.linkedin}</p>
        )}
      </div>
    </div>

    {/* Professional Summary */}
    {formData.summary && (
      <div className="mb-5">
        <h2 className="text-base font-serif font-bold mb-2 text-center">PROFESSIONAL SUMMARY</h2>
        <p className="text-gray-700 text-center italic text-sm leading-relaxed">{formData.summary}</p>
      </div>
    )}

    {/* Professional Experience */}
    <div className="mb-5">
      <h2 className="text-base font-serif font-bold mb-3 text-center">PROFESSIONAL EXPERIENCE</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="text-center mb-2">
            <h3 className="font-bold text-sm">{exp.position}</h3>
            <p className="italic text-sm">{exp.company} | {exp.startDate} - {exp.endDate}</p>
          </div>
          <p className="text-gray-700 text-xs text-center leading-relaxed px-4">
            {exp.description}
          </p>
        </div>
      ))}
    </div>

    {/* Education */}
    <div className="mb-5">
      <h2 className="text-base font-serif font-bold mb-3 text-center">EDUCATION</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="text-center mb-2">
          <p className="font-semibold text-sm">{edu.degree} in {edu.field}</p>
          <p className="italic text-sm">{edu.institution}, {edu.graduationDate}</p>
        </div>
      ))}
    </div>

    {/* Skills */}
    <div>
      <h2 className="text-base font-serif font-bold mb-3 text-center">SKILLS</h2>
      <p className="text-center text-gray-700 text-sm leading-relaxed">
        {formData.skills.filter(skill => skill.trim()).join(' • ')}
      </p>
    </div>
  </div>
);