// components/PDFTemplates/ClassicPDFTemplate.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Times-Roman',
    fontSize: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Times-Bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  contactInfo: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 2,
    textAlign: 'center',
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
    fontSize: 12,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'center',
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 12,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  company: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
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
    textAlign: 'center',
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  institution: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
  },
  graduationDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#f3f4f6',
    padding: '4 10',
    borderRadius: 3,
    fontSize: 9,
    marginRight: 4,
    marginBottom: 4,
  },
  bulletList: {
    marginLeft: 20,
    marginRight: 20,
  },
  bulletItem: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 4,
    textAlign: 'center',
  },
  referenceItem: {
    marginBottom: 8,
    textAlign: 'center',
  },
  referenceName: {
    fontSize: 10,
    fontFamily: 'Times-Bold',
  },
  referenceTitle: {
    fontSize: 9,
    fontFamily: 'Times-Italic',
  },
  referenceContact: {
    fontSize: 8,
    color: '#6b7280',
  },
});

export const ClassicPDFTemplate = ({ formData }) => (
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
              <Text key={index} style={styles.bulletItem}>
                • {accomplishment}
              </Text>
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
