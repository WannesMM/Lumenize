import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { QualityType, RatingLevel, QualityAssessment } from '@/types';
import { getQualityById, getRatingLabel } from '@/data/qualities';

interface QualityRatingProps {
  qualityId: QualityType;
  initialAssessment?: QualityAssessment;
  onComplete: (rating: RatingLevel, motivation: string) => void;
  onPrevious: () => void;
  isFirstQuality: boolean;
  isLastQuality: boolean;
  onSubmit: () => void;
}

export const QualityRating: React.FC<QualityRatingProps> = ({
  qualityId,
  initialAssessment,
  onComplete,
  onPrevious,
  isFirstQuality,
  isLastQuality,
  onSubmit,
}) => {
  const [rating, setRating] = useState<RatingLevel>(
    initialAssessment?.rating || 3 as RatingLevel
  );
  const [motivation, setMotivation] = useState(
    initialAssessment?.motivation || ''
  );
  
  const quality = getQualityById(qualityId);
  
  useEffect(() => {
    // Update state when initialAssessment changes
    if (initialAssessment) {
      setRating(initialAssessment.rating);
      setMotivation(initialAssessment.motivation);
    }
  }, [initialAssessment, qualityId]);
  
  const handleSubmit = () => {
    if (isLastQuality) {
      onComplete(rating, motivation);
      onSubmit();
    } else {
      onComplete(rating, motivation);
    }
  };
  
  const isSubmitDisabled = motivation.trim().length < 10;
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { backgroundColor: quality?.color }]}>
        <Text style={styles.qualityName}>{quality?.name}</Text>
        <Text style={styles.qualityDescription}>{quality?.description}</Text>
      </View>

            <View style={styles.section}>
        <Text style={styles.sectionTitle}>How can you leverage this skill to elevate your team’s performance?</Text>
        <TextInput
          style={styles.motivationInput}
          placeholder="Briefly describe..."
          placeholderTextColor={Colors.gray[400]}
          value={motivation}
          onChangeText={setMotivation}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Text style={styles.characterCount}>
          {motivation.length} characters (minimum 10)
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How would you rate this strength?</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.ratingOption}
              onPress={() => setRating(value as RatingLevel)}
            >
              <View style={[
                styles.star,
                rating >= value && { backgroundColor: quality?.color },
              ]}>
                <Star
                  size={24}
                  color={rating >= value ? Colors.white : Colors.gray[300]}
                  fill={rating >= value ? Colors.white : 'none'}
                />
              </View>
              <Text style={[
                styles.ratingLabel,
                rating === value && { color: quality?.color, fontFamily: 'Inter-SemiBold' },
              ]}>
                {getRatingLabel(value)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      
      <View style={styles.buttonsContainer}>
        {!isFirstQuality && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onPrevious}
          >
            <ChevronLeft size={20} color={Colors.textPrimary} />
            <Text style={styles.backButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[
            styles.nextButton,
            isSubmitDisabled && styles.disabledButton,
            isFirstQuality && styles.fullWidthButton,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuality ? 'Submit Assessment' : 'Next Quality'}
          </Text>
          {!isLastQuality && <ChevronRight size={20} color={Colors.white} />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  content: {
    padding: 16,
  },
  header: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  qualityName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.white,
    marginBottom: 8,
  },
  qualityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.white,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  ratingOption: {
    alignItems: 'center',
    width: '20%',
  },
  star: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  motivationInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.textPrimary,
    minHeight: 120,
  },
  characterCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'right',
    marginBottom: 150,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.gray[100],
    borderRadius: 12,
    flex: 0.48,
    justifyContent: 'center',
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flex: 0.48,
    justifyContent: 'center',
  },
  fullWidthButton: {
    flex: 1,
  },
  disabledButton: {
    backgroundColor: Colors.gray[300],
  },
  nextButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.white,
    marginRight: 8,
  },
});