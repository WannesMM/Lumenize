import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SpiderChart } from '@/components/SpiderChart';
import { currentUser } from '@/data/mockData';
import { getQualityById, getRatingLabel } from '@/data/qualities';

export default function ProfileScreen() {
  const userQualities = currentUser.qualities || [];
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'My Profile',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.white,
          },
          headerTitleStyle: {
            fontFamily: 'Inter-SemiBold',
            fontSize: 18,
          },
          headerShadowVisible: false,
        }} 
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: currentUser.avatarUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userPosition}>{currentUser.position}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills Assessment</Text>
          {userQualities.length > 0 ? (
            <>
              <View style={styles.chartContainer}>
                <SpiderChart qualities={userQualities} />
              </View>
              
              <View style={styles.qualitiesList}>
                {userQualities.map(quality => {
                  const qualityData = getQualityById(quality.qualityId);
                  if (!qualityData) return null;
                  
                  return (
                    <View 
                      key={quality.qualityId}
                      style={styles.qualityItem}
                    >
                      <View style={styles.qualityHeader}>
                        <View style={[styles.qualityIcon, { backgroundColor: qualityData.color }]} />
                        <Text style={styles.qualityName}>{qualityData.name}</Text>
                        <View style={styles.ratingBadge}>
                          <Text style={styles.ratingText}>{getRatingLabel(quality.rating)}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.motivationText}>{quality.motivation}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                You haven't completed any assessments yet. 
                Start an assessment to see your skills visualization here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userPosition: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  qualitiesList: {
    marginTop: 16,
  },
  qualityItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
  },
  qualityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  qualityIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  qualityName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  ratingBadge: {
    backgroundColor: Colors.gray[200],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  motivationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});