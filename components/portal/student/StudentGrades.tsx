import React from 'react';
import { ASSIGNMENTS, COURSES, GRADES } from '../../../services/mockData';
import { useAuth } from '../../../context/AuthContext';
import { TrendingUp, Award } from 'lucide-react';

export const StudentGrades: React.FC = () => {
  const { user } = useAuth();
  
  // Group grades by course
  const studentGrades = GRADES.filter(g => g.studentId === user?.id);
  
  const courseGrades = COURSES.map(course => {
    const gradesForCourse = studentGrades.filter(g => g.courseId === course.id);
    const totalScore = gradesForCourse.reduce((acc, curr) => acc + curr.score, 0);
    const totalMax = gradesForCourse.reduce((acc, curr) => acc + curr.maxScore, 0);
    const average = totalMax > 0 ? (totalScore / totalMax) * 100 : 0;
    
    return {
      course,
      grades: gradesForCourse,
      average: average.toFixed(1)
    };
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Academic Record</h1>
        <p className="text-gray-600">Track your performance across all courses.</p>
      </header>

      <div className="grid gap-8">
        {courseGrades.map(({ course, grades, average }) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 bg-white border border-indigo-200 px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900">{course.name}</h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">{course.schedule}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Current Grade</div>
                <div className={`text-2xl font-bold ${Number(average) >= 90 ? 'text-green-600' : Number(average) >= 80 ? 'text-indigo-600' : 'text-gray-900'}`}>
                  {average}%
                </div>
              </div>
            </div>

            <div className="p-0">
               {grades.length > 0 ? (
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                     <tr>
                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Points</th>
                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {grades.map((grade, idx) => {
                       const percentage = (grade.score / grade.maxScore) * 100;
                       return (
                         <tr key={idx} className="hover:bg-gray-50">
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                             {grade.assignmentName || ASSIGNMENTS.find(a => a.id === grade.assignmentId)?.title}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                             {grade.score}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                             {grade.maxScore}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5">
                               <div 
                                 className={`h-2.5 rounded-full ${percentage >= 90 ? 'bg-green-500' : percentage >= 70 ? 'bg-indigo-500' : 'bg-yellow-500'}`} 
                                 style={{ width: `${percentage}%` }}
                               ></div>
                             </div>
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               ) : (
                 <div className="p-8 text-center text-gray-500">
                   <Award className="h-12 w-12 mx-auto mb-3 opacity-20" />
                   No grades recorded yet.
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};