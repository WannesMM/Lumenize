import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { TeamCard } from '@/components/TeamCard';
import { mockTeams } from '@/data/mockData';

export default function TeamsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Teams',
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
        <Text style={styles.headerTitle}>All Teams</Text>
        <Text style={styles.headerSubtitle}>
          Browse through all teams in the organization
        </Text>
        
        <View style={styles.teamsGrid}>
          {mockTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
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
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  teamsGrid: {
    marginBottom: 16,
  },
});