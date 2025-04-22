import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Building2, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { SpiderChart } from '@/components/SpiderChart';
import { mockCompany, mockTeams } from '@/data/mockData';
import { QualityAssessment } from '@/types';
import { qualities } from '@/data/qualities';

function calculateCompanyAverages(): QualityAssessment[] {
  const qualityScores: { [key: string]: { total: number; count: number } } = {};
  
  // Initialize all possible qualities
  qualities.forEach(q => {
    qualityScores[q.id] = { total: 0, count: 0 };
  });
  
  // Sum up all scores across all teams
  mockTeams.forEach(team => {
    team.members.forEach(member => {
      member.qualities?.forEach(quality => {
        qualityScores[quality.qualityId].total += quality.rating;
        qualityScores[quality.qualityId].count += 1;
      });
    });
  });
  
  // Calculate averages
  return qualities.map(q => ({
    qualityId: q.id,
    rating: qualityScores[q.id].count > 0 
      ? Math.round((qualityScores[q.id].total / qualityScores[q.id].count) * 2) / 2 as any
      : 3,
    motivation: `Company average based on ${qualityScores[q.id].count} employee ratings`,
    date: new Date().toISOString().split('T')[0],
  }));
}

export default function CompanyScreen() {
  const router = useRouter();
  const companyAverages = calculateCompanyAverages();
  
  const navigateToTeam = (teamId: string) => {
    router.push(`/team/${teamId}`);
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Company',
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
        <View style={styles.companyHeader}>
          <View style={styles.companyIconContainer}>
            <Building2 size={32} color={Colors.white} />
          </View>
          <Text style={styles.companyName}>{mockCompany.name}</Text>
          <Text style={styles.companyStats}>
            {mockCompany.teams.length} Teams • {mockTeams.reduce((acc, team) => acc + team.members.length, 0)} Members
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Performance</Text>
          <View style={styles.chartContainer}>
            <SpiderChart qualities={companyAverages} />
            <Text style={styles.chartDescription}>
              This chart shows the average ratings across all employees for each quality.
            </Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Organization Structure</Text>
        
        <View style={styles.orgStructure}>
          <View style={styles.companyNode}>
            <View style={styles.companyNodeIcon}>
              <Building2 size={24} color={Colors.white} />
            </View>
            <Text style={styles.companyNodeText}>{mockCompany.name}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.teamsContainer}>
            {mockTeams.map(team => (
              <TouchableOpacity
                key={team.id}
                style={styles.teamNode}
                onPress={() => navigateToTeam(team.id)}
              >
                <Text style={styles.teamNodeText}>{team.name}</Text>
                <Text style={styles.teamMemberCount}>
                  {team.members.length} {team.members.length === 1 ? 'member' : 'members'}
                </Text>
                <ChevronRight size={20} color={Colors.gray[400]} />
              </TouchableOpacity>
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
  companyHeader: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  companyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  companyStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
    paddingVertical: 16,
  },
  chartDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  orgStructure: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  companyNode: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 8,
    marginBottom: 16,
  },
  companyNodeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyNodeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
  },
  divider: {
    width: 2,
    height: 24,
    backgroundColor: Colors.gray[300],
    alignSelf: 'center',
    marginBottom: 16,
  },
  teamsContainer: {
    marginLeft: 20,
  },
  teamNode: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 8,
    marginBottom: 12,
  },
  teamNodeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    flex: 1,
  },
  teamMemberCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
});