'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

export default function SettingsClient() {
  const { data: session } = useSession();
  const user = session?.user || { name: 'User', email: 'user@example.com', role: 'recruiter' };
  
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user.name || '',
    email: user.email || ''
  });

  const [aiPrefs, setAiPrefs] = useState({
    skills: 40,
    experience: 35,
    education: 15,
    keywords: 10,
    strictMode: true
  });

  const tabs = ['Profile', 'Company', 'AI Preferences', 'Notifications', 'Security'];

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile information updated successfully');
    }, 1000);
  };

  const handleSaveAiPrefs = () => {
    const total = Number(aiPrefs.skills) + Number(aiPrefs.experience) + Number(aiPrefs.education) + Number(aiPrefs.keywords);
    if (total !== 100) {
      toast.error(`Weights must add up to 100%. Current total: ${total}%`);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('AI Preferences saved successfully');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-text-dark">Settings</h1>
          <p className="text-text-muted mt-1">Manage your account and AI preferences.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-4">
          {/* Sidebar */}
          <div className="w-full md:w-48 flex-shrink-0">
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-md text-left whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-text-muted hover:text-text-dark hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'Profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl border border-blue-200">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input 
                        value={profileForm.name} 
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input 
                        value={profileForm.email} 
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        type="email" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <Input value={user.role || 'recruiter'} disabled className="capitalize" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border pt-6 justify-end">
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === 'AI Preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Configuration</CardTitle>
                  <CardDescription>Customize how the AI scores candidates. Total weight must be 100%.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-text-dark">Scoring Weights</h4>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        (Number(aiPrefs.skills) + Number(aiPrefs.experience) + Number(aiPrefs.education) + Number(aiPrefs.keywords)) === 100 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        Total: {Number(aiPrefs.skills) + Number(aiPrefs.experience) + Number(aiPrefs.education) + Number(aiPrefs.keywords)}%
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1 text-text-muted">
                          <span>Skills Match</span>
                          <span>{aiPrefs.skills}%</span>
                        </div>
                        <input 
                          type="range" 
                          className="w-full accent-blue-600" 
                          value={aiPrefs.skills} 
                          onChange={(e) => setAiPrefs({...aiPrefs, skills: e.target.value})}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1 text-text-muted">
                          <span>Experience Level</span>
                          <span>{aiPrefs.experience}%</span>
                        </div>
                        <input 
                          type="range" 
                          className="w-full accent-blue-600" 
                          value={aiPrefs.experience} 
                          onChange={(e) => setAiPrefs({...aiPrefs, experience: e.target.value})}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1 text-text-muted">
                          <span>Education</span>
                          <span>{aiPrefs.education}%</span>
                        </div>
                        <input 
                          type="range" 
                          className="w-full accent-blue-600" 
                          value={aiPrefs.education} 
                          onChange={(e) => setAiPrefs({...aiPrefs, education: e.target.value})}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1 text-text-muted">
                          <span>Keywords</span>
                          <span>{aiPrefs.keywords}%</span>
                        </div>
                        <input 
                          type="range" 
                          className="w-full accent-blue-600" 
                          value={aiPrefs.keywords} 
                          onChange={(e) => setAiPrefs({...aiPrefs, keywords: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-dark mb-2">Strict Mode</h4>
                    <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" 
                        checked={aiPrefs.strictMode}
                        onChange={(e) => setAiPrefs({...aiPrefs, strictMode: e.target.checked})}
                      />
                      Automatically reject candidates below 50% match
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border pt-6 justify-end">
                  <Button onClick={handleSaveAiPrefs} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Mock remaining tabs to avoid empty states */}
            {['Company', 'Notifications', 'Security'].includes(activeTab) && (
              <Card>
                <CardHeader>
                  <CardTitle>{activeTab} Settings</CardTitle>
                  <CardDescription>Configure your {activeTab.toLowerCase()} preferences.</CardDescription>
                </CardHeader>
                <CardContent className="py-12 flex justify-center text-text-muted text-sm">
                  These settings are currently available in the premium plan.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
