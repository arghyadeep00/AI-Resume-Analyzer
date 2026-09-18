'use client';
import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCandidates } from '@/data/candidates';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, X, ChevronRight, Briefcase, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getJobs } from '@/services/jobService';
import { toast } from 'react-toastify';

export default function ResumeAnalyzerPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState("");
  
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        const fetchedJobs = data.jobs || data || [];
        setJobs(fetchedJobs);
        if (fetchedJobs.length > 0) {
          setSelectedJobId(fetchedJobs[0]._id || fetchedJobs[0].id);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch jobs");
      } finally {
        setIsLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const job = jobs.find(j => (j._id || j.id) === selectedJobId);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
  };

  const analyzeResume = () => {
    if (!file) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const steps = [
      "Extracting text from document...",
      "Identifying skills and experience...",
      "Matching against job requirements...",
      "Calculating candidate score..."
    ];

    // Mock analysis process for now as backend doesn't have resume parser
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          // Set mock result (John Doe)
          setResult(mockCandidates[0]);
        }, 800);
      }
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-10">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-text-dark flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            AI Resume Analyzer
          </h1>
          <p className="text-text-muted mt-1">Upload resumes and discover the strongest candidates for your job.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Job Selection */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Target Position</CardTitle>
                <CardDescription>Select the job to match against</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingJobs ? (
                  <div className="flex justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                ) : (
                  <select 
                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                  >
                    {jobs.length === 0 && <option value="">No jobs available</option>}
                    {jobs.map(j => (
                      <option key={j._id || j.id} value={j._id || j.id}>{j.title}</option>
                    ))}
                  </select>
                )}

                {job && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-sm font-semibold mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills?.length > 0 ? job.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                          {skill}
                        </span>
                      )) : <span className="text-xs text-text-muted">None specified</span>}
                    </div>
                    
                    <h4 className="text-sm font-semibold mt-5 mb-2">Experience Level</h4>
                    <div className="flex items-center text-sm text-text-muted">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {job.experienceYears} Years
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Upload & Results */}
          <div className="lg:col-span-2">
            {!result ? (
              <Card className="h-full border-dashed">
                <CardContent className="p-0 h-full flex flex-col justify-center min-h-[400px]">
                  {!isAnalyzing ? (
                    <div 
                      className={`h-full p-8 flex flex-col items-center justify-center text-center transition-colors ${dragActive ? 'bg-blue-50/50' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                        <UploadCloud className="h-10 w-10 text-blue-600" />
                      </div>
                      
                      {!file ? (
                        <>
                          <h3 className="text-lg font-semibold font-poppins mb-2">Drag & Drop Resume Here</h3>
                          <p className="text-text-muted text-sm mb-6 max-w-sm">
                            Supports PDF, ZIP files. You can also upload multiple resumes to batch process.
                          </p>
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            className="hidden" 
                            accept=".pdf,.doc,.docx,.txt,.zip"
                            onChange={handleChange}
                          />
                          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                            Browse Files
                          </Button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-border w-full max-w-sm mb-6">
                            <FileText className="h-8 w-8 text-blue-500 mr-3" />
                            <div className="flex-1 text-left overflow-hidden">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button onClick={clearFile} className="p-1 text-gray-400 hover:text-red-500">
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <Button size="lg" onClick={analyzeResume} className="w-full max-w-sm shadow-md shadow-blue-500/20">
                            <Sparkles className="h-4 w-4 mr-2" /> Analyze Resume
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-12 flex flex-col items-center justify-center text-center h-full">
                      <div className="relative mb-8">
                        <div className="w-24 h-24 border-4 border-blue-100 rounded-full border-t-blue-600 animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold font-poppins mb-6">Analyzing Candidate</h3>
                      
                      <div className="w-full max-w-sm space-y-4 text-left">
                        {[
                          "Extracting text from document...",
                          "Identifying skills and experience...",
                          "Matching against job requirements...",
                          "Calculating candidate score..."
                        ].map((stepText, i) => (
                          <div key={i} className={`flex items-center ${analysisStep > i ? 'text-green-600' : analysisStep === i ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                            {analysisStep > i ? (
                              <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0" />
                            ) : analysisStep === i ? (
                              <div className="h-5 w-5 mr-3 flex-shrink-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                              </div>
                            ) : (
                              <div className="h-5 w-5 mr-3 flex-shrink-0 border-2 border-gray-300 rounded-full"></div>
                            )}
                            <span className="text-sm">{stepText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="overflow-hidden border-green-200 shadow-lg shadow-green-900/5">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-green-100 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="success">Analysis Complete</Badge>
                        <span className="text-sm text-text-muted text-gray-500">Matched against: {job?.title || 'Unknown Job'}</span>
                      </div>
                      <h2 className="text-2xl font-bold font-poppins text-gray-900">{result.name}</h2>
                      <p className="text-gray-600">{result.role}</p>
                    </div>
                    <div className="relative">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-green-100" />
                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * result.matchScore) / 100} className="text-green-500 transition-all duration-1000 ease-out" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold font-poppins text-green-700">{result.matchScore}%</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">AI Recommendation</h3>
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4">
                        <div className="mt-0.5">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-900 mb-1">{result.aiRecommendation}</p>
                          <ul className="text-sm text-blue-800 space-y-1">
                            {result.supportingFactors.map((factor, i) => (
                              <li key={i} className="flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" /> Matching Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {result.skills.map(skill => (
                            <span key={skill} className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1 text-amber-500" /> Missing Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {result.missingSkills.map(skill => (
                            <span key={skill} className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button className="flex-1" asChild>
                        <Link href={`/candidates/${result.id}`}>View Full Profile</Link>
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={clearFile}>
                        Analyze Another
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
