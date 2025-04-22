import React from 'react';
import {   View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image, } from 'react-native';
import { useRouter } from 'expo-router';
import { UserCircle2, Users2, Building2, ClipboardCheck } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { ProfileCard } from '@/components/ProfileCard';
import { TeamCard } from '@/components/TeamCard';
import { currentUser, mockTeams, mockCompany } from '@/data/mockData';

export default function HomeScreen() {
  const router = useRouter();
  
  const navigateToQuestionnaire = () => {
    router.push('/questionnaire');
  };
  
  const navigateToTeamView = () => {
    router.push('/directory/teams');
  };
  
  const navigateToCompanyView = () => {
    router.push('/directory/company');
  };

  return (
    <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >

    <View style={styles.logoContainer}>
      <Image
        source={require('@/assets/images/logo_name.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>

    <View style={styles.header}>
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.nameText}>{currentUser.name}</Text>
      <TouchableOpacity
        style={styles.assessmentButton}
        onPress={navigateToQuestionnaire}
      >
        <ClipboardCheck size={20} color={Colors.white} />
        <Text style={styles.assessmentButtonText}>Start Assessment</Text>
      </TouchableOpacity>
    </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <UserCircle2 size={24} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Individual View</Text>
        </View>
        <View style={styles.sectionContent}>
          <ProfileCard user={currentUser} />
          <Text style={styles.sectionDescription}>
            Manage your personal profile, view your assessments, and track your progress.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users2 size={24} color={Colors.secondary} />
          <Text style={styles.sectionTitle}>Team View</Text>
        </View>
        <View style={styles.sectionContent}>
          <TeamCard team={mockTeams.find(team => team.id === currentUser.teamId)!} />
          <Text style={styles.sectionDescription}>
            Connect with your team members and view collective assessments.
          </Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={navigateToTeamView}
          >
            <Text style={styles.viewAllText}>View All Teams</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Building2 size={24} color={Colors.accent} />
          <Text style={styles.sectionTitle}>Company View</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.companyCard}>
            <View style={styles.companyIconContainer}>
              <Building2 size={24} color={Colors.white} />
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{mockCompany.name}</Text>
              <Text style={styles.companyStats}>
                {mockCompany.teams.length} Teams • {mockTeams.reduce((acc, team) => acc + team.members.length, 0)} Members
              </Text>
            </View>
          </View>
          <Text style={styles.sectionDescription}>
            Explore all teams and departments across the company.
          </Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={navigateToCompanyView}
          >
            <Text style={styles.viewAllText}>View Company Structure</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 200,
    height: 200,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 0,      // pull content (logo) all the way up
    paddingBottom: 16,
  },
  header: {
    backgroundColor: Colors.primary,
    marginTop: -40, 
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  nameText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.white,
    marginBottom: 24,
  },
  assessmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  assessmentButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.white,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  sectionContent: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 12,
    lineHeight: 20,
  },
  companyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  companyIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  companyStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  viewAllButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.gray[100],
    borderRadius: 8,
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.primary,
  },
});