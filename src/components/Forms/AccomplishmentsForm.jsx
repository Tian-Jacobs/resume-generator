// components/Forms/AccomplishmentsForm.jsx
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const AccomplishmentsForm = ({ formData, handleInputChange, addArrayItem, removeArrayItem }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold">Accomplishments</h3>
      <button
        onClick={() => addArrayItem('accomplishments', '')}
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
      >
        <Plus className="w-4 h-4" /> Add
      </button>
    </div>
    
    <div className="space-y-2">
      {formData.accomplishments.map((accomplishment, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter an accomplishment..."
            value={accomplishment}
            onChange={(e) => handleInputChange('accomplishments', null, e.target.value, index)}
            className="flex-1 p-2 border rounded-md text-sm"
          />
          {formData.accomplishments.length > 1 && (
            <button
              onClick={() => removeArrayItem('accomplishments', index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
