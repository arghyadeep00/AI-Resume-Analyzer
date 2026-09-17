import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/jobs';
import { mockCandidates } from '@/data/candidates';
import { mockAnalytics } from '@/data/analytics';
import { mockUser } from '@/data/users';
import { Briefcase, Users, FileText, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

function StatCard({ title, value, icon: Icon, trend, trendValue }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex items-baseline space-x-3 mt-4">
          <h2 className="text-3xl font-bold font-poppins">{value}</h2>
          {trend === 'up' ? (
            <span className="flex items-center text-sm font-medium text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {trendValue}
            </span>
          ) : (
            <span className="flex items-center text-sm font-medium text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              {trendValue}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const activeJobs = mockJobs.filter(j => j.status === 'Active').length;
  
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-text-dark">Good morning, {mockUser.name}</h1>
          <p className="text-text-muted mt-1">Here's what's happening with your hiring pipeline today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Jobs" value={activeJobs} icon={Briefcase} trend="up" trendValue="12%" />
          <StatCard title="Total Candidates" value={mockAnalytics.totalApplications.toLocaleString()} icon={Users} trend="up" trendValue="4%" />
          <StatCard title="Resumes Analyzed" value="4,892" icon={FileText} trend="up" trendValue="18%" />
          <StatCard title="Avg Match Score" value={`${mockAnalytics.averageMatchScore}%`} icon={Target} trend="down" trendValue="2%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Candidates</CardTitle>
                <Link href="/candidates" className="text-sm text-blue-600 hover:underline">View all</Link>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-text-muted uppercase bg-gray-50 border-y border-border">
                      <tr>
                        <th className="px-4 py-3 font-medium">Candidate</th>
                        <th className="px-4 py-3 font-medium">Position</th>
                        <th className="px-4 py-3 font-medium text-center">Match</th>
                        <th className="px-4 py-3 font-medium text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCandidates.slice(0, 5).map((candidate) => {
                        const job = mockJobs.find(j => j.id === candidate.jobId);
                        return (
                          <tr key={candidate.id} className="border-b border-border hover:bg-gray-50/50">
                            <td className="px-4 py-4">
                              <Link href={`/candidates/${candidate.id}`} className="font-medium text-text-dark hover:text-blue-600">
                                {candidate.name}
                              </Link>
                              <div className="text-xs text-text-muted mt-1">{candidate.experience} exp</div>
                            </td>
                            <td className="px-4 py-4 text-text-muted">{job?.title || candidate.role}</td>
                            <td className="px-4 py-4 text-center">
                              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-green-500 text-green-700 font-bold bg-green-50 text-xs">
                                {candidate.matchScore}%
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <Badge variant={
                                candidate.status === 'Shortlisted' ? 'success' :
                                candidate.status === 'Interview' ? 'default' : 'secondary'
                              }>
                                {candidate.status}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { label: 'Applied', value: mockAnalytics.totalApplications, color: 'bg-gray-200' },
                    { label: 'AI Screened', value: Math.floor(mockAnalytics.totalApplications * 0.8), color: 'bg-blue-200' },
                    { label: 'Shortlisted', value: Math.floor(mockAnalytics.totalApplications * (mockAnalytics.shortlistRate / 100)), color: 'bg-indigo-300' },
                    { label: 'Interview', value: Math.floor(mockAnalytics.totalApplications * (mockAnalytics.interviewRate / 100)), color: 'bg-purple-400' },
                    { label: 'Hired', value: Math.floor(mockAnalytics.totalApplications * (mockAnalytics.hiringRate / 100)), color: 'bg-green-500' }
                  ].map((stage, i, arr) => (
                    <div key={i} className="relative">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-text-dark">{stage.label}</span>
                        <span className="text-text-muted">{stage.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${stage.color}`} style={{ width: `${(stage.value / arr[0].value) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
