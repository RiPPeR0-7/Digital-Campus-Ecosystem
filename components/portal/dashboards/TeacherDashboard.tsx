import React from 'react';
import { COURSES, GRADES } from '../../../services/mockData';
import { Users, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../shared/Button';

export const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Teacher Overview</h1>
        <Button size="sm">Create Assignment</Button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">124</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Classes</p>
              <p className="text-2xl font-bold text-gray-900">3 Today</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-600 mr-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Grading</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course List & Recent Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Courses */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Active Courses</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {COURSES.map((course) => (
              <div key={course.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="text-indigo-600 font-semibold">{course.code}</h4>
                  <p className="text-gray-900 font-medium">{course.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{course.schedule}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.studentsCount} Students
                  </span>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">Recent Submissions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {GRADES.map((grade, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{grade.studentName}</p>
                  <p className="text-xs text-gray-500">{grade.assignmentName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-700">{grade.score}/{grade.maxScore}</span>
                  <button className="text-sm text-indigo-600 hover:text-indigo-900">Edit</button>
                </div>
              </div>
            ))}
            <div className="p-6 text-center">
              <Button variant="ghost" className="text-sm">View Full Gradebook</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};