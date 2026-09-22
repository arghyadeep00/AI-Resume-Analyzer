'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Target, Loader2, Lightbulb } from 'lucide-react';
import { getAnalyses } from '@/services/analysisService';
import { toast } from 'react-toastify';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyses = await getAnalyses();
        
        // Calculate analytics based on analyses array
        const totalApplications = analyses.length;
        
        let totalScore = 0;
        let shortlisted = 0;
        let hired = 0;
        const skillsCount = {};
        const matchDist = {
          'Excellent (90-100%)': 0,
          'Good (75-89%)': 0,
          'Average (50-74%)': 0,
          'Poor (<50%)': 0,
        };
        const applicationsByMonth = {};

        analyses.forEach(a => {
          totalScore += a.score;
          if (a.score >= 75) shortlisted++;
          if (a.score >= 90) hired++; // Mocking hired rate based on >90 score
          
          // Match distribution
          if (a.score >= 90) matchDist['Excellent (90-100%)']++;
          else if (a.score >= 75) matchDist['Good (75-89%)']++;
          else if (a.score >= 50) matchDist['Average (50-74%)']++;
          else matchDist['Poor (<50%)']++;

          // Skills
          if (a.matchedSkills) {
            a.matchedSkills.forEach(skill => {
              skillsCount[skill] = (skillsCount[skill] || 0) + 1;
            });
          }

          // Applications over time (by month)
          const date = new Date(a.createdAt);
          const monthYear = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear().toString().substr(-2);
          applicationsByMonth[monthYear] = (applicationsByMonth[monthYear] || 0) + 1;
        });

        // Format charts data
        const averageMatchScore = totalApplications ? Math.round(totalScore / totalApplications) : 0;
        const shortlistRate = totalApplications ? Math.round((shortlisted / totalApplications) * 100) : 0;
        const hiringRate = totalApplications ? Math.round((hired / totalApplications) * 100) : 0;

        const matchDistribution = [
          { name: 'Excellent (90-100%)', value: totalApplications ? Math.round((matchDist['Excellent (90-100%)'] / totalApplications) * 100) : 0 },
          { name: 'Good (75-89%)', value: totalApplications ? Math.round((matchDist['Good (75-89%)'] / totalApplications) * 100) : 0 },
          { name: 'Average (50-74%)', value: totalApplications ? Math.round((matchDist['Average (50-74%)'] / totalApplications) * 100) : 0 },
          { name: 'Poor (<50%)', value: totalApplications ? Math.round((matchDist['Poor (<50%)'] / totalApplications) * 100) : 0 },
        ];

        // Format skills
        const commonSkills = Object.entries(skillsCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([name, count]) => ({
            name,
            value: Math.round((count / totalApplications) * 100)
          }));

        // Format applications over time - ensuring last 6 months exist even if empty
        const applicationsOverTime = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          const monthYear = d.toLocaleString('default', { month: 'short' }) + ' ' + d.getFullYear().toString().substr(-2);
          applicationsOverTime.push({
            name: monthYear,
            value: applicationsByMonth[monthYear] || 0
          });
        }

        setData({
          totalApplications,
          averageMatchScore,
          shortlistRate,
          hiringRate,
          matchDistribution,
          commonSkills,
          applicationsOverTime
        });
      } catch (error) {
        console.error("Failed to fetch analytics data", error);
        toast.error('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  const analytics = data || {
    totalApplications: 0,
    averageMatchScore: 0,
    shortlistRate: 0,
    hiringRate: 0,
    matchDistribution: [],
    commonSkills: [],
    applicationsOverTime: []
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-text-dark flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Recruitment Analytics
          </h1>
          <p className="text-text-muted mt-1">Track your hiring performance and candidate quality based on real analyses.</p>
        </div>

        {analytics.totalApplications === 0 ? (
          <div className="bg-white rounded-xl border border-border p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-2">No Data Available Yet</h3>
            <p className="text-text-muted max-w-md">
              You haven't analyzed any resumes yet. Start analyzing resumes against jobs to see real-time analytics on candidate quality, skills, and more.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-text-muted mb-2">Total Applications</p>
                  <h3 className="text-3xl font-bold font-poppins text-text-dark">{analytics.totalApplications.toLocaleString()}</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-text-muted mb-2">Avg Match Score</p>
                  <h3 className="text-3xl font-bold font-poppins text-blue-600">{analytics.averageMatchScore}%</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-text-muted mb-2">Shortlist Rate (≥75%)</p>
                  <h3 className="text-3xl font-bold font-poppins text-indigo-600">{analytics.shortlistRate}%</h3>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-text-muted mb-2">Hiring Rate (≥90%)</p>
                  <h3 className="text-3xl font-bold font-poppins text-green-600">{analytics.hiringRate}%</h3>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-end gap-2 pt-4">
                    {analytics.applicationsOverTime.map((item, i, arr) => {
                      const max = Math.max(...arr.map(d => d.value), 1); // Avoid div by 0
                      const height = (item.value / max) * 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="w-full relative h-[250px] flex items-end">
                            <div 
                              className="w-full bg-blue-100 hover:bg-blue-500 rounded-t-sm transition-all duration-300 relative group-hover:shadow-md"
                              style={{ height: `${Math.max(height, 2)}%` }} // Minimum height for visibility
                            >
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.value}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-text-muted whitespace-nowrap">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Match Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 pt-4">
                    {analytics.matchDistribution.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-text-muted">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              i === 0 ? 'bg-green-500' : 
                              i === 1 ? 'bg-blue-500' : 
                              i === 2 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Most Common Candidate Skills (Based on matched skills)</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics.commonSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-3 pt-4">
                      {analytics.commonSkills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-gray-50">
                          <span className="font-medium text-text-dark">{skill.name}</span>
                          <span className="text-xs bg-white border border-border rounded-full px-2 py-0.5 text-text-muted">{skill.value}%</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-text-muted">
                      No skills data available yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
