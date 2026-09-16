
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockJobs } from '@/data/jobs';
import { mockCandidates } from '@/data/candidates';
import { ArrowLeft, MapPin, Briefcase, Users, Sparkles, Edit, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage({ params }) {
  const { id } = params;
  const job = mockJobs.find(j => j.id === id) || mockJobs[0];
  const jobCandidates = mockCandidates.filter(c => c.jobId === job.id);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        <div className="flex items-center gap-4 text-sm text-text-muted mb-2">
          <Link href="/jobs" className="hover:text-blue-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Jobs
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold font-poppins text-text-dark">{job.title}</h1>
              <Badge variant={job.status === 'Active' ? 'success' : 'secondary'}>{job.status}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.department}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Created {job.createdDate}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline"><Edit className="h-4 w-4 mr-2" /> Edit Job</Button>
            <Link href="/resume-analyzer">
              <Button><Sparkles className="h-4 w-4 mr-2" /> Analyze Resumes</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-text-dark mb-1">{job.applicants}</div>
              <div className="text-sm font-medium text-text-muted uppercase tracking-wider">Total Applicants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-blue-600 mb-1">{job.shortlisted}</div>
              <div className="text-sm font-medium text-blue-600/80 uppercase tracking-wider">Shortlisted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-purple-600 mb-1">{job.interviews}</div>
              <div className="text-sm font-medium text-purple-600/80 uppercase tracking-wider">Interviews</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-green-600 mb-1">{job.hired}</div>
              <div className="text-sm font-medium text-green-600/80 uppercase tracking-wider">Hired</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Candidates</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-text-muted uppercase bg-gray-50 border-y border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Candidate</th>
                    <th className="px-6 py-4 font-medium text-center">Match Score</th>
                    <th className="px-6 py-4 font-medium">Experience</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {jobCandidates.length > 0 ? jobCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <Link href={`/candidates/${candidate.id}`} className="font-medium text-text-dark hover:text-blue-600">
                          {candidate.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-700 font-bold border border-green-200">
                          {candidate.matchScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-muted">{candidate.experience}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{candidate.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/candidates/${candidate.id}`}>
                          <Button variant="ghost" size="sm" className="text-blue-600">View</Button>
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-text-muted">
                        No candidates analyzed for this job yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
