// components/Templates/CreativeTemplate.jsx
import React from 'react';

export const CreativeTemplate = ({ formData }) => (
  <div className="bg-white" style={{ width: '8.5in', minHeight: 'auto' }}>
    {/* Header Section with Dark Background */}
    <div className="bg-gray-900 text-white mb-6" style={{ padding: '0.5in' }}>
      <h1 className="text-4xl font-bold mb-2">{formData.personalInfo.fullName}</h1>
      <div className="text-gray-300 text-sm space-y-1">
        <p>{formData.personalInfo.email} | {formData.personalInfo.phone}</p>
        <p>{formData.personalInfo.location}</p>
        {formData.personalInfo.linkedin && <p>{formData.personalInfo.linkedin}</p>}
      </div>
    </div>

    {/* Content wrapper with padding */}
    <div style={{ padding: '0 0.5in 0.5in 0.5in' }}>
      {/* Professional Summary */}
      {formData.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{formData.summary}</p>
        </div>
      )}

      {/* Experience Section */}
      <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">PROFESSIONAL EXPERIENCE</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
            <span className="text-gray-600 text-sm font-medium">{exp.startDate} - {exp.endDate}</span>
          </div>
          <p className="text-gray-700 font-semibold mb-2 text-sm">{exp.company}</p>
          <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
        </div>
      ))}
    </div>

    {/* Education Section */}
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">EDUCATION</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="mb-3 last:mb-0">
          <h3 className="text-base font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
          <p className="text-gray-700 font-semibold text-sm">{edu.institution}</p>
          <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
        </div>
      ))}
    </div>

    {/* Skills Section */}
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">SKILLS</h2>
      <div className="flex flex-wrap gap-2">
        {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
          <span key={index} className="bg-gray-900 text-white px-3 py-1 text-sm font-medium">
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* Accomplishments Section */}
    {formData.accomplishments && formData.accomplishments.filter(acc => acc.trim()).length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">KEY ACCOMPLISHMENTS</h2>
        <ul className="space-y-2">
          {formData.accomplishments.filter(acc => acc.trim()).map((accomplishment, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-900 font-bold mr-2">▪</span>
              <span className="text-gray-700 text-sm leading-relaxed">{accomplishment}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* References Section */}
    {formData.references && formData.references.filter(ref => ref.name.trim()).length > 0 && (
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">REFERENCES</h2>
        <div className="grid grid-cols-2 gap-4">
          {formData.references.filter(ref => ref.name.trim()).map((ref, index) => (
            <div key={index}>
              <h3 className="text-base font-bold text-gray-900">{ref.name}</h3>
              <p className="text-gray-700 text-sm">{ref.title}</p>
              {ref.company && <p className="text-gray-700 text-sm">{ref.company}</p>}
              <div className="text-gray-600 text-sm mt-1">
                {ref.email && <p>{ref.email}</p>}
                {ref.phone && <p>{ref.phone}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    </div>
  </div>
);