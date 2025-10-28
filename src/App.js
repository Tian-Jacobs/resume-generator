import React, { useState } from 'react';
import { Download, Edit3, Zap, Trash2, Menu, X } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';

// Hooks
import { useResumeData } from './hooks/useResumeData';

// Components
import { AIPromptForm } from './components/Forms/AIPromptForm';
import { PersonalInfoForm } from './components/Forms/PersonalInfoForm';
import { ExperienceForm } from './components/Forms/ExperienceForm';
import { EducationForm } from './components/Forms/EducationForm';
import { SkillsForm } from './components/Forms/SkillsForm';
import { AccomplishmentsForm } from './components/Forms/AccomplishmentsForm';
import { ReferencesForm } from './components/Forms/ReferencesForm';

// Templates (for preview)
import { ModernTemplate } from './components/Templates/ModernTemplate';
import { ClassicTemplate } from './components/Templates/ClassicTemplate';
import { MinimalTemplate } from './components/Templates/MinimalTemplate';
import { CreativeTemplate } from './components/Templates/CreativeTemplate';

// PDF Templates
import { ModernPDFTemplate } from './components/PDFTemplates/ModernPDFTemplate';
import { ClassicPDFTemplate } from './components/PDFTemplates/ClassicPDFTemplate';
import { MinimalPDFTemplate } from './components/PDFTemplates/MinimalPDFTemplate';
import { ExecutivePDFTemplate } from './components/PDFTemplates/ExecutivePDFTemplate';

const ResumeGenerator = () => {
  // State management
  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [mode, setMode] = useState('manual'); // 'manual' or 'automatic'
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle

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

    // PDF Export functionality using react-pdf
  const exportToPDF = async () => {
    try {
      // Select the appropriate PDF template based on current template
      let PDFTemplate;
      switch (currentTemplate) {
        case 'modern':
          PDFTemplate = ModernPDFTemplate;
          break;
        case 'classic':
          PDFTemplate = ClassicPDFTemplate;
          break;
        case 'minimal':
          PDFTemplate = MinimalPDFTemplate;
          break;
        case 'creative':
          PDFTemplate = ExecutivePDFTemplate;
          break;
        default:
          PDFTemplate = ModernPDFTemplate;
      }

      // Generate PDF blob
      const blob = await pdf(<PDFTemplate formData={formData} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.personalInfo.fullName || 'resume'}.pdf`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    }
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all resume data? This cannot be undone.')) {
      localStorage.removeItem('resumeGeneratorData');
      window.location.reload();
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
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-xl font-bold text-gray-800">Resume Generator</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
      {/* Side Navigation */}
      <div className={`
        fixed lg:static top-[72px] lg:top-0 bottom-0 left-0 z-40
        w-64 bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 overflow-y-auto h-full">
          <h1 className="hidden lg:block text-2xl font-bold text-gray-800 mb-6">Resume Generator</h1>
          
          {/* Mode Selection */}
          <div className="space-y-2">
            <button
              onClick={() => {
                setMode('manual');
                setSidebarOpen(false);
              }}
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
              onClick={() => {
                setMode('automatic');
                setSidebarOpen(false);
              }}
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
                  onClick={() => {
                    setCurrentTemplate(key);
                    setSidebarOpen(false);
                  }}
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

          {/* Clear Data Button */}
          <button
            onClick={clearAllData}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors mt-3"
          >
            <Trash2 className="w-5 h-5" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* Form Section - Only show in manual mode */}
            {mode === 'manual' && (
              <div className="space-y-4 md:space-y-6">
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

                <AccomplishmentsForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />

                <ReferencesForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              </div>
            )}

            {/* Preview Section */}
            <div className={`${mode === 'manual' ? '' : 'col-span-full'} lg:sticky lg:top-4`}>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                Preview ({templates[currentTemplate]} Template)
              </h3>
              <div className="bg-gray-200 p-1 md:p-2 rounded-lg border-2 border-gray-300" 
                   style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex justify-center">
                  <div 
                    className="w-full md:w-auto"
                    style={{ 
                      transform: mode === 'automatic' ? 'scale(0.35)' : 'scale(0.45)', 
                      transformOrigin: 'top center',
                      marginBottom: mode === 'automatic' ? '-65%' : '-55%',
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

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ResumeGenerator;