'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Eye, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { getAnalyses } from '@/services/analysisService';
import { toast } from 'react-toastify';

function getScoreColor(score) {
  if (score >= 80) return 'border-green-500 text-green-700 bg-green-50';
  if (score >= 60) return 'border-blue-500 text-blue-700 bg-blue-50';
  return 'border-yellow-500 text-yellow-700 bg-yellow-50';
}

export default function CandidatesPage() {
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const data = await getAnalyses();
        setAnalyses(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load candidates');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalyses();
  }, []);

  const filtered = analyses.filter((a) => {
    const name = a.resumeId?.parsedData?.personal?.name || a.resumeId?.originalName || '';
    const job = a.jobId?.title || '';
    const q = search.toLowerCase();
    return name.toLowerCase().includes(q) || job.toLowerCase().includes(q);
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-poppins text-text-dark">Candidates</h1>
            <p className="text-text-muted mt-1">All analyzed candidates and their match results.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                placeholder="Search candidates or jobs..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-text-muted">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="text-sm">Loading candidates...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 text-text-muted">
                <Users className="h-12 w-12 text-gray-300" />
                <p className="text-sm font-medium">
                  {search ? 'No candidates match your search.' : 'No candidates yet. Analyze a resume to get started.'}
                </p>
                {!search && (
                  <Link href="/resume-analyzer">
                    <Button size="sm" className="mt-2">Analyze a Resume</Button>
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-text-muted uppercase bg-gray-50 border-b border-border">
                      <tr>
                        <th className="px-6 py-4 font-medium">Candidate</th>
                        <th className="px-6 py-4 font-medium">Position</th>
                        <th className="px-6 py-4 font-medium text-center">Match</th>
                        <th className="px-6 py-4 font-medium">Experience</th>
                        <th className="px-6 py-4 font-medium">Skills</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((analysis) => {
                        const name =
                          analysis.resumeId?.parsedData?.personal?.name ||
                          (analysis.resumeId?.originalName || 'Unknown').replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
                        const email = analysis.resumeId?.parsedData?.personal?.email || '';
                        const expYears = analysis.experienceMatch?.candidateYears;
                        return (
                          <tr key={analysis._id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold border border-blue-200 uppercase">
                                  {name.charAt(0)}
                                </div>
                                <div>
                                  <Link
                                    href={`/candidates/${analysis._id}`}
                                    className="font-medium text-text-dark hover:text-blue-600 block"
                                  >
                                    {name}
                                  </Link>
                                  {email && <span className="text-xs text-text-muted">{email}</span>}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-text-dark font-medium">{analysis.jobId?.title || '—'}</div>
                              <div className="text-xs text-text-muted">{analysis.jobId?.department || ''}</div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold text-sm ${getScoreColor(analysis.score)}`}>
                                {analysis.score}%
                              </div>
                            </td>
                            <td className="px-6 py-4 text-text-muted">
                              {expYears != null ? `${expYears} yr${expYears !== 1 ? 's' : ''}` : '—'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1 max-w-[180px]">
                                {(analysis.matchedSkills || []).slice(0, 3).map((skill) => (
                                  <span key={skill} className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                                    {skill}
                                  </span>
                                ))}
                                {(analysis.matchedSkills || []).length > 3 && (
                                  <span className="text-xs text-text-muted">+{analysis.matchedSkills.length - 3} more</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link href={`/candidates/${analysis._id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-border flex justify-between items-center text-sm text-text-muted">
                  <span>Showing {filtered.length} of {analyses.length} candidates</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
