import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "@/utils/utils";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  detail: {
    marginBottom: 5,
    fontSize: 12,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    paddingBottom: 3,
    marginTop: 10,
  },
  skill: {
    fontSize: 12,
    marginBottom: 3,
  },
  experience: {
    marginBottom: 10,
  },
  education: {
    marginBottom: 10,
  },
  blackBlock: {
    backgroundColor: "#000000",
    width: "25%",
    height: 12,
    marginBottom: 5,
  },
});

const ResumeTemplate = ({ user }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Resume</Text>
        <Text style={styles.detail}>Name: </Text>
        <View style={styles.blackBlock} />
        <Text style={styles.detail}>Email: </Text>
        <View style={styles.blackBlock} />
        <Text style={styles.detail}>Country: {user?.country}</Text>
        {user?.preferredContactMethod && (
          <Text style={styles.detail}>
            Preferred Contact Method: {user?.preferredContactMethod}
          </Text>
        )}
        {user?.highestEducation && (
          <Text style={styles.detail}>
            Highest Education: {user?.highestEducation}
          </Text>
        )}
        <Text style={styles.detail}>
          {user?.industry
            ? `Industry: ${user?.industry}`
            : `Sector: ${user?.sector}`}
        </Text>
        <Text style={styles.detail}>Location: {user?.location}</Text>
        <Text style={styles.detail}>About: {user?.about}</Text>

        <Text style={styles.subHeader}>Skills</Text>
        {user?.skills.map((skill: any, index: any) => (
          <Text key={index} style={styles.skill}>
            - {skill}
          </Text>
        ))}

        <Text style={styles.subHeader}>Experiences</Text>
        {user?.experiences.map((exp: any, index: any) => (
          <View key={index} style={styles.experience}>
            <Text style={styles.detail}>Company: {exp.companyName}</Text>
            <Text style={styles.detail}>Role: {exp.role}</Text>
            <Text style={styles.detail}>
              Start Year: {formatDate(exp.startDate)}
            </Text>
            <Text style={styles.detail}>
              End Year:
              {exp?.currentlyWorking
                ? "Currently Working"
                : formatDate(exp?.endDate)}
            </Text>
          </View>
        ))}

        <Text style={styles.subHeader}>Educations</Text>
        {user?.educations.map((edu: any, index: any) => (
          <View key={index} style={styles.education}>
            <Text style={styles.detail}>School: {edu.school}</Text>
            <Text style={styles.detail}>Degree: {edu.degree}</Text>
            <Text style={styles.detail}>
              Start Year: {formatDate(edu.startYear)}
            </Text>
            <Text style={styles.detail}>
              End Year:{" "}
              {edu?.currentlyStudying
                ? "Currently Studying"
                : formatDate(edu?.endYear)}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumeTemplate;
