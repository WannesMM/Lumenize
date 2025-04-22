import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Users2, Building2 } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { ProfileCard } from '@/components/ProfileCard';
import { TeamCard } from '@/components/TeamCard';
import { mockUsers, mockTeams } from '@/data/mockData';

export default function DirectoryScreen() {
  const router = useRouter();
  
  const navigateToTeamsView = () => {
    router.push('/directory/teams');
  };
  
  const navigateToCompanyView = () => {
    router.push('/directory/company');
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Directory',
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
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Team Directory</Text>
            <TouchableOpacity onPress={navigateToTeamsView}>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.cardGrid}>
            {mockTeams.slice(0, 2).map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={navigateToTeamsView}
          >
            <Users2 size={20} color={Colors.primary} />
            <Text style={styles.categoryButtonText}>Browse All Teams</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Company Structure</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={navigateToCompanyView}
          >
            <Building2 size={20} color={Colors.accent} />
            <Text style={styles.categoryButtonText}>View Organization Chart</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>People</Text>
          </View>
          
          <View>
            {mockUsers.map(user => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </View>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
  },
  viewAllLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary,
  },
  cardGrid: {
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray[100],
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
});