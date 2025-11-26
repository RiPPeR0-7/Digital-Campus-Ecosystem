import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRole } from './types';

// Layouts
import { WebLayout } from './components/web/layout/WebLayout';
import { PortalLayout } from './components/portal/layout/PortalLayout';

// Public Components
import { Hero } from './components/web/Hero';
import { NewsSection } from './components/web/NewsSection';

// Portal Components
import { Login } from './components/portal/Login';
import { TeacherDashboard } from './components/portal/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/portal/dashboards/StudentDashboard';
import { StudentAssignments } from './components/portal/student/StudentAssignments';
import { StudentGrades } from './components/portal/student/StudentGrades';
import { TeacherGradebook } from './components/portal/teacher/TeacherGradebook';

// Shared
import { Button } from './components/shared/Button';

// Role Guard Component
const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/portal/login" />;

  switch (user.role) {
    case UserRole.TEACHER:
      return <TeacherDashboard />;
    case UserRole.STUDENT:
      return <StudentDashboard />;
    case UserRole.SUPER_ADMIN:
      return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Admin Dashboard Placeholder</h1></div>;
    default:
      return <div className="p-8 text-center"><h1 className="text-2xl font-bold">Welcome, {user.name}</h1></div>;
  }
};

const HomePage = () => (
  <>
    <Hero />
    <NewsSection />
    <section className="py-20 bg-indigo-900 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to join our community?</h2>
        <p className="text-indigo-200 mb-8 text-lg">Applications for the next academic year are now open. Secure your spot today.</p>
        <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">Apply Now</Button>
      </div>
    </section>
  </>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<WebLayout />}>
            <Route index element={<HomePage />} />
            <Route path="news" element={<div className="pt-8"><NewsSection /></div>} />
            <Route path="about" element={<div className="p-20 text-center text-gray-500">About Page Placeholder</div>} />
            <Route path="admissions" element={<div className="p-20 text-center text-gray-500">Admissions Page Placeholder</div>} />
          </Route>

          {/* Portal Routes */}
          <Route path="/portal/login" element={<Login />} />
          
          <Route path="/portal" element={<PortalLayout />}>
            <Route index element={<Navigate to="/portal/dashboard" replace />} />
            <Route path="dashboard" element={<RoleBasedDashboard />} />
            
            {/* Student Routes */}
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="grades" element={<StudentGrades />} />
            <Route path="classes" element={<div className="p-8">My Classes Placeholder</div>} />

            {/* Teacher Routes */}
            <Route path="gradebook" element={<TeacherGradebook />} />
            <Route path="courses" element={<div className="p-8">Courses Management Placeholder</div>} />
            
            <Route path="*" element={<div className="p-8">Page under construction</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;