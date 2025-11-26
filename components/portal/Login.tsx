import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { BookOpen, Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.TEACHER); // Default for demo
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Mock validation
    if (password.length < 3) {
      setError('Invalid credentials');
      setIsSubmitting(false);
      return;
    }

    try {
      const success = await login(email, role);
      if (success) {
        // Redirect to intended destination or dashboard
        const from = (location.state as any)?.from?.pathname || '/portal/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or role selection. Try "teacher@campus.edu" as Teacher.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoFill = (demoRole: UserRole, demoEmail: string) => {
    setRole(demoRole);
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-xl">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => demoFill(UserRole.TEACHER, 'teacher@campus.edu')}>demo as Teacher</span>, <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => demoFill(UserRole.STUDENT, 'student@campus.edu')}>Student</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="grid grid-cols-2 gap-2">
                {[UserRole.TEACHER, UserRole.STUDENT, UserRole.SUPER_ADMIN].map((r) => (
                  <div
                    key={r}
                    onClick={() => setRole(r)}
                    className={`cursor-pointer text-center px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      role === r 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {r === UserRole.SUPER_ADMIN ? 'Admin' : r.charAt(0) + r.slice(1).toLowerCase()}
                  </div>
                ))}
              </div>
            </div>

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="user@campus.edu"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full flex justify-center gap-2" isLoading={isSubmitting}>
              <Lock className="h-4 w-4" />
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
