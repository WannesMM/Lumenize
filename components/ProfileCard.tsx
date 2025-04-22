import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { User } from '@/types';

interface ProfileCardProps {
  user: User;
  showArrow?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  user, 
  showArrow = true 
}) => {
  const router = useRouter();
  
  const navigateToProfile = () => {
    router.push(`/profile/${user.id}`);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={navigateToProfile}
      activeOpacity={0.7}
    >
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.position}>{user.position}</Text>
      </View>
      {showArrow && (
        <ChevronRight color={Colors.gray[400]} size={20} />
      )}
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  position: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
});