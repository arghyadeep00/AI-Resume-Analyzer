
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockCandidates } from '@/data/candidates';
import { mockJobs } from '@/data/jobs';
import { Mail, Phone, MapPin, Download, CheckCircle2, AlertCircle, Sparkles, ChevronRight, Briefcase, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function CandidateDetailsPage({ params }) {
  const { id } = params;
  const candidate = mockCandidates.find(c => c.id === id) || mockCandidates[0];
  const job = mockJobs.find(j => j.id === candidate.jobId) || mockJobs[0];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-text-muted">
          <Link href="/candidates" className="hover:text-blue-600">Candidates</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-text-dark font-medium">{candidate.name}</span>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-3xl border border-blue-200">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-poppins text-text-dark">{candidate.name}</h1>
              <p className="text-lg text-text-muted mb-2">{candidate.role}</p>
              <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                <span className="flex items-center"><Mail className="h-4 w-4 mr-1.5" /> {candidate.email}</span>
                <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1.5" /> {candidate.experience} experience</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1 text-sm bg-gray-50">{candidate.status}</Badge>
              <div className="flex items-center bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm font-bold">
                <Sparkles className="h-4 w-4 mr-1.5" />
                {candidate.matchScore}% Match
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Resume</Button>
              <Button>Move to Interview</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">{candidate.aiRecommendation}</h4>
                      <p className="text-blue-800 text-sm leading-relaxed">{candidate.resumeSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> Strong Matches
                    </h4>
                    <ul className="space-y-2 text-sm text-text-dark">
                      {candidate.supportingFactors.map((factor, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-amber-500" /> Potential Concerns
                    </h4>
                    <ul className="space-y-2 text-sm text-text-dark">
                      {candidate.concerns.map((concern, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0"></span>
                          {concern}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:ml-2 before:h-full before:w-0.5 before:bg-border">
                  {candidate.experienceDetails.map((exp, i) => (
                    <div key={i} className="relative flex items-center gap-6">
                      <div className="h-5 w-5 rounded-full border-4 border-white bg-blue-500 shadow z-10" />
                      <div className="flex-1 bg-gray-50 border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-text-dark">{exp.role}</h4>
                          <span className="text-xs font-medium text-text-muted bg-white px-2 py-1 rounded border border-border">{exp.duration}</span>
                        </div>
                        <p className="text-sm text-text-muted">{exp.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Matched Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {candidate.missingSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Missing Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.missingSkills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-500 border border-gray-200 rounded-md text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">{candidate.education.split(',')[0]}</p>
                    <p className="text-xs text-text-muted mt-1">{candidate.education.split(',')[1]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.timeline.map((step, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-text-dark">{step.status}</span>
                      </div>
                      <span className="text-text-muted text-xs">{step.date}</span>
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
