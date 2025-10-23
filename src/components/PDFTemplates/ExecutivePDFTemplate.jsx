// components/PDFTemplates/ExecutivePDFTemplate.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    backgroundColor: '#1f2937',
    padding: 36,
    color: '#ffffff',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#d1d5db',
    marginBottom: 2,
  },
  content: {
    padding: '0 36 36 36',
  },
  section: {
    marginBottom: 16,
    break: 'avoid',
  },
  sectionWithTopPadding: {
    marginBottom: 16,
    paddingTop: 36, // Add padding for sections that might start on new page
    break: 'avoid',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#1f2937',
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 10,
    fontWeight: 'semibold',
    color: '#374151',
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
    fontWeight: 'semibold',
    color: '#374151',
  },
  graduationDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    padding: '5 10',
    fontSize: 9,
    fontWeight: 'medium',
    marginRight: 6,
    marginBottom: 6,
  },
  bulletList: {
    marginLeft: 12,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
  },
  referencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  referenceItem: {
    width: '48%',
    marginBottom: 8,
  },
  referenceName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  referenceTitle: {
    fontSize: 9,
    color: '#374151',
  },
  referenceCompany: {
    fontSize: 9,
    color: '#374151',
  },
  referenceContact: {
    fontSize: 8,
    color: '#6b7280',
    marginTop: 2,
  },
});

export const ExecutivePDFTemplate = ({ formData }) => (
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

      <View style={styles.content}>
        {/* Professional Summary */}
        {formData.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{formData.summary}</Text>
          </View>
        )}

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
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
            <Text style={styles.sectionTitle}>Key Accomplishments</Text>
            <View style={styles.bulletList}>
              {formData.accomplishments.filter(acc => acc.trim()).map((accomplishment, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>▪</Text>
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
            <View style={styles.referencesGrid}>
              {formData.references.filter(ref => ref.name.trim()).map((ref, index) => (
                <View key={index} style={styles.referenceItem}>
                  <Text style={styles.referenceName}>{ref.name}</Text>
                  <Text style={styles.referenceTitle}>{ref.title}</Text>
                  {ref.company && <Text style={styles.referenceCompany}>{ref.company}</Text>}
                  {ref.email && <Text style={styles.referenceContact}>{ref.email}</Text>}
                  {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </Page>
  </Document>
);
