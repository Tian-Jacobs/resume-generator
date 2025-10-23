import React from 'react';
import geminiService from '../../services/geminiService';

export const AIPromptForm = ({ prompt, setPrompt, setFormData, isGenerating, setIsGenerating }) => {
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description of your background and experience.');
      return;
    }

    setIsGenerating(true);
    
    try {
      const resumeData = await geminiService.generateResumeData(prompt);
      
      // Ensure accomplishments and references have default values if not provided
      const completeResumeData = {
        ...resumeData,
        accomplishments: resumeData.accomplishments || [''],
        references: resumeData.references || [{
          name: '',
          title: '',
          company: '',
          email: '',
          phone: ''
        }]
      };
      
      setFormData(completeResumeData);
      alert('Resume generated successfully!');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">AI Resume Generation</h2>
      <p className="text-gray-600 mb-4">
        Describe your background, experience, skills, accomplishments, and career goals. Include any references if available. The AI will generate a professional resume for you.
      </p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="E.g., I'm a software engineer with 5 years of experience in React and Node.js. I've led multiple successful projects and received the Employee of the Year award. I hold AWS certifications and have contributed to open-source projects..."
        rows={6}
        className="w-full p-3 border rounded-lg mb-4"
      />
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate Resume'}
      </button>
    </div>
  );
};