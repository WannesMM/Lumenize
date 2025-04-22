import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { QualitySelection } from '@/components/QualitySelection';
import { QualityRating } from '@/components/QualityRating';
import { useQuestionnaireState } from '@/hooks/useQuestionnaireState';
import { QualityType, RatingLevel } from '@/types';
import { QuestionnaireComplete } from '@/components/QuestionnaireComplete';

export default function QuestionnaireScreen() {
  const router = useRouter();
  const {
    state,
    selectQualities,
    updateAssessment,
    goToNextQuality,
    goToPreviousQuality,
    getCurrentAssessment,
    isLastQuality,
    submitQuestionnaire,
    resetQuestionnaire,
  } = useQuestionnaireState();
  
  const handleSelectQualities = (qualities: QualityType[]) => {
    selectQualities(qualities);
  };
  
  const handleComplete = (rating: RatingLevel, motivation: string) => {
    updateAssessment(rating, motivation);
    goToNextQuality();
  };
  
  const handleSubmit = () => {
    submitQuestionnaire();
  };
  
  const handleFinish = () => {
    resetQuestionnaire();
    router.push('/profile');
  };
  
  const renderContent = () => {
    if (state.isComplete) {
      return <QuestionnaireComplete onFinish={handleFinish} />;
    }
    
    if (state.selectedQualities.length === 0) {
      return <QualitySelection onSelectQualities={handleSelectQualities} />;
    }
    
    const currentQuality = state.selectedQualities[state.currentQualityIndex];
    const currentAssessment = getCurrentAssessment();
    
    return (
      <QualityRating
        qualityId={currentQuality}
        initialAssessment={currentAssessment}
        onComplete={handleComplete}
        onPrevious={goToPreviousQuality}
        isFirstQuality={state.currentQualityIndex === 0}
        isLastQuality={isLastQuality()}
        onSubmit={handleSubmit}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Assessment',
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
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
});