import { User, Team, Company, QualityAssessment } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    position: 'Senior Developer',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    teamId: 'team1',
    qualities: [
      { qualityId: 'leadership', rating: 4, motivation: 'I lead by example and mentor junior developers.', date: '2023-05-15' },
      { qualityId: 'creativity', rating: 5, motivation: 'I regularly propose innovative solutions to complex problems.', date: '2023-05-15' },
      { qualityId: 'teamwork', rating: 3, motivation: 'I collaborate well but sometimes prefer working independently.', date: '2023-05-15' },
    ],
  },
  {
    id: 'user2',
    name: 'Sarah Chen',
    position: 'UX Designer',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    teamId: 'team1',
    qualities: [
      { qualityId: 'creativity', rating: 5, motivation: 'Design thinking is my passion and strength.', date: '2023-05-16' },
      { qualityId: 'communication', rating: 4, motivation: 'I effectively communicate design decisions to stakeholders.', date: '2023-05-16' },
    ],
  },
  {
    id: 'user3',
    name: 'Michael Rodriguez',
    position: 'Project Manager',
    avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    teamId: 'team2',
    qualities: [
      { qualityId: 'leadership', rating: 5, motivation: 'I excel at guiding teams toward project goals.', date: '2023-05-14' },
      { qualityId: 'timeManagement', rating: 4, motivation: 'I consistently deliver projects on schedule.', date: '2023-05-14' },
      { qualityId: 'communication', rating: 5, motivation: 'I maintain clear and consistent communication with all stakeholders.', date: '2023-05-14' },
    ],
  },
  {
    id: 'user4',
    name: 'Jessica Lee',
    position: 'Data Analyst',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    teamId: 'team2',
    qualities: [
      { qualityId: 'problemSolving', rating: 5, motivation: 'I enjoy finding insights in complex data sets.', date: '2023-05-17' },
      { qualityId: 'adaptability', rating: 3, motivation: 'I can adjust to new tools but prefer established methods.', date: '2023-05-17' },
    ],
  },
  {
    id: 'user5',
    name: 'Daniel Smith',
    position: 'Marketing Director',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    teamId: 'team3',
    qualities: [
      { qualityId: 'creativity', rating: 4, motivation: 'I develop innovative marketing campaigns.', date: '2023-05-13' },
      { qualityId: 'leadership', rating: 4, motivation: 'I inspire my team to achieve ambitious marketing goals.', date: '2023-05-13' },
    ],
  },
  {
    id: 'user6',
    name: 'Emily Wilson',
    position: 'Content Writer',
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    teamId: 'team3',
    qualities: [
      { qualityId: 'communication', rating: 5, motivation: 'I excel at crafting clear and compelling messaging.', date: '2023-05-18' },
      { qualityId: 'creativity', rating: 5, motivation: 'I consistently generate fresh and engaging content ideas.', date: '2023-05-18' },
    ],
  },
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: 'team1',
    name: 'Product Development',
    description: 'Responsible for building and enhancing our core product offerings.',
    companyId: 'company1',
    members: mockUsers.filter(user => user.teamId === 'team1'),
  },
  {
    id: 'team2',
    name: 'Data Analytics',
    description: 'Provides insights and data-driven recommendations to guide business decisions.',
    companyId: 'company1',
    members: mockUsers.filter(user => user.teamId === 'team2'),
  },
  {
    id: 'team3',
    name: 'Marketing',
    description: 'Creates and executes strategies to promote our products and services.',
    companyId: 'company1',
    members: mockUsers.filter(user => user.teamId === 'team3'),
  },
];

// Mock Company
export const mockCompany: Company = {
  id: 'company1',
  name: 'Innovatech Solutions',
  teams: mockTeams,
};

// Current User (for demonstration purposes)
export const currentUser: User = mockUsers[0];

// Helper function to update user qualities
export const updateUserQualities = (
  userId: string, 
  newQualities: QualityAssessment[]
): void => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      qualities: newQualities,
    };
  }
};