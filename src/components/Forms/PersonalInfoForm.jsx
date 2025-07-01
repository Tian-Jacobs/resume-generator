import React from 'react';

export const PersonalInfoForm = ({ formData, handleInputChange }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.personalInfo.fullName}
        onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.personalInfo.email}
        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.personalInfo.phone}
        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.personalInfo.location}
        onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="url"
        placeholder="LinkedIn Profile"
        value={formData.personalInfo.linkedin}
        onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
        className="w-full p-2 border rounded-md"
      />
    </div>
  </div>
);
