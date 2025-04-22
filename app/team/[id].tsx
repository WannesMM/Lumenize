import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Users as Users2, ChevronLeft } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { ProfileCard } from '@/components/ProfileCard';
import { SpiderChart } from '@/components/SpiderChart';
import { mockTeams } from '@/data/mockData';
import { QualityAssessment } from '@/types';
import { qualities } from '@/data/qualities';

function calculateTeamAverages(members: typeof mockTeams[0]['members']): QualityAssessment[] {
  const qualityScores: { [key: string]: { total: number; count: number } } = {};
  
  // Initialize all possible qualities
  qualities.forEach(q => {
    qualityScores[q.id] = { total: 0, count: 0 };
  });
  
  // Sum up all scores
  members.forEach(member => {
    member.qualities?.forEach(quality => {
      qualityScores[quality.qualityId].total += quality.rating;
      qualityScores[quality.qualityId].count += 1;
    });
  });
  
  // Calculate averages
  return qualities.map(q => ({
    qualityId: q.id,
    rating: qualityScores[q.id].count > 0 
      ? Math.round((qualityScores[q.id].total / qualityScores[q.id].count) * 2) / 2 as any
      : 3,
    motivation: `Team average based on ${qualityScores[q.id].count} member ratings`,
    date: new Date().toISOString().split('T')[0],
  }));
}

export default function TeamScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const team = mockTeams.find(team => team.id === id);
  
  if (!team) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{
            title: 'Team Not Found',
            headerShown: true,
            headerLeft: () => <ChevronLeft color={Colors.textPrimary} />,
            headerStyle: {
              backgroundColor: Colors.white,
            },
            headerTitleStyle: {
              fontFamily: 'Inter-SemiBold',
              fontSize: 18,
            },
          }} 
        />
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Team not found</Text>
        </View>
      </View>
    );
  }
  
  const teamAverages = calculateTeamAverages(team.members);
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: team.name,
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
        <View style={styles.teamHeader}>
          <View style={styles.teamIconContainer}>
            <Users2 size={32} color={Colors.white} />
          </View>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamDescription}>{team.description}</Text>
          <View style={styles.teamMetrics}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{team.members.length}</Text>
              <Text style={styles.metricLabel}>Members</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Performance</Text>
          <View style={styles.chartContainer}>
            <SpiderChart qualities={teamAverages} />
            <Text style={styles.chartDescription}>
              This chart shows the average ratings across all team members for each quality.
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Members</Text>
          
          {team.members.length > 0 ? (
            <View style={styles.membersList}>
              {team.members.map(member => (
                <ProfileCard key={member.id} user={member} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No members in this team yet.
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  teamHeader: {
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
  teamIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  teamDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  teamMetrics: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  metricItem: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.primary,
  },
  metricLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
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
  membersList: {
    marginTop: 8,
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