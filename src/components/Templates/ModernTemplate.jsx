import React from 'react';

export const ModernTemplate = ({ formData }) => (
  <div className="bg-white shadow-lg" style={{ width: '8.5in', minHeight: 'auto', padding: '0.5in' }}>
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

    {formData.accomplishments && formData.accomplishments.filter(acc => acc.trim()).length > 0 && (
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">ACCOMPLISHMENTS</h2>
        <ul className="list-disc list-inside space-y-1">
          {formData.accomplishments.filter(acc => acc.trim()).map((accomplishment, index) => (
            <li key={index} className="text-gray-700 text-xs leading-relaxed">{accomplishment}</li>
          ))}
        </ul>
      </div>
    )}

    {formData.references && formData.references.filter(ref => ref.name.trim()).length > 0 && (
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b-2 border-blue-600 pb-1">REFERENCES</h2>
        {formData.references.filter(ref => ref.name.trim()).map((ref, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-semibold text-gray-800 text-sm">{ref.name}</h3>
            <p className="text-blue-600 text-xs">{ref.title}{ref.company && ` at ${ref.company}`}</p>
            <div className="text-gray-600 text-xs">
              {ref.email && <p>{ref.email}</p>}
              {ref.phone && <p>{ref.phone}</p>}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);