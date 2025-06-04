import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function IsciProfileScreen() {
  const { user } = useAuth();
  
  // Sample profile data
  const [profile, setProfile] = useState({
    fullName: 'Ali Mahmudlu',
    title: 'Senior Software Developer',
    location: 'Baku, Azerbaijan',
    about: 'Experienced software developer with 5+ years of experience in web and mobile development. Proficient in JavaScript, React, React Native, and Node.js.',
    skills: ['JavaScript', 'React', 'React Native', 'Node.js', 'TypeScript', 'HTML/CSS'],
    experience: [
      {
        id: '1',
        role: 'Senior Developer',
        company: 'Tech Solutions Inc.',
        duration: 'Jan 2020 - Present',
      },
      {
        id: '2',
        role: 'Frontend Developer',
        company: 'Web Innovations',
        duration: 'Mar 2018 - Dec 2019',
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Azerbaijan Technical University',
        year: '2014 - 2018',
      }
    ],
    contactEmail: user?.email || 'ali.mahmudlu@example.com',
    contactPhone: '+994 50 123 4567',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitial}>{profile.fullName.charAt(0)}</Text>
          </View>
        </View>
        
        <View style={styles.headerContent}>
          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={editedProfile.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
            />
          ) : (
            <Text style={styles.name}>{profile.fullName}</Text>
          )}
          
          {isEditing ? (
            <TextInput
              style={styles.titleInput}
              value={editedProfile.title}
              onChangeText={(text) => handleChange('title', text)}
            />
          ) : (
            <Text style={styles.title}>{profile.title}</Text>
          )}
          
          {isEditing ? (
            <TextInput
              style={styles.locationInput}
              value={editedProfile.location}
              onChangeText={(text) => handleChange('location', text)}
            />
          ) : (
            <Text style={styles.location}>{profile.location}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        {isEditing ? (
          <TextInput
            style={styles.aboutInput}
            value={editedProfile.about}
            onChangeText={(text) => handleChange('about', text)}
            multiline
          />
        ) : (
          <Text style={styles.aboutText}>{profile.about}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {profile.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {profile.experience.map((exp) => (
          <View key={exp.id} style={styles.experienceItem}>
            <Text style={styles.roleText}>{exp.role}</Text>
            <Text style={styles.companyText}>{exp.company}</Text>
            <Text style={styles.durationText}>{exp.duration}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {profile.education.map((edu) => (
          <View key={edu.id} style={styles.educationItem}>
            <Text style={styles.degreeText}>{edu.degree}</Text>
            <Text style={styles.institutionText}>{edu.institution}</Text>
            <Text style={styles.yearText}>{edu.year}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={editedProfile.contactEmail}
              onChangeText={(text) => handleChange('contactEmail', text)}
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.infoValue}>{profile.contactEmail}</Text>
          )}
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={editedProfile.contactPhone}
              onChangeText={(text) => handleChange('contactPhone', text)}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.infoValue}>{profile.contactPhone}</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  titleInput: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  locationInput: {
    fontSize: 14,
    color: '#666',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
  },
  aboutInput: {
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    color: '#1976d2',
    fontWeight: '500',
  },
  experienceItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyText: {
    fontSize: 14,
    marginBottom: 5,
  },
  durationText: {
    fontSize: 14,
    color: '#666',
  },
  educationItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  degreeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  institutionText: {
    fontSize: 14,
    marginBottom: 5,
  },
  yearText: {
    fontSize: 14,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    width: 80,
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
  },
  infoInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});