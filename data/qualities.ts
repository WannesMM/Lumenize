import { Quality } from '@/types';
import { Colors } from '@/constants/Colors';

export const qualities: Quality[] = [
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Ability to guide, inspire, and influence others towards shared goals.',
    color: Colors.qualities.leadership,
  },
  {
    id: 'decisionMaking',
    name: 'Decision Making',
    description: 'Ability to make timely, well-informed choices that drive positive outcomes.',
    color: Colors.qualities.decisionMaking,
  },
  {
    id: 'teamwork',
    name: 'Teamwork',
    description: 'Ability to collaborate effectively with others to achieve common objectives.',
    color: Colors.qualities.teamwork,
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'Ability to generate innovative ideas and unique solutions to problems.',
    color: Colors.qualities.creativity,
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Ability to exchange information clearly and effectively with others.',
    color: Colors.qualities.communication,
  },
  {
    id: 'problemSolving',
    name: 'Problem Solving',
    description: 'Ability to identify issues and develop effective solutions.',
    color: Colors.qualities.problemSolving,
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    description: 'Ability to adjust to new conditions and respond positively to change.',
    color: Colors.qualities.adaptability,
  },
  {
    id: 'timeManagement',
    name: 'Time Management',
    description: 'Ability to prioritize tasks and use time efficiently.',
    color: Colors.qualities.timeManagement,
  },
];

export const getQualityById = (id: string): Quality | undefined => {
  return qualities.find(quality => quality.id === id);
};

export const getRatingLabel = (rating: number): string => {
  switch (rating) {
    case 1: return 'Developing';
    case 2: return 'Adequate';
    case 3: return 'Proficient';
    case 4: return 'Strong';
    case 5: return 'Excellent';
    default: return 'Not Rated';
  }
};