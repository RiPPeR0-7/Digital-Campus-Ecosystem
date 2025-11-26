import React from 'react';
import { COURSES, GRADES } from '../../../services/mockData';
import { Book, CalendarCheck, TrendingUp } from 'lucide-react';
import { Button } from '../../shared/Button';

export const StudentDashboard: React.FC = () => {
  // Filter grades for the mock student
  const myGrades = GRADES.filter(g => g.studentId === '3'); // Assuming current user is ID 3

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Tim!</h1>
        <p className="text-gray-600">You have 2 upcoming assignments due this week.</p>
      </header>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 mb-1">Current GPA</p>
              <h2 className="text-4xl font-bold">3.85</h2>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-sm text-indigo-100">Top 5% of your class</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Next Class</p>
                   <h3 className="text-xl font-bold text-gray-900 mt-1">Intro to Computer Science</h3>
                   <p className="text-indigo-600 text-sm">10:00 AM - Room 304</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <CalendarCheck className="h-6 w-6" />
                </div>
            </div>
            <Button size="sm" variant="outline" className="mt-4 w-full">View Schedule</Button>
        </div>

         <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Library Status</p>
                   <h3 className="text-xl font-bold text-gray-900 mt-1">No Items Overdue</h3>
                   <p className="text-green-600 text-sm">Account Clear</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <Book className="h-6 w-6" />
                </div>
            </div>
            <Button size="sm" variant="outline" className="mt-4 w-full">Search Catalog</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">My Courses</h3>
          </div>
          <div className="p-6 grid gap-4 sm:grid-cols-2">
            {COURSES.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{course.code}</span>
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{course.schedule}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    <span className="text-gray-600">Attendance: 95%</span>
                    <span className="font-bold text-green-600">A-</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Recent Grades</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {myGrades.length > 0 ? myGrades.map((grade, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between mb-1">
                            <span className="font-medium text-gray-900">{grade.assignmentName}</span>
                            <span className="font-bold text-gray-900">{grade.score}/{grade.maxScore}</span>
                        </div>
                        <p className="text-xs text-gray-500">Intro to Computer Science</p>
                    </div>
                )) : (
                    <p className="p-4 text-gray-500 text-sm">No recent grades.</p>
                )}
            </div>
            <div className="p-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" className="w-full">View Transcript</Button>
            </div>
        </div>
      </div>
    </div>
  );
};