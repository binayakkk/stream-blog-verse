
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Eye, MessageSquare, Calendar, Target } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', posts: 12, views: 8400, comments: 234 },
  { month: 'Feb', posts: 15, views: 9200, comments: 312 },
  { month: 'Mar', posts: 18, views: 11800, comments: 456 },
  { month: 'Apr', posts: 22, views: 15600, comments: 589 },
  { month: 'May', posts: 25, views: 18900, comments: 678 },
  { month: 'Jun', posts: 28, views: 22100, comments: 745 }
];

const categoryData = [
  { name: 'Technology', value: 40, color: '#3B82F6' },
  { name: 'Design', value: 30, color: '#8B5CF6' },
  { name: 'Backend', value: 20, color: '#10B981' },
  { name: 'Others', value: 10, color: '#F59E0B' }
];

const chartConfig = {
  posts: { label: 'Posts', color: '#3B82F6' },
  views: { label: 'Views', color: '#8B5CF6' },
  comments: { label: 'Comments', color: '#10B981' }
};

const AnalyticsDashboard = () => {
  const stats = [
    {
      title: 'Total Views',
      value: '86.2K',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Users',
      value: '2.4K',
      change: '+8.2%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Posts',
      value: '120',
      change: '+15.3%',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Engagement Rate',
      value: '3.2%',
      change: '+5.1%',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Stats Cards */}
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Monthly Performance Chart */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Monthly Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="posts" fill="var(--color-posts)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Views Trend */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Views Trend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="var(--color-views)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-views)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Content Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New post published', title: 'React Hooks Guide', time: '2 hours ago', type: 'post' },
              { action: 'Comment received', title: 'TypeScript Best Practices', time: '4 hours ago', type: 'comment' },
              { action: 'New follower', title: 'Sarah Johnson started following you', time: '6 hours ago', type: 'follow' },
              { action: 'Post featured', title: 'Web Development Trends', time: '1 day ago', type: 'feature' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'post' ? 'bg-blue-500' :
                  activity.type === 'comment' ? 'bg-green-500' :
                  activity.type === 'follow' ? 'bg-purple-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.title}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
