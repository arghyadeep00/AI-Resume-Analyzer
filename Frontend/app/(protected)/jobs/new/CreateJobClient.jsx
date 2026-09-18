'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createJob } from '@/services/jobService';
import { toast } from 'react-toastify';

export default function CreateJobPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experienceLevel: 'Mid-Level',
    description: '',
    requiredSkills: '',
  });

  const handleGenerate = () => {
    if (!formData.title) return alert('Please enter a Job Title first');
    setIsGenerating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        description: `We are seeking a talented ${prev.title} to join our ${prev.department || 'Engineering'} team. In this role, you will be responsible for designing and implementing scalable solutions that impact millions of users. You will collaborate closely with cross-functional teams including design and product management.`,
        requiredSkills: 'JavaScript, React, Node.js, Problem Solving, Communication'
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const payload = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        employmentType: formData.type,
        description: formData.description,
        skills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
        experienceYears: formData.experienceLevel === 'Senior' ? 5 : (formData.experienceLevel === 'Mid-Level' ? 3 : 1)
      };
      await createJob(payload);
      toast.success('Job created successfully');
      router.push('/jobs');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to create job');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-poppins text-text-dark">Create New Job</h1>
            <p className="text-text-muted mt-1">Define the requirements to help AI match candidates better.</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input 
                  placeholder="e.g. Senior Frontend Engineer" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
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
                <label className="text-sm font-medium">Employment Type</label>
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
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium">Job Description</label>
                <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  {isGenerating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Generate with AI
                </Button>
              </div>
              <textarea 
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[150px]"
                placeholder="Describe the responsibilities and requirements..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Required Skills (Comma separated)</label>
              <Input 
                placeholder="React, Node.js, TypeScript"
                value={formData.requiredSkills}
                onChange={e => setFormData({...formData, requiredSkills: e.target.value})}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 bg-gray-50 border-t border-border p-4 rounded-b-xl">
            <Button variant="ghost" onClick={() => router.push('/jobs')}>Cancel</Button>
            <Button variant="outline" disabled={isSaving}>Save Draft</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Publish Job
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
