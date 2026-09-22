'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, FileText, Target, ArrowUpRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getJobs } from '@/services/jobService';
import { getAnalyses } from '@/services/analysisService';
import { toast } from 'react-toastify';

function StatCard({ title, value, icon: Icon, isLoading }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex items-baseline space-x-3 mt-4">
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
          ) : (
            <h2 className="text-3xl font-bold font-poppins">{value}</h2>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getScoreColor(score) {
  if (score >= 80) return 'border-green-500 text-green-700 bg-green-50';
  if (score >= 60) return 'border-blue-500 text-blue-700 bg-blue-50';
  return 'border-yellow-500 text-yellow-700 bg-yellow-50';
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsData, analysesData] = await Promise.all([
          getJobs(),
          getAnalyses(),
        ]);
        setJobs(Array.isArray(jobsData) ? jobsData : jobsData.jobs || []);
        setAnalyses(analysesData || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const avgScore = analyses.length
    ? Math.round(analyses.reduce((sum, a) => sum + (a.score || 0), 0) / analyses.length)
    : 0;

  const recentAnalyses = analyses.slice(0, 5);

  const pipeline = [
    { label: 'Jobs Created', value: jobs.length, color: 'bg-gray-300' },
    { label: 'Resumes Analyzed', value: analyses.length, color: 'bg-blue-300' },
    {
      label: 'High Match (≥80%)',
      value: analyses.filter((a) => a.score >= 80).length,
      color: 'bg-green-400',
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-text-dark">Dashboard</h1>
          <p className="text-text-muted mt-1">Here's what's happening with your hiring pipeline.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Jobs" value={jobs.length} icon={Briefcase} isLoading={isLoading} />
          <StatCard title="Total Candidates" value={analyses.length} icon={Users} isLoading={isLoading} />
          <StatCard title="Resumes Analyzed" value={analyses.length} icon={FileText} isLoading={isLoading} />
          <StatCard title="Avg Match Score" value={`${avgScore}%`} icon={Target} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Candidates */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Candidates</CardTitle>
                <Link href="/candidates" className="text-sm text-blue-600 hover:underline">View all</Link>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                  </div>
                ) : recentAnalyses.length === 0 ? (
                  <div className="text-center py-10 text-text-muted text-sm">
                    No candidates yet.{' '}
                    <Link href="/resume-analyzer" className="text-blue-600 hover:underline">
                      Analyze a resume
                    </Link>{' '}
                    to get started.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-text-muted uppercase bg-gray-50 border-y border-border">
                        <tr>
                          <th className="px-4 py-3 font-medium">Candidate</th>
                          <th className="px-4 py-3 font-medium">Position</th>
                          <th className="px-4 py-3 font-medium text-center">Match</th>
                          <th className="px-4 py-3 font-medium text-center">Breakdown</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAnalyses.map((analysis) => {
                          const name =
                            analysis.resumeId?.parsedData?.personal?.name ||
                            (analysis.resumeId?.originalName || 'Unknown')
                              .replace(/\.[^/.]+$/, '')
                              .replace(/[_-]/g, ' ');
                          return (
                            <tr key={analysis._id} className="border-b border-border hover:bg-gray-50/50">
                              <td className="px-4 py-4">
                                <Link
                                  href={`/candidates/${analysis._id}`}
                                  className="font-medium text-text-dark hover:text-blue-600"
                                >
                                  {name}
                                </Link>
                                <div className="text-xs text-text-muted mt-0.5">
                                  {analysis.experienceMatch?.candidateYears != null
                                    ? `${analysis.experienceMatch.candidateYears} yrs exp`
                                    : ''}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-text-muted">
                                {analysis.jobId?.title || '—'}
                              </td>
                              <td className="px-4 py-4 text-center">
                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-xs ${getScoreColor(analysis.score)}`}>
                                  {analysis.score}%
                                </div>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <Link href={`/candidates/${analysis._id}`}>
                                  <span className="text-blue-600 hover:underline text-xs">View →</span>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Hiring Pipeline</CardTitle></CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pipeline.map((stage, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-text-dark">{stage.label}</span>
                          <span className="text-text-muted">{stage.value}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${stage.color}`}
                            style={{
                              width: pipeline[0].value > 0
                                ? `${(stage.value / pipeline[0].value) * 100}%`
                                : '0%',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Link href="/jobs/new">
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-blue-50 hover:border-blue-200 text-sm font-medium text-text-dark transition-colors flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-600" /> Post a New Job
                  </button>
                </Link>
                <Link href="/resume-analyzer">
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-blue-50 hover:border-blue-200 text-sm font-medium text-text-dark transition-colors flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" /> Analyze a Resume
                  </button>
                </Link>
                <Link href="/candidates">
                  <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-blue-50 hover:border-blue-200 text-sm font-medium text-text-dark transition-colors flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" /> View All Candidates
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
