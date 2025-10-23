# 📄 AI Resume Generator

A modern, React-based resume generator with AI-powered content generation and professional PDF export capabilities.

## ✨ Features

### 🤖 AI-Powered Generation
- Generate complete resumes using Google's Gemini AI
- Intelligent content creation based on job descriptions and personal details
- Automatic population of all sections including accomplishments and references

### 🎨 Multiple Professional Templates
- **Modern Template** - Clean blue theme with modern layout
- **Classic Template** - Traditional serif font, centered design
- **Minimal Template** - Minimalist gray aesthetic
- **Executive Template** - Professional dark header design

### 📥 Advanced PDF Export
- High-quality PDF generation using `@react-pdf/renderer`
- Perfect page break handling - no split sections
- Automatic top spacing for new page sections
- Print-ready professional formatting

### 💾 Auto-Save Feature
- Automatic localStorage persistence
- Data survives page refreshes and browser sessions
- One-click clear data option with confirmation

### 📝 Comprehensive Sections
- Personal Information (name, contact, LinkedIn)
- Professional Summary
- Work Experience (multiple entries)
- Education (multiple entries)
- Skills (tags/badges)
- Key Accomplishments (bullet points)
- Professional References

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BlessedT99/resume-generator.git
   cd resume-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Manual Entry Mode
1. Click **"Manual Entry"** in the sidebar
2. Fill in your information in each section
3. Use **+ Add** buttons to add multiple experiences, education, skills, etc.
4. Data is auto-saved as you type

### AI Generation Mode
1. Click **"AI Generate"** in the sidebar
2. Enter your job title, years of experience, and target job description
3. Click **"Generate Resume"**
4. AI will populate all sections automatically
5. Review and edit as needed

### Exporting PDF
1. Select your preferred template from the sidebar
2. Click **"Export PDF"** button
3. PDF downloads automatically with your name

### Managing Data
- **Auto-Save**: All changes are automatically saved to browser storage
- **Clear Data**: Click "Clear All Data" button to reset and start fresh
- **Persistence**: Data remains even after closing browser

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### PDF Generation
- **@react-pdf/renderer** - PDF creation and rendering
- Custom PDF templates for each design

### AI Integration
- **Google Generative AI (Gemini)** - AI content generation
- Custom prompts for resume sections

### Storage
- **localStorage** - Client-side data persistence

## 📦 Project Structure

```
resume-generator/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Forms/
│   │   │   ├── AIPromptForm.jsx
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── ExperienceForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   ├── SkillsForm.jsx
│   │   │   ├── AccomplishmentsForm.jsx
│   │   │   └── ReferencesForm.jsx
│   │   ├── Templates/
│   │   │   ├── ModernTemplate.jsx
│   │   │   ├── ClassicTemplate.jsx
│   │   │   ├── MinimalTemplate.jsx
│   │   │   └── CreativeTemplate.jsx
│   │   └── PDFTemplates/
│   │       ├── ModernPDFTemplate.jsx
│   │       ├── ClassicPDFTemplate.jsx
│   │       ├── MinimalPDFTemplate.jsx
│   │       └── ExecutivePDFTemplate.jsx
│   ├── hooks/
│   │   └── useResumeData.js
│   ├── services/
│   │   └── geminiService.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env
├── package.json
└── README.md
```

## 🎨 Template Customization

Each template has two versions:
- **Preview Template** (in `components/Templates/`) - For on-screen preview
- **PDF Template** (in `components/PDFTemplates/`) - For PDF export

To customize styling:
1. Edit StyleSheet in PDF template files
2. Modify Tailwind classes in preview templates

## 🔧 Configuration

### Environment Variables
- `REACT_APP_GEMINI_API_KEY` - Your Google Gemini API key

### localStorage Key
- Data is stored under: `resumeGeneratorData`

## 📝 Features in Detail

### Page Break Handling
- Sections use `wrap={false}` to prevent splitting
- `break: 'avoid'` in styles prevents awkward breaks
- Top padding (36pt) applied to sections that typically start on page 2

### Data Validation
- Email format validation
- Phone number validation
- Required field checks before AI generation

### Responsive Design
- Sidebar navigation
- Flexible form layouts
- Mobile-friendly interface

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner in the interactive watch mode.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-pdf/renderer](https://react-pdf.org/)
- [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- [Lucide Icons](https://lucide.dev/)

## 📧 Contact

Tian Jacobs - [@BlessedT99](https://github.com/BlessedT99)

Project Link: [https://github.com/BlessedT99/resume-generator](https://github.com/BlessedT99/resume-generator)

---

Made with ❤️ by Tian Jacobs


### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
