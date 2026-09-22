'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getJobById, updateJob } from '@/services/jobService';
import { toast } from 'react-toastify';

export default function EditJobClient({ params }) {
  const router = useRouter();
  const { id } = params;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experienceYears: '',
    description: '',
    requiredSkills: '',
    preferredSkills: '',
    educationRequirements: '',
    responsibilities: '',
    technologies: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        const job = data.job || data;
        
        setFormData({
          company: job.company || '',
          title: job.title || '',
          department: job.department || '',
          location: job.location || '',
          type: job.employmentType || 'Full-time',
          experienceYears: job.experienceYears || '',
          description: job.description || '',
          requiredSkills: (job.parsedData?.requiredSkills || job.skills || []).join(', '),
          preferredSkills: (job.parsedData?.preferredSkills || []).join(', '),
          educationRequirements: (job.parsedData?.educationRequirements || []).join('\n'),
          responsibilities: (job.parsedData?.responsibilities || []).join('\n'),
          technologies: (job.parsedData?.technologies || []).join(', ')
        });
      } catch (error) {
        console.error(error);
        toast.error('Failed to load job details');
        router.push('/jobs');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id, router]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const payload = {
        title: formData.title,
        company: formData.company || 'Unknown Company',
        department: formData.department,
        location: formData.location,
        employmentType: formData.type,
        description: formData.description,
        skills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
        experienceYears: Number(formData.experienceYears) || 0,
        parsedData: {
          requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
          preferredSkills: formData.preferredSkills.split(',').map(s => s.trim()).filter(Boolean),
          requiredExperienceYears: Number(formData.experienceYears) || 0,
          educationRequirements: formData.educationRequirements.split('\n').map(s => s.trim()).filter(Boolean),
          responsibilities: formData.responsibilities.split('\n').map(s => s.trim()).filter(Boolean),
          technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean)
        }
      };
      
      await updateJob(id, payload);
      toast.success('Job updated successfully');
      router.push(`/jobs/${id}`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update job');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
        <div className="flex items-center gap-4">
          <Link href={`/jobs/${id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-poppins text-text-dark">Edit Job</h1>
            <p className="text-text-muted mt-1">Update job details and matching requirements.</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title *</label>
                  <Input 
                    placeholder="e.g. Senior Frontend Engineer" 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input 
                    placeholder="e.g. Acme Corp" 
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department *</label>
                  <Input 
                    placeholder="e.g. Engineering"
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    placeholder="e.g. Remote, New York"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Employment Type *</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience (Years)</label>
                  <Input 
                    type="number"
                    min="0"
                    placeholder="e.g. 3"
                    value={formData.experienceYears}
                    onChange={e => setFormData({...formData, experienceYears: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Job Description Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Job Description</h3>
              <textarea 
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[150px]"
                placeholder="Describe the overall role and requirements..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            {/* AI Parsing Requirements Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Specific Requirements (For AI Matching)</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Responsibilities (One per line)</label>
                <textarea 
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[100px]"
                  placeholder="Design scalable systems&#10;Collaborate with cross-functional teams..."
                  value={formData.responsibilities}
                  onChange={e => setFormData({...formData, responsibilities: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Education Requirements (One per line)</label>
                <textarea 
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[80px]"
                  placeholder="Bachelor's in Computer Science or related field&#10;Master's degree preferred..."
                  value={formData.educationRequirements}
                  onChange={e => setFormData({...formData, educationRequirements: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Required Skills * (Comma separated)</label>
                  <Input 
                    placeholder="React, Node.js, TypeScript"
                    value={formData.requiredSkills}
                    onChange={e => setFormData({...formData, requiredSkills: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Skills (Comma separated)</label>
                  <Input 
                    placeholder="Docker, AWS, GraphQL"
                    value={formData.preferredSkills}
                    onChange={e => setFormData({...formData, preferredSkills: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Technologies Used (Comma separated)</label>
                  <Input 
                    placeholder="React, Next.js, Tailwind CSS, PostgreSQL"
                    value={formData.technologies}
                    onChange={e => setFormData({...formData, technologies: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 bg-gray-50 border-t border-border p-4 rounded-b-xl">
            <Button variant="ghost" onClick={() => router.push(`/jobs/${id}`)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Update Job
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
