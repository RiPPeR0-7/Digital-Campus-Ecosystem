export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Event' | 'News' | 'Alert';
  date: string;
  imageUrl: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  schedule: string;
  studentsCount: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  maxScore: number;
  description: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content: string; // Text content or file placeholder
  status: 'submitted' | 'graded';
}

export interface Grade {
  studentId: string;
  studentName: string;
  courseId: string;
  assignmentId: string; // Changed from assignment name to ID for better linking
  assignmentName?: string; // Optional for display convenience
  score: number;
  maxScore: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}