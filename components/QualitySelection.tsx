import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { qualities } from '@/data/qualities';
import { QualityType } from '@/types';

interface QualitySelectionProps {
  onSelectQualities: (selectedQualityIds: QualityType[]) => void;
}

export const QualitySelection: React.FC<QualitySelectionProps> = ({
  onSelectQualities,
}) => {
  const [selectedIds, setSelectedIds] = useState<QualityType[]>([]);

  const toggleQuality = (qualityId: QualityType) => {
    setSelectedIds(prev => {
      if (prev.includes(qualityId)) {
        return prev.filter(id => id !== qualityId);
      } else {
        return [...prev, qualityId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedIds.length > 0) {
      onSelectQualities(selectedIds);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Qualities to Assess</Text>
      <Text style={styles.subtitle}>
        Choose one or more qualities that you want to evaluate
      </Text>
      
      <ScrollView
        style={styles.qualitiesContainer}
        showsVerticalScrollIndicator={false}
      >
        {qualities.map(quality => {
          const isSelected = selectedIds.includes(quality.id);
          return (
            <TouchableOpacity
              key={quality.id}
              style={[
                styles.qualityCard,
                isSelected && { borderColor: quality.color },
              ]}
              onPress={() => toggleQuality(quality.id)}
              activeOpacity={0.7}
            >
              <View style={styles.qualityInfo}>
                <Text style={styles.qualityName}>{quality.name}</Text>
                <Text style={styles.qualityDescription} numberOfLines={2}>
                  {quality.description}
                </Text>
              </View>
              <View
                style={[
                  styles.checkbox,
                  isSelected && { backgroundColor: quality.color, borderColor: quality.color },
                ]}
              >
                {isSelected && <Check color={Colors.white} size={16} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedIds.length === 0 && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={selectedIds.length === 0}
        activeOpacity={0.7}
      >
        <Text style={styles.continueButtonText}>
          Continue with {selectedIds.length} selected
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  qualitiesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  qualityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  qualityInfo: {
    flex: 1,
    marginRight: 16,
  },
  qualityName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  qualityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray[300],
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
});