import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm = ({ formData, handleInputChange, addArrayItem, removeArrayItem }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">Education</h3>
      <button
        onClick={() => addArrayItem('education', { 
          institution: '', 
          degree: '', 
          field: '', 
          graduationDate: '' 
        })}
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
            placeholder="Graduation Date (e.g., May 2020)"
            value={edu.graduationDate}
            onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>
      </div>
    ))}
  </div>
);