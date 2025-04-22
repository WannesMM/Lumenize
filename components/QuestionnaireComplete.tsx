import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, Gauge } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface QuestionnaireCompleteProps {
  onFinish: () => void;
}

export const QuestionnaireComplete: React.FC<QuestionnaireCompleteProps> = ({
  onFinish,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <Check size={48} color={Colors.white} strokeWidth={3} />
      </View>
      
      <Text style={styles.title}>Assessment Complete!</Text>
      <Text style={styles.message}>
        Thank you for completing your self-assessment. Your responses have been
        saved and will help provide insights into your skills and areas of strength.
      </Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What's Next?</Text>
        <Text style={styles.cardText}>
          View your profile to see your skills visualized in a spider chart.
          You can also compare your skills with team members and identify
          areas for growth.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.viewProfileButton}
        onPress={onFinish}
      >
        <Gauge size={20} color={Colors.white} />
        <Text style={styles.viewProfileText}>View My Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.backgroundPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  cardText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
  },
  viewProfileText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
    marginLeft: 8,
  },
});