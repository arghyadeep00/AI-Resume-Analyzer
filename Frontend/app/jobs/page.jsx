

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockJobs } from '@/data/jobs';
import { Search, Filter, Plus, MapPin, Briefcase, Users, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function JobsPage() {
  

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map(job => (
            <Card key={job.id} className="hover:shadow-md transition-shadow group flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={job.status === 'Active' ? 'success' : 'secondary'} className="mb-2">
                    {job.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-8 px-2" asChild>
                    <Link href={`/jobs/${job.id}`}>View Details</Link>
                  </Button>
                </div>
                
                <h3 className="text-lg font-bold font-poppins text-text-dark mb-1">
                  <Link href={`/jobs/${job.id}`} className="hover:text-blue-600">{job.title}</Link>
                </h3>
                <p className="text-sm text-text-muted mb-4">{job.department}</p>
                
                <div className="space-y-2 mt-auto text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" /> {job.type} • {job.experienceLevel}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" /> {job.applicants} Applicants
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border flex justify-between items-center text-xs text-text-muted">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Created: {job.createdDate}</span>
                  <span className="font-medium text-blue-600">{job.shortlisted} Shortlisted</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
