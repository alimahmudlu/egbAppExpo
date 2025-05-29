import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function employeeProfileScreen() {
  const { user } = useAuth();
  
  // Sample profile data
  const [profile, setProfile] = useState({
    companyName: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    location: 'Baku, Azerbaijan',
    website: 'www.techsolutions.com',
    about: 'Tech Solutions Inc. is a leading technology company specializing in software development, cloud solutions, and digital transformation services.',
    contactEmail: user?.email || 'contact@techsolutions.com',
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
            <Text style={styles.profileInitial}>{profile.companyName.charAt(0)}</Text>
          </View>
        </View>
        
        <View style={styles.headerContent}>
          {isEditing ? (
            <TextInput
              style={styles.companyNameInput}
              value={editedProfile.companyName}
              onChangeText={(text) => handleChange('companyName', text)}
            />
          ) : (
            <Text style={styles.companyName}>{profile.companyName}</Text>
          )}
          
          {isEditing ? (
            <TextInput
              style={styles.industryInput}
              value={editedProfile.industry}
              onChangeText={(text) => handleChange('industry', text)}
            />
          ) : (
            <Text style={styles.industry}>{profile.industry}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={editedProfile.location}
              onChangeText={(text) => handleChange('location', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profile.location}</Text>
          )}
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Website:</Text>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={editedProfile.website}
              onChangeText={(text) => handleChange('website', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profile.website}</Text>
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
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyNameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  industry: {
    fontSize: 16,
    color: '#666',
  },
  industryInput: {
    fontSize: 16,
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