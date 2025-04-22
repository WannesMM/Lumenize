import { useState } from 'react';
import { QualityType, QuestionnaireState, QualityAssessment, RatingLevel } from '@/types';
import { updateUserQualities, currentUser } from '@/data/mockData';

export const useQuestionnaireState = () => {
  const [state, setState] = useState<QuestionnaireState>({
    selectedQualities: [],
    currentQualityIndex: 0,
    assessments: [],
    isSubmitting: false,
    isComplete: false,
  });

  const selectQualities = (qualities: QualityType[]) => {
    setState(prev => ({
      ...prev,
      selectedQualities: qualities,
      currentQualityIndex: 0,
      assessments: qualities.map(qualityId => ({
        qualityId,
        rating: 3 as RatingLevel, // Default rating
        motivation: '',
        date: new Date().toISOString().split('T')[0],
      })),
    }));
  };

  const updateAssessment = (rating: RatingLevel, motivation: string) => {
    setState(prev => {
      const updatedAssessments = [...prev.assessments];
      const currentQuality = prev.selectedQualities[prev.currentQualityIndex];
      
      const assessmentIndex = updatedAssessments.findIndex(
        a => a.qualityId === currentQuality
      );
      
      if (assessmentIndex !== -1) {
        updatedAssessments[assessmentIndex] = {
          ...updatedAssessments[assessmentIndex],
          rating,
          motivation,
        };
      }
      
      return {
        ...prev,
        assessments: updatedAssessments,
      };
    });
  };

  const goToNextQuality = () => {
    setState(prev => {
      const isLastQuality = prev.currentQualityIndex === prev.selectedQualities.length - 1;
      
      return {
        ...prev,
        currentQualityIndex: isLastQuality ? prev.currentQualityIndex : prev.currentQualityIndex + 1,
      };
    });
  };

  const goToPreviousQuality = () => {
    setState(prev => ({
      ...prev,
      currentQualityIndex: Math.max(0, prev.currentQualityIndex - 1),
    }));
  };

  const getCurrentAssessment = (): QualityAssessment | undefined => {
    const currentQuality = state.selectedQualities[state.currentQualityIndex];
    return state.assessments.find(a => a.qualityId === currentQuality);
  };

  const isLastQuality = (): boolean => {
    return state.currentQualityIndex === state.selectedQualities.length - 1;
  };

  const submitQuestionnaire = () => {
    setState(prev => ({ ...prev, isSubmitting: true }));
    
    // In a real app, you would send this to an API
    // For now, we'll update the mock data
    setTimeout(() => {
      // Merge with existing qualities
      const existingQualities = currentUser.qualities || [];
      const updatedQualities = [...existingQualities];
      
      // Update or add new assessments
      state.assessments.forEach(newAssessment => {
        const existingIndex = updatedQualities.findIndex(
          q => q.qualityId === newAssessment.qualityId
        );
        
        if (existingIndex !== -1) {
          updatedQualities[existingIndex] = newAssessment;
        } else {
          updatedQualities.push(newAssessment);
        }
      });
      
      updateUserQualities(currentUser.id, updatedQualities);
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        isComplete: true,
      }));
    }, 1000);
  };

  const resetQuestionnaire = () => {
    setState({
      selectedQualities: [],
      currentQualityIndex: 0,
      assessments: [],
      isSubmitting: false,
      isComplete: false,
    });
  };

  return {
    state,
    selectQualities,
    updateAssessment,
    goToNextQuality,
    goToPreviousQuality,
    getCurrentAssessment,
    isLastQuality,
    submitQuestionnaire,
    resetQuestionnaire,
  };
};