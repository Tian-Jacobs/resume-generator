// components/Templates/MinimalTemplate.jsx
import React from 'react';

export const MinimalTemplate = ({ formData }) => (
  <div className="bg-white shadow-lg" style={{ width: '8.5in', minHeight: 'auto', padding: '0.5in' }}>
    {/* Header Section */}
    <div className="mb-8">
      <h1 className="text-3xl font-light text-gray-800 mb-3">{formData.personalInfo.fullName}</h1>
      <div className="text-gray-500 text-xs space-y-1">
        <p>{formData.personalInfo.email}</p>
        <p>{formData.personalInfo.phone}</p>
        <p>{formData.personalInfo.location}</p>
        {formData.personalInfo.linkedin && (
          <p>{formData.personalInfo.linkedin}</p>
        )}
      </div>
    </div>

    {/* Professional Summary */}
    {formData.summary && (
      <div className="mb-6">
        <p className="text-gray-700 leading-loose text-sm">{formData.summary}</p>
      </div>
    )}

    {/* Experience Section */}
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

    {/* Education Section */}
    <div className="mb-6">
      <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="mb-3">
          <h3 className="text-sm font-medium text-gray-800">{edu.degree} in {edu.field}</h3>
          <p className="text-gray-600 text-sm">{edu.institution}, {edu.graduationDate}</p>
        </div>
      ))}
    </div>

    {/* Skills Section */}
    <div className="mb-6">
      <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Skills</h2>
      <p className="text-gray-600 leading-relaxed text-sm">
        {formData.skills.filter(skill => skill.trim()).join(', ')}
      </p>
    </div>

    {/* Accomplishments Section */}
    {formData.accomplishments && formData.accomplishments.filter(acc => acc.trim()).length > 0 && (
      <div className="mb-6">
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Accomplishments</h2>
        <ul className="list-disc list-inside space-y-1">
          {formData.accomplishments.filter(acc => acc.trim()).map((accomplishment, index) => (
            <li key={index} className="text-gray-600 text-xs leading-relaxed">{accomplishment}</li>
          ))}
        </ul>
      </div>
    )}

    {/* References Section */}
    {formData.references && formData.references.filter(ref => ref.name.trim()).length > 0 && (
      <div>
        <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">References</h2>
        {formData.references.filter(ref => ref.name.trim()).map((ref, index) => (
          <div key={index} className="mb-3">
            <h3 className="text-sm font-medium text-gray-800">{ref.name}</h3>
            <p className="text-gray-600 text-xs">{ref.title}{ref.company && ` at ${ref.company}`}</p>
            <div className="text-gray-500 text-xs">
              {ref.email && <p>{ref.email}</p>}
              {ref.phone && <p>{ref.phone}</p>}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);