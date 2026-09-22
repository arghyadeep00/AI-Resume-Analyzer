'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Mail, Phone, MapPin, CheckCircle2, AlertCircle,
  Sparkles, ChevronRight, Briefcase, GraduationCap, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { getAnalysisById } from '@/services/analysisService';
import { toast } from 'react-toastify';

function getScoreColor(score) {
  if (score >= 80) return 'text-green-700 bg-green-50 border-green-200';
  if (score >= 60) return 'text-blue-700 bg-blue-50 border-blue-200';
  return 'text-yellow-700 bg-yellow-50 border-yellow-200';
}

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const data = await getAnalysisById(id);
        setAnalysis(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load candidate analysis');
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-3 text-text-muted">
          <AlertCircle className="h-12 w-12 text-gray-300" />
          <p>Analysis not found.</p>
          <Link href="/candidates"><Button variant="outline" size="sm">Back to Candidates</Button></Link>
        </div>
      </DashboardLayout>
    );
  }

  const resume = analysis.resumeId;
  const job = analysis.jobId;
  const personal = resume?.parsedData?.personal || {};
  const experience = resume?.parsedData?.experience || [];
  const education = resume?.parsedData?.education || [];
  const candidateName =
    personal.name ||
    (resume?.originalName || 'Unknown').replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-text-muted">
          <Link href="/candidates" className="hover:text-blue-600">Candidates</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-text-dark font-medium">{candidateName}</span>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-3xl border border-blue-200 uppercase">
              {candidateName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-poppins text-text-dark">{candidateName}</h1>
              <p className="text-lg text-text-muted mb-2">{job?.title || 'Applicant'}</p>
              <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                {personal.email && (
                  <span className="flex items-center"><Mail className="h-4 w-4 mr-1.5" />{personal.email}</span>
                )}
                {personal.phone && (
                  <span className="flex items-center"><Phone className="h-4 w-4 mr-1.5" />{personal.phone}</span>
                )}
                {personal.location && (
                  <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" />{personal.location}</span>
                )}
                {analysis.experienceMatch?.candidateYears != null && (
                  <span className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1.5" />
                    {analysis.experienceMatch.candidateYears} yrs experience
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
            <div className="flex items-center bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm font-bold">
              <Sparkles className="h-4 w-4 mr-1.5" />
              {analysis.score}% Match
            </div>
            <div className="flex gap-2">
              <Link href="/candidates">
                <Button variant="outline">Back to List</Button>
              </Link>
              <Link href="/resume-analyzer">
                <Button>Analyze Another</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Analysis Summary */}
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-blue-900 text-sm leading-relaxed">
                      {analysis.aiAnalysis?.summary || 'No AI summary available.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> Strong Matches
                    </h4>
                    <ul className="space-y-2 text-sm text-text-dark">
                      {(analysis.aiAnalysis?.strengths || []).map((s, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                      {(analysis.aiAnalysis?.strengths || []).length === 0 && (
                        <li className="text-text-muted italic">No strengths recorded</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-amber-500" /> Concerns
                    </h4>
                    <ul className="space-y-2 text-sm text-text-dark">
                      {(analysis.aiAnalysis?.weaknesses || []).map((w, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0" />
                          {w}
                        </li>
                      ))}
                      {(analysis.aiAnalysis?.weaknesses || []).length === 0 && (
                        <li className="text-text-muted italic">No concerns identified</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Recommendations */}
                {(analysis.aiAnalysis?.recommendations || []).length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-semibold mb-2 text-text-dark">Recruiter Recommendations</h4>
                    <ul className="space-y-1 text-sm text-text-muted">
                      {analysis.aiAnalysis.recommendations.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Skills Match', key: 'skills', weight: '40%' },
                    { label: 'Experience Match', key: 'experience', weight: '25%' },
                    { label: 'Responsibilities Match', key: 'responsibilities', weight: '15%' },
                    { label: 'Education Match', key: 'education', weight: '10%' },
                    { label: 'Semantic Similarity', key: 'semantic', weight: '10%' },
                  ].map(({ label, key, weight }) => {
                    const val = analysis.breakdown?.[key] ?? 0;
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-text-dark">{label} <span className="text-text-muted font-normal text-xs">({weight})</span></span>
                          <span className="font-bold text-text-dark">{val}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${val >= 80 ? 'bg-green-500' : val >= 60 ? 'bg-blue-500' : 'bg-yellow-400'}`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            {experience.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-border">
                    {experience.map((exp, i) => (
                      <div key={i} className="relative flex items-start gap-6">
                        <div className="h-5 w-5 rounded-full border-4 border-white bg-blue-500 shadow z-10 mt-1 flex-shrink-0" />
                        <div className="flex-1 bg-gray-50 border border-border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-text-dark">{exp.position}</h4>
                            <span className="text-xs font-medium text-text-muted bg-white px-2 py-1 rounded border border-border whitespace-nowrap ml-2">
                              {exp.startDate} — {exp.endDate || 'Present'}
                            </span>
                          </div>
                          <p className="text-sm text-text-muted mb-2">{exp.company}</p>
                          {exp.description && (
                            <p className="text-sm text-text-dark/80 leading-relaxed">{exp.description}</p>
                          )}
                          {(exp.technologies || []).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {exp.technologies.map((t) => (
                                <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            <Card>
              <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
              <CardContent>
                {(analysis.matchedSkills || []).length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Matched Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.matchedSkills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-xs font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {(analysis.missingSkills || []).length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Missing Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingSkills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-500 border border-gray-200 rounded-md text-xs font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {(analysis.matchedSkills || []).length === 0 && (analysis.missingSkills || []).length === 0 && (
                  <p className="text-sm text-text-muted italic">No skill data available.</p>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            {education.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Education</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-dark">{edu.degree}</p>
                        <p className="text-xs text-text-muted mt-0.5">{edu.institution}{edu.year ? ` · ${edu.year}` : ''}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Job Info */}
            {job && (
              <Card>
                <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm text-text-muted">
                  <div className="flex justify-between">
                    <span>Position</span>
                    <span className="font-medium text-text-dark">{job.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Department</span>
                    <span className="font-medium text-text-dark">{job.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type</span>
                    <span className="font-medium text-text-dark">{job.employmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Exp.</span>
                    <span className="font-medium text-text-dark">{job.experienceYears} yrs</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
