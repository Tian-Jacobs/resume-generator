// components/Templates/CreativeTemplate.jsx
import React from 'react';
import { User, Briefcase, GraduationCap, Award } from 'lucide-react';

export const CreativeTemplate = ({ formData }) => (
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
            {formData.personalInfo.linkedin && (
              <p className="mt-1">{formData.personalInfo.linkedin}</p>
            )}
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
            <h3 className="font-semibold text-gray-800 text-xs">{edu.degree} in {edu.field}</h3>
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