'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Briefcase, Users, Sparkles, Edit, Calendar, Loader2, Building, CheckCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { getJobById } from '@/services/jobService';
import { getAnalyses } from '@/services/analysisService';
import { toast } from 'react-toastify';

export default function JobDetailsPage({ params }) {
  const { id } = params;
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await getJobById(id);
        const actualJob = jobData.job || jobData;
        setJob(actualJob);

        const analyses = await getAnalyses(actualJob._id || actualJob.id);
        setCandidates(analyses);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load job details or candidates');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (!job) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">Job not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        <div className="flex items-center gap-4 text-sm text-text-muted mb-2">
          <Link href="/jobs" className="hover:text-blue-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Jobs
          </Link>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold font-poppins text-text-dark">{job.title}</h1>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5"><Building className="h-4 w-4" /> {job.company || 'Unknown Company'}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.department}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location || 'Not specified'}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> 
                Created {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link href={`/jobs/${job._id || job.id}/edit`}>
              <Button variant="outline"><Edit className="h-4 w-4 mr-2" /> Edit Job</Button>
            </Link>
            <Link href="/resume-analyzer">
              <Button><Sparkles className="h-4 w-4 mr-2" /> Analyze Resumes</Button>
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-text-dark mb-1">{candidates.length}</div>
              <div className="text-sm font-medium text-text-muted uppercase tracking-wider">Total Analyzed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-blue-600 mb-1">
                {candidates.filter(c => c.score >= 80).length}
              </div>
              <div className="text-sm font-medium text-blue-600/80 uppercase tracking-wider">Strong Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-purple-600 mb-1">{job.experienceYears || 0}+</div>
              <div className="text-sm font-medium text-purple-600/80 uppercase tracking-wider">Years Exp Req</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold font-poppins text-green-600 mb-1">{job.employmentType}</div>
              <div className="text-sm font-medium text-green-600/80 uppercase tracking-wider">Type</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-text-dark mb-1">Description</h4>
                  <p className="text-sm text-text-muted whitespace-pre-wrap">{job.description}</p>
                </div>

                {job.parsedData?.requiredSkills?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.parsedData.requiredSkills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {job.parsedData?.preferredSkills?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark mb-2">Preferred Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.parsedData.preferredSkills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {job.parsedData?.technologies?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.parsedData.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                {job.parsedData?.educationRequirements?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark mb-2">Education</h4>
                    <ul className="text-sm text-text-muted list-disc pl-4 space-y-1">
                      {job.parsedData.educationRequirements.map((edu, i) => (
                        <li key={i}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.parsedData?.responsibilities?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark mb-2">Responsibilities</h4>
                    <ul className="text-sm text-text-muted space-y-2">
                      {job.parsedData.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Candidates List */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Analyzed Candidates</CardTitle>
                  <CardDescription>Resumes parsed and matched against this job</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-text-muted uppercase bg-gray-50 border-y border-border">
                      <tr>
                        <th className="px-6 py-4 font-medium">Candidate</th>
                        <th className="px-6 py-4 font-medium text-center">Match Score</th>
                        <th className="px-6 py-4 font-medium">Experience</th>
                        <th className="px-6 py-4 font-medium text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {candidates.length > 0 ? candidates.map((analysis) => {
                        const candidateName = analysis.resumeId?.parsedData?.personal?.name || analysis.resumeId?.originalName || 'Unknown';
                        const experience = analysis.resumeId?.parsedData?.professional?.totalExperienceYears || 0;
                        const score = analysis.score || 0;
                        
                        return (
                          <tr key={analysis._id} className="hover:bg-gray-50/50">
                            <td className="px-6 py-4">
                              <Link href={`/dashboard/results/${analysis._id}`} className="font-medium text-text-dark hover:text-blue-600">
                                {candidateName}
                              </Link>
                              {analysis.resumeId?.parsedData?.personal?.email && (
                                <div className="text-xs text-text-muted">{analysis.resumeId.parsedData.personal.email}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold border ${score >= 80 ? 'bg-green-50 text-green-700 border-green-200' : score >= 60 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                {score}%
                              </span>
                            </td>
                            <td className="px-6 py-4 text-text-muted">{experience} Years</td>
                            <td className="px-6 py-4 text-right">
                              <Link href={`/dashboard/results/${analysis._id}`}>
                                <Button variant="ghost" size="sm" className="text-blue-600">View Match</Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      }) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <Lightbulb className="h-10 w-10 text-gray-300 mb-2" />
                              <h3 className="text-lg font-medium text-text-dark">No candidates yet</h3>
                              <p className="text-text-muted mt-1 max-w-md">
                                You haven't analyzed any resumes against this job yet. Click "Analyze Resumes" to start matching candidates.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
