// components/Forms/ExperienceForm.jsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const ExperienceForm = ({ formData, handleInputChange, addArrayItem, removeArrayItem }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">Work Experience</h3>
      <button
        onClick={() => addArrayItem('experience', { 
          company: '', 
          position: '', 
          startDate: '', 
          endDate: '', 
          description: '' 
        })}
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
              placeholder="Start Date (e.g., Jan 2020)"
              value={exp.startDate}
              onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
              className="p-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="End Date (e.g., Present)"
              value={exp.endDate}
              onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
              className="p-2 border rounded-md text-sm"
            />
          </div>
          <textarea
            placeholder="Describe your responsibilities and achievements in this role..."
            value={exp.description}
            onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
            rows={3}
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>
      </div>
    ))}
  </div>
);