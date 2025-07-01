import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const SkillsForm = ({ formData, handleInputChange, addArrayItem, removeArrayItem }) => (
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
          placeholder="Skill (e.g., JavaScript, Project Management)"
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
);