import React, { useState } from 'react';
import { Download, Edit3, Zap } from 'lucide-react';

// Hooks
import { useResumeData } from './hooks/useResumeData';

// Components
import { AIPromptForm } from './components/Forms/AIPromptForm';
import { PersonalInfoForm } from './components/Forms/PersonalInfoForm';
import { ExperienceForm } from './components/Forms/ExperienceForm';
import { EducationForm } from './components/Forms/EducationForm';
import { SkillsForm } from './components/Forms/SkillsForm';

// Templates
import { ModernTemplate } from './components/Templates/ModernTemplate';
import { ClassicTemplate } from './components/Templates/ClassicTemplate';
import { MinimalTemplate } from './components/Templates/MinimalTemplate';
import { CreativeTemplate } from './components/Templates/CreativeTemplate';

const ResumeGenerator = () => {
  // State management
  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [mode, setMode] = useState('manual'); // 'manual' or 'automatic'
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Custom hook for resume data management
  const {
    formData,
    setFormData,
    handleInputChange,
    addArrayItem,
    removeArrayItem
  } = useResumeData();

  // Template configuration
  const templates = {
    modern: 'Modern',
    classic: 'Classic',
    minimal: 'Minimal',
    creative: 'Creative'
  };

  // PDF Export functionality
  const exportToPDF = () => {
    try {
      // Check if html2pdf is available
      if (typeof window.html2pdf === 'undefined') {
        // Load html2pdf script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
          setTimeout(() => exportToPDF(), 100);
        };
        script.onerror = () => {
          alert('Failed to load PDF library. Please check your internet connection and try again.');
        };
        document.head.appendChild(script);
        return;
      }

      const element = document.getElementById('resume-template');
      if (!element) {
        alert('Resume template not found. Please try again.');
        return;
      }

      const opt = {
        margin: 0,
        filename: `${formData.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollX: -7,
          scrollY: 0,
          width: 816,
          height: 1056
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };

      window.html2pdf().set(opt).from(element).save().catch((error) => {
        console.error('PDF generation failed:', error);
        alert('PDF generation failed. Please try again.');
      });

    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    }
  };

  // Template renderer
  const renderTemplate = () => {
    const templateProps = { formData };
    
    switch (currentTemplate) {
      case 'modern': 
        return <ModernTemplate {...templateProps} />;
      case 'classic': 
        return <ClassicTemplate {...templateProps} />;
      case 'minimal': 
        return <MinimalTemplate {...templateProps} />;
      case 'creative': 
        return <CreativeTemplate {...templateProps} />;
      default: 
        return <ModernTemplate {...templateProps} />;
    }
  };

  // Summary form component (inline since it's simple)
  const SummaryForm = () => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Professional Summary</h3>
      <textarea
        placeholder="Write a brief professional summary..."
        value={formData.summary}
        onChange={(e) => handleInputChange('summary', null, e.target.value)}
        rows={4}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Side Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Resume Generator</h1>
          
          {/* Mode Selection */}
          <div className="space-y-2">
            <button
              onClick={() => setMode('manual')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                mode === 'manual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Edit3 className="w-5 h-5" />
              Manual Entry
            </button>
            
            <button
              onClick={() => setMode('automatic')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                mode === 'automatic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Zap className="w-5 h-5" />
              AI Generate
            </button>
          </div>

          {/* Template Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">TEMPLATES</h3>
            <div className="space-y-1">
              {Object.entries(templates).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setCurrentTemplate(key)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentTemplate === key
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToPDF}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors mt-6"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* AI Generation Mode */}
          {mode === 'automatic' && (
            <AIPromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              setFormData={setFormData}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section - Only show in manual mode */}
            {mode === 'manual' && (
              <div className="space-y-6">
                <PersonalInfoForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                />

                <SummaryForm />

                <ExperienceForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />

                <EducationForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />

                <SkillsForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              </div>
            )}

            {/* Preview Section */}
            <div className={`${mode === 'manual' ? '' : 'col-span-full'} lg:sticky lg:top-4`}>
              <h3 className="text-lg font-semibold mb-4">
                Preview ({templates[currentTemplate]} Template)
              </h3>
              <div className="bg-gray-200 p-2 rounded-lg border-2 border-gray-300" 
                   style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex justify-center">
                  <div 
                    style={{ 
                      transform: mode === 'automatic' ? 'scale(0.5)' : 'scale(0.7)', 
                      transformOrigin: 'top center',
                      marginBottom: mode === 'automatic' ? '-50%' : '-30%',
                      width: '816px'
                    }}
                  >
                    <div id="resume-template">
                      {renderTemplate()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;