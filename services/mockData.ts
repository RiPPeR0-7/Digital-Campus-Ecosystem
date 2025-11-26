import { User, UserRole, NewsItem, Course, Grade, Assignment, Submission } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Connor',
    email: 'admin@campus.edu',
    role: UserRole.SUPER_ADMIN,
    avatarUrl: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: '2',
    name: 'Prof. Alan Grant',
    email: 'teacher@campus.edu',
    role: UserRole.TEACHER,
    avatarUrl: 'https://picsum.photos/id/65/100/100'
  },
  {
    id: '3',
    name: 'Tim Murphy',
    email: 'student@campus.edu',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/id/66/100/100'
  },
  {
    id: 's1',
    name: 'Alice Johnson',
    email: 'alice@campus.edu',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/id/67/100/100'
  },
  {
    id: 's2',
    name: 'Bob Smith',
    email: 'bob@campus.edu',
    role: UserRole.STUDENT,
    avatarUrl: 'https://picsum.photos/id/68/100/100'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'Fall Semester Registration Open',
    summary: 'Registration for the upcoming Fall semester begins next Monday. Ensure your account holds are cleared.',
    category: 'News',
    date: '2023-10-15',
    imageUrl: 'https://picsum.photos/id/20/600/400'
  },
  {
    id: '2',
    title: 'Science Fair 2024',
    summary: 'Join us for the annual Science Fair showcasing innovative projects from our STEM students.',
    category: 'Event',
    date: '2023-11-02',
    imageUrl: 'https://picsum.photos/id/36/600/400'
  },
  {
    id: '3',
    title: 'Campus Maintenance Alert',
    summary: 'The north parking lot will be closed for resurfacing this weekend.',
    category: 'Alert',
    date: '2023-10-20',
    imageUrl: 'https://picsum.photos/id/8/600/400'
  }
];

export const COURSES: Course[] = [
  { id: 'c1', code: 'CS101', name: 'Intro to Computer Science', schedule: 'MWF 10:00 AM', studentsCount: 45 },
  { id: 'c2', code: 'PHY201', name: 'General Physics II', schedule: 'TTh 2:00 PM', studentsCount: 30 },
  { id: 'c3', code: 'MATH300', name: 'Linear Algebra', schedule: 'MWF 1:00 PM', studentsCount: 25 },
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'a1', courseId: 'c1', title: 'Midterm Project', dueDate: '2023-11-15', maxScore: 100, description: 'Build a basic calculator app.' },
  { id: 'a2', courseId: 'c1', title: 'Data Structures Quiz', dueDate: '2023-10-20', maxScore: 50, description: 'Multiple choice quiz on arrays and lists.' },
  { id: 'a3', courseId: 'c1', title: 'Final Exam', dueDate: '2023-12-10', maxScore: 100, description: 'Comprehensive exam covering all topics.' },
];

export const GRADES: Grade[] = [
  { studentId: 's1', studentName: 'Alice Johnson', courseId: 'c1', assignmentId: 'a1', assignmentName: 'Midterm Project', score: 88, maxScore: 100 },
  { studentId: 's2', studentName: 'Bob Smith', courseId: 'c1', assignmentId: 'a1', assignmentName: 'Midterm Project', score: 75, maxScore: 100 },
  { studentId: '3', studentName: 'Tim Murphy', courseId: 'c1', assignmentId: 'a1', assignmentName: 'Midterm Project', score: 95, maxScore: 100 },
  { studentId: '3', studentName: 'Tim Murphy', courseId: 'c1', assignmentId: 'a2', assignmentName: 'Data Structures Quiz', score: 48, maxScore: 50 },
];

export const SUBMISSIONS: Submission[] = [
  { id: 'sub1', assignmentId: 'a1', studentId: '3', submittedAt: '2023-11-14', content: 'Here is my calculator project zip file.', status: 'graded' },
];
