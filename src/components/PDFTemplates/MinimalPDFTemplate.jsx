// components/PDFTemplates/MinimalPDFTemplate.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Helvetica',
    fontSize: 9,
    backgroundColor: '#fafafa',
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 1,
  },
  section: {
    marginBottom: 14,
    break: 'avoid',
  },
  sectionWithTopPadding: {
    marginBottom: 14,
    paddingTop: 36,
    break: 'avoid',
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#4b5563',
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  date: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 3,
  },
  description: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#4b5563',
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  institution: {
    fontSize: 8,
    color: '#4b5563',
  },
  graduationDate: {
    fontSize: 8,
    color: '#6b7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#e5e7eb',
    padding: '3 8',
    borderRadius: 2,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.5,
    color: '#4b5563',
  },
  referenceItem: {
    marginBottom: 6,
  },
  referenceName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  referenceTitle: {
    fontSize: 8,
    color: '#4b5563',
  },
  referenceContact: {
    fontSize: 7,
    color: '#6b7280',
  },
});

export const MinimalPDFTemplate = ({ formData }) => (
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
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{formData.summary}</Text>
        </View>
      )}

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
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
        <Text style={styles.sectionTitle}>Education</Text>
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
        <Text style={styles.sectionTitle}>Skills</Text>
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
          <Text style={styles.sectionTitle}>Accomplishments</Text>
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
          <Text style={styles.sectionTitle}>References</Text>
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
