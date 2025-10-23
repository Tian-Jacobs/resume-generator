// components/Forms/ReferencesForm.jsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const ReferencesForm = ({ formData, handleInputChange, addArrayItem, removeArrayItem }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">References</h3>
      <button
        onClick={() => addArrayItem('references', { 
          name: '', 
          title: '', 
          company: '', 
          email: '', 
          phone: '' 
        })}
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
      >
        <Plus className="w-4 h-4" /> Add
      </button>
    </div>
    
    {formData.references.map((ref, index) => (
      <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
        <div className="flex justify-between items-start mb-2">
          <span className="font-medium text-sm">Reference {index + 1}</span>
          {formData.references.length > 1 && (
            <button
              onClick={() => removeArrayItem('references', index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Full Name"
            value={ref.name}
            onChange={(e) => handleInputChange('references', 'name', e.target.value, index)}
            className="w-full p-2 border rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={ref.title}
            onChange={(e) => handleInputChange('references', 'title', e.target.value, index)}
            className="w-full p-2 border rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Company"
            value={ref.company}
            onChange={(e) => handleInputChange('references', 'company', e.target.value, index)}
            className="w-full p-2 border rounded-md text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={ref.email}
            onChange={(e) => handleInputChange('references', 'email', e.target.value, index)}
            className="w-full p-2 border rounded-md text-sm"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={ref.phone}
            onChange={(e) => handleInputChange('references', 'phone', e.target.value, index)}
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>
      </div>
    ))}
  </div>
);
