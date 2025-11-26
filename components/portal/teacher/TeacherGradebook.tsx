import React, { useState } from 'react';
import { GRADES, MOCK_USERS, COURSES, ASSIGNMENTS, SUBMISSIONS } from '../../../services/mockData';
import { UserRole, Grade } from '../../../types';
import { Button } from '../../shared/Button';
import { Input } from '../../shared/Input';
import { Plus, Save, Download, FileText, Check } from 'lucide-react';

export const TeacherGradebook: React.FC = () => {
  const [activeCourseId, setActiveCourseId] = useState(COURSES[0].id);
  const [grades, setGrades] = useState(GRADES);
  const [assignments, setAssignments] = useState(ASSIGNMENTS);
  const [editingCell, setEditingCell] = useState<{sid: string, aid: string} | null>(null);
  const [tempScore, setTempScore] = useState<string>('');
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [newAssignmentMax, setNewAssignmentMax] = useState('100');

  // Filter Data
  const courseAssignments = assignments.filter(a => a.courseId === activeCourseId);
  const students = MOCK_USERS.filter(u => u.role === UserRole.STUDENT); // In real app, filter by enrollment

  const getGrade = (studentId: string, assignmentId: string) => {
    return grades.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
  };

  const getSubmission = (studentId: string, assignmentId: string) => {
    return SUBMISSIONS.find(s => s.studentId === studentId && s.assignmentId === assignmentId);
  };

  const handleScoreUpdate = (studentId: string, assignmentId: string, score: number) => {
    const existingIndex = grades.findIndex(g => g.studentId === studentId && g.assignmentId === assignmentId);
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (existingIndex > -1) {
      const newGrades = [...grades];
      newGrades[existingIndex] = { ...newGrades[existingIndex], score };
      setGrades(newGrades);
    } else if (assignment) {
      const student = students.find(s => s.id === studentId);
      const newGrade: Grade = {
        studentId,
        studentName: student?.name || 'Unknown',
        courseId: activeCourseId,
        assignmentId,
        assignmentName: assignment.title,
        score,
        maxScore: assignment.maxScore
      };
      setGrades([...grades, newGrade]);
    }
    setEditingCell(null);
  };

  const calculateStudentAverage = (studentId: string) => {
    const studentGrades = grades.filter(g => g.studentId === studentId && g.courseId === activeCourseId);
    if (studentGrades.length === 0) return 0;
    
    const totalScore = studentGrades.reduce((acc, curr) => acc + curr.score, 0);
    const totalMax = studentGrades.reduce((acc, curr) => acc + curr.maxScore, 0);
    return totalMax > 0 ? ((totalScore / totalMax) * 100).toFixed(1) : 0;
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `new_a_${Date.now()}`;
    const newAsg = {
      id: newId,
      courseId: activeCourseId,
      title: newAssignmentTitle,
      dueDate: new Date().toISOString().split('T')[0],
      maxScore: parseInt(newAssignmentMax),
      description: 'New assignment'
    };
    setAssignments([...assignments, newAsg]);
    setShowAddAssignment(false);
    setNewAssignmentTitle('');
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gradebook</h1>
          <p className="text-gray-600">Manage student grades and course assignments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setShowAddAssignment(true)}>
            <Plus className="h-4 w-4" /> Add Assignment
          </Button>
        </div>
      </header>

      {/* Course Selector Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {COURSES.map(course => (
            <button
              key={course.id}
              onClick={() => setActiveCourseId(course.id)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeCourseId === course.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {course.code} - {course.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Add Assignment Modal/Form (Inline for simplicity) */}
      {showAddAssignment && (
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 animate-fade-in">
          <h3 className="text-sm font-bold text-indigo-900 mb-3">Add New Assignment</h3>
          <form onSubmit={handleAddAssignment} className="flex gap-4 items-end">
             <Input 
                label="Title" 
                value={newAssignmentTitle} 
                onChange={(e) => setNewAssignmentTitle(e.target.value)} 
                placeholder="e.g., Essay #1"
                required
             />
             <div className="w-32">
                <Input 
                    label="Max Score" 
                    type="number"
                    value={newAssignmentMax} 
                    onChange={(e) => setNewAssignmentMax(e.target.value)}
                    required
                />
             </div>
             <div className="flex gap-2 pb-0.5">
                <Button type="submit" size="md">Save</Button>
                <Button type="button" variant="ghost" onClick={() => setShowAddAssignment(false)}>Cancel</Button>
             </div>
          </form>
        </div>
      )}

      {/* Grade Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 shadow-sm">
                  Student
                </th>
                {courseAssignments.map(assignment => (
                  <th key={assignment.id} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    <div className="flex flex-col items-center">
                      <span>{assignment.title}</span>
                      <span className="text-[10px] text-gray-400 font-normal">Max: {assignment.maxScore}</span>
                    </div>
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-indigo-600 uppercase tracking-wider font-bold bg-indigo-50">
                  Average
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10 shadow-sm">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mr-3">
                        {student.name.charAt(0)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </div>
                  </td>
                  
                  {courseAssignments.map(assignment => {
                    const grade = getGrade(student.id, assignment.id);
                    const submission = getSubmission(student.id, assignment.id);
                    const isEditing = editingCell?.sid === student.id && editingCell?.aid === assignment.id;

                    return (
                      <td key={assignment.id} className="px-6 py-4 whitespace-nowrap text-center p-0 relative group">
                         {isEditing ? (
                           <div className="flex items-center justify-center gap-1">
                             <input
                               type="number"
                               autoFocus
                               className="w-16 px-2 py-1 text-sm border rounded focus:ring-indigo-500 focus:border-indigo-500"
                               value={tempScore}
                               onChange={(e) => setTempScore(e.target.value)}
                               onKeyDown={(e) => {
                                 if (e.key === 'Enter') handleScoreUpdate(student.id, assignment.id, Number(tempScore));
                               }}
                               onBlur={() => handleScoreUpdate(student.id, assignment.id, Number(tempScore))}
                             />
                           </div>
                         ) : (
                           <div 
                             className="w-full h-full min-h-[40px] flex items-center justify-center cursor-pointer hover:bg-gray-100 relative"
                             onClick={() => {
                               setEditingCell({ sid: student.id, aid: assignment.id });
                               setTempScore(grade ? grade.score.toString() : '');
                             }}
                           >
                              <span className={`text-sm font-medium ${!grade ? 'text-gray-300' : 'text-gray-900'}`}>
                                {grade ? grade.score : '-'}
                              </span>
                              
                              {/* Submission Indicator */}
                              {submission && !grade && (
                                <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-green-500" title="Assignment Submitted"></span>
                              )}
                           </div>
                         )}
                         {/* View Submission Hover Action */}
                         {submission && (
                            <div className="absolute top-0 right-0 hidden group-hover:flex">
                                <button className="p-1 text-gray-400 hover:text-indigo-600" title="View Submission">
                                    <FileText className="h-3 w-3" />
                                </button>
                            </div>
                         )}
                      </td>
                    );
                  })}

                  <td className="px-6 py-4 whitespace-nowrap text-center bg-indigo-50/30">
                    <span className="text-sm font-bold text-indigo-700">
                      {calculateStudentAverage(student.id)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};