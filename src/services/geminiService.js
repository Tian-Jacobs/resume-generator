import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    // In production, this should come from a secure backend endpoint
    // For development only - never expose API keys in client code
    this.genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    // Updated to use the latest model
    // "gemini-2.0-flash" - Latest model (as shown in your Google AI Studio)
    // "gemini-1.5-flash" - Alternative if 2.0 doesn't work
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async generateResumeData(userPrompt) {
    try {
      const prompt = `Based on the following description, generate a professional resume data in JSON format. Return ONLY valid JSON with this exact structure:

{
  "personalInfo": {
    "fullName": "Full Name",
    "email": "email@example.com",
    "phone": "Phone Number",
    "location": "City, State",
    "linkedin": "LinkedIn URL"
  },
  "summary": "Professional summary paragraph",
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "startDate": "Start Date",
      "endDate": "End Date",
      "description": "Job description and achievements"
    }
  ],
  "education": [
    {
      "institution": "School Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "graduationDate": "Graduation Date"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"]
}

User description: ${userPrompt}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('Failed to generate resume. Please try again.');
    }
  }
}

export default new GeminiService();