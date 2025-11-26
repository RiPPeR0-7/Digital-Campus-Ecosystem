import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Users, 
  Settings, 
  LogOut,
  Calendar,
  FileText
} from 'lucide-react';

export const PortalSidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case UserRole.TEACHER:
        return [
          { icon: LayoutDashboard, label: 'Dashboard', to: '/portal/dashboard' },
          { icon: BookOpen, label: 'My Courses', to: '/portal/courses' },
          { icon: FileText, label: 'Gradebook', to: '/portal/gradebook' },
          { icon: Calendar, label: 'Schedule', to: '/portal/schedule' },
        ];
      case UserRole.STUDENT:
        return [
          { icon: LayoutDashboard, label: 'Dashboard', to: '/portal/dashboard' },
          { icon: BookOpen, label: 'My Classes', to: '/portal/classes' },
          { icon: GraduationCap, label: 'Grades', to: '/portal/grades' },
          { icon: FileText, label: 'Assignments', to: '/portal/assignments' },
        ];
      case UserRole.SUPER_ADMIN:
        return [
          { icon: LayoutDashboard, label: 'Admin Home', to: '/portal/dashboard' },
          { icon: Users, label: 'User Management', to: '/portal/users' },
          { icon: Settings, label: 'System Settings', to: '/portal/settings' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold tracking-wide text-indigo-400">Campus Portal</h2>
        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{user?.role.replace('_', ' ')}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-6 px-4">
          <img src={user?.avatarUrl} alt={user?.name} className="h-8 w-8 rounded-full bg-gray-700" />
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 w-full transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
