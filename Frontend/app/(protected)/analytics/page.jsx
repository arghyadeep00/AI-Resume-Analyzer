import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAnalytics } from '@/data/analytics';
import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-10">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-text-dark flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Recruitment Analytics
          </h1>
          <p className="text-text-muted mt-1">Track your hiring performance and candidate quality.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-text-muted mb-2">Total Applications</p>
              <h3 className="text-3xl font-bold font-poppins text-text-dark">{mockAnalytics.totalApplications.toLocaleString()}</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-text-muted mb-2">Avg Match Score</p>
              <h3 className="text-3xl font-bold font-poppins text-blue-600">{mockAnalytics.averageMatchScore}%</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-text-muted mb-2">Shortlist Rate</p>
              <h3 className="text-3xl font-bold font-poppins text-indigo-600">{mockAnalytics.shortlistRate}%</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-text-muted mb-2">Hiring Rate</p>
              <h3 className="text-3xl font-bold font-poppins text-green-600">{mockAnalytics.hiringRate}%</h3>
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
                {mockAnalytics.applicationsOverTime.map((data, i, arr) => {
                  const max = Math.max(...arr.map(d => d.value));
                  const height = (data.value / max) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full relative h-[250px] flex items-end">
                        <div 
                          className="w-full bg-blue-100 hover:bg-blue-500 rounded-t-sm transition-all duration-300 relative group-hover:shadow-md"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {data.value}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-text-muted">{data.name}</span>
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
              <div className="space-y-4 pt-4">
                {mockAnalytics.matchDistribution.map((item, i) => (
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
                          i === 2 ? 'bg-yellow-400' : 
                          i === 3 ? 'bg-orange-400' : 'bg-red-400'
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
              <CardTitle>Most Common Candidate Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 pt-4">
                {mockAnalytics.commonSkills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-gray-50">
                    <span className="font-medium text-text-dark">{skill.name}</span>
                    <span className="text-xs bg-white border border-border rounded-full px-2 py-0.5 text-text-muted">{skill.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
