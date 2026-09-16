

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCandidates } from '@/data/candidates';
import { mockJobs } from '@/data/jobs';
import { Search, Filter, MoreHorizontal, Download, Eye } from 'lucide-react';
import Link from 'next/link';

export default function CandidatesPage() {
  

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-poppins text-text-dark">Candidates</h1>
            <p className="text-text-muted mt-1">Manage and track applicant progress.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input 
                placeholder="Search candidates..." 
                className="pl-9"
                defaultValue=""
                
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-muted uppercase bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Candidate</th>
                    <th className="px-6 py-4 font-medium">Position</th>
                    <th className="px-6 py-4 font-medium text-center">Match</th>
                    <th className="px-6 py-4 font-medium">Experience</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockCandidates.map((candidate) => {
                    const job = mockJobs.find(j => j.id === candidate.jobId);
                    return (
                      <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold border border-blue-200">
                              {candidate.name.charAt(0)}
                            </div>
                            <div>
                              <Link href={`/candidates/${candidate.id}`} className="font-medium text-text-dark hover:text-blue-600 block">
                                {candidate.name}
                              </Link>
                              <span className="text-xs text-text-muted">{candidate.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-text-dark font-medium">{job?.title || candidate.role}</div>
                          <div className="text-xs text-text-muted">Applied: {candidate.appliedDate}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold text-sm
                            ${candidate.matchScore >= 85 ? 'border-green-500 text-green-700 bg-green-50' : 
                              candidate.matchScore >= 75 ? 'border-blue-500 text-blue-700 bg-blue-50' : 
                              'border-yellow-500 text-yellow-700 bg-yellow-50'}
                          `}>
                            {candidate.matchScore}%
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-muted">
                          {candidate.experience}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={
                            candidate.status === 'Shortlisted' ? 'success' :
                            candidate.status === 'Interview' ? 'default' : 'secondary'
                          }>
                            {candidate.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/candidates/${candidate.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-dark">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-text-dark">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border flex justify-between items-center text-sm text-text-muted">
              <span>Showing {mockCandidates.length} candidates</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
