import React, { useState } from 'react';
import { ASSIGNMENTS, COURSES, SUBMISSIONS } from '../../../services/mockData';
import { Button } from '../../shared/Button';
import { Input } from '../../shared/Input';
import { Upload, FileText, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const StudentAssignments: React.FC = () => {
  const { user } = useAuth();
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Mock local state for new submissions to show immediate feedback
  const [localSubmissions, setLocalSubmissions] = useState(SUBMISSIONS);

  // Filter assignments for courses the student is enrolled in (Mock: assume enrolled in all for simplicity)
  const myAssignments = ASSIGNMENTS; 

  const getSubmissionStatus = (assignmentId: string) => {
    return localSubmissions.find(s => s.assignmentId === assignmentId && s.studentId === user?.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignmentId || !user) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSubmission = {
        id: `sub_${Date.now()}`,
        assignmentId: selectedAssignmentId,
        studentId: user.id,
        submittedAt: new Date().toISOString().split('T')[0],
        content: submissionText,
        status: 'submitted' as const
      };
      
      setLocalSubmissions([...localSubmissions, newSubmission]);
      setSubmissionText('');
      setSelectedAssignmentId(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600">View upcoming deadlines and submit your work.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assignment List */}
        <div className="space-y-4">
          {myAssignments.map((assignment) => {
            const submission = getSubmissionStatus(assignment.id);
            const course = COURSES.find(c => c.id === assignment.courseId);
            const isSelected = selectedAssignmentId === assignment.id;

            return (
              <div 
                key={assignment.id} 
                className={`bg-white p-6 rounded-lg shadow-sm border-l-4 transition-all cursor-pointer ${
                  isSelected ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => setSelectedAssignmentId(assignment.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {course?.code}
                  </span>
                  {submission ? (
                    <span className="flex items-center text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full gap-1">
                      <CheckCircle className="h-3 w-3" /> {submission.status === 'graded' ? 'Graded' : 'Submitted'}
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full gap-1">
                      <Clock className="h-3 w-3" /> Due: {assignment.dueDate}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{assignment.description}</p>
                <div className="mt-4 text-xs text-gray-400">Max Score: {assignment.maxScore}</div>
              </div>
            );
          })}
        </div>

        {/* Submission Detail View */}
        <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-6">
          {selectedAssignmentId ? (
            <>
              {(() => {
                const assignment = myAssignments.find(a => a.id === selectedAssignmentId);
                const submission = getSubmissionStatus(selectedAssignmentId);
                
                if (!assignment) return null;

                return (
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h2 className="text-xl font-bold text-gray-900">{assignment.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">Due: {assignment.dueDate} • {assignment.maxScore} Points</p>
                      <p className="mt-4 text-gray-700">{assignment.description}</p>
                    </div>

                    {submission ? (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                          <CheckCircle className="h-5 w-5" />
                          Assignment Submitted
                        </div>
                        <p className="text-sm text-green-700">Submitted on {submission.submittedAt}</p>
                        <div className="mt-3 bg-white p-3 rounded border border-green-100 text-sm text-gray-600">
                          {submission.content}
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Submission Content</label>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 h-32"
                            placeholder="Type your answer here..."
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 mb-2 text-gray-400" />
                          <span className="text-sm font-medium">Click to upload file (Optional)</span>
                          <span className="text-xs mt-1">PDF, DOCX, ZIP up to 10MB</span>
                        </div>

                        <div className="flex justify-end pt-2">
                          <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
                            Submit Assignment
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                );
              })()}
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400">
              <FileText className="h-12 w-12 mb-4 opacity-20" />
              <p>Select an assignment from the list to view details or submit work.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};