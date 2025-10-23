// components/PDFTemplates/ModernPDFTemplate.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 36, // 0.5 inch
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  section: {
    marginBottom: 16,
    break: 'avoid',
  },
  sectionWithTopPadding: {
    marginBottom: 16,
    paddingTop: 36,
    break: 'avoid',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 10,
    color: '#2563eb',
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 4,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  institution: {
    fontSize: 10,
    color: '#2563eb',
  },
  graduationDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '4 8',
    borderRadius: 4,
    fontSize: 9,
    marginRight: 4,
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 12,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  referenceItem: {
    marginBottom: 8,
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  referenceTitle: {
    fontSize: 9,
    color: '#2563eb',
  },
  referenceContact: {
    fontSize: 8,
    color: '#6b7280',
  },
});

export const ModernPDFTemplate = ({ formData }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{formData.personalInfo.fullName}</Text>
        <Text style={styles.contactInfo}>
          {formData.personalInfo.email} | {formData.personalInfo.phone}
        </Text>
        <Text style={styles.contactInfo}>{formData.personalInfo.location}</Text>
        {formData.personalInfo.linkedin && (
          <Text style={styles.contactInfo}>{formData.personalInfo.linkedin}</Text>
        )}
      </View>

      {/* Professional Summary */}
      {formData.summary && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.summary}>{formData.summary}</Text>
        </View>
      )}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {formData.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem} wrap={false}>
            <Text style={styles.jobTitle}>{exp.position}</Text>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.date}>
              {exp.startDate} - {exp.endDate}
            </Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {formData.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.degree}>
              {edu.degree} in {edu.field}
            </Text>
            <Text style={styles.institution}>{edu.institution}</Text>
            <Text style={styles.graduationDate}>{edu.graduationDate}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <View style={styles.skillsContainer}>
          {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
            <Text key={index} style={styles.skillBadge}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {/* Accomplishments */}
      {formData.accomplishments && formData.accomplishments.filter(acc => acc.trim()).length > 0 && (
        <View style={styles.sectionWithTopPadding} wrap={false}>
          <Text style={styles.sectionTitle}>ACCOMPLISHMENTS</Text>
          <View style={styles.bulletList}>
            {formData.accomplishments.filter(acc => acc.trim()).map((accomplishment, index) => (
              <View key={index} style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{accomplishment}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* References */}
      {formData.references && formData.references.filter(ref => ref.name.trim()).length > 0 && (
        <View style={styles.sectionWithTopPadding} wrap={false}>
          <Text style={styles.sectionTitle}>REFERENCES</Text>
          {formData.references.filter(ref => ref.name.trim()).map((ref, index) => (
            <View key={index} style={styles.referenceItem}>
              <Text style={styles.referenceName}>{ref.name}</Text>
              <Text style={styles.referenceTitle}>
                {ref.title}{ref.company && ` at ${ref.company}`}
              </Text>
              {ref.email && <Text style={styles.referenceContact}>{ref.email}</Text>}
              {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
