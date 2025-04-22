export interface User {
  id: string;
  name: string;
  position: string;
  avatarUrl: string;
  teamId: string;
  qualities?: QualityAssessment[];
}

export interface Team {
  id: string;
  name: string;
  description: string;
  companyId: string;
  members: User[];
}

export interface Company {
  id: string;
  name: string;
  teams: Team[];
}

export type QualityType =
  | 'leadership'
  | 'decisionMaking'
  | 'teamwork'
  | 'creativity'
  | 'communication'
  | 'problemSolving'
  | 'adaptability'
  | 'timeManagement';

export interface Quality {
  id: QualityType;
  name: string;
  description: string;
  color: string;
}

export type RatingLevel = 1 | 2 | 3 | 4 | 5;

export interface QualityAssessment {
  qualityId: QualityType;
  rating: RatingLevel;
  motivation: string;
  date: string;
}

export interface QuestionnaireState {
  selectedQualities: QualityType[];
  currentQualityIndex: number;
  assessments: QualityAssessment[];
  isSubmitting: boolean;
  isComplete: boolean;
}