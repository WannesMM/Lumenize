import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Users, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Team } from '@/types';

interface TeamCardProps {
  team: Team;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const router = useRouter();
  
  const navigateToTeam = () => {
    router.push(`/team/${team.id}`);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={navigateToTeam}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Users size={24} color={Colors.white} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{team.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {team.description}
        </Text>
        <Text style={styles.memberCount}>
          {team.members.length} {team.members.length === 1 ? 'member' : 'members'}
        </Text>
      </View>
      <ChevronRight color={Colors.gray[400]} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  memberCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.primary,
  },
});