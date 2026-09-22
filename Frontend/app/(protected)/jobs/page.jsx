'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, MapPin, Briefcase, Users, Calendar, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getJobs } from '@/services/jobService';
import { toast } from 'react-toastify';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs || data || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch jobs');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold font-poppins text-text-dark">Job Positions</h1>
            <p className="text-text-muted mt-1">Manage your active and past job listings.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input 
                placeholder="Search jobs..." 
                className="pl-9"
                defaultValue=""
              />
            </div>
            <Link href="/jobs/new">
              <Button className="whitespace-nowrap"><Plus className="h-4 w-4 mr-2" /> Create Job</Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <Card key={job._id || job.id} className="hover:shadow-md transition-shadow group flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                      <Link href={`/jobs/${job._id || job.id}`}>View Details</Link>
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-bold font-poppins text-text-dark mb-1">
                    <Link href={`/jobs/${job._id || job.id}`} className="hover:text-blue-600">{job.title}</Link>
                  </h3>
                  <p className="text-sm text-text-muted mb-4">{job.department}</p>
                  
                  <div className="space-y-2 mt-auto text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" /> {job.location || 'Not specified'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-400" /> {job.employmentType} • {job.experienceYears} Years Exp
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> 
                      Created: {job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-In") : 'N/A'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {jobs.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                No jobs found. Click "Create Job" to add a new job.
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
