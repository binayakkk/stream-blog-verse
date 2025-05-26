
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, MapPin, Calendar, Edit, Camera, Award, BookOpen } from 'lucide-react';

const ProfileSection = () => {
  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    bio: 'Full-stack developer passionate about creating amazing web experiences. Love sharing knowledge about React, TypeScript, and modern web development.',
    stats: {
      posts: 24,
      followers: 1240,
      following: 86,
      views: 45600
    },
    recentPosts: [
      { id: '1', title: 'Getting Started with React Hooks', views: 2400, date: '2024-01-15' },
      { id: '2', title: 'TypeScript Best Practices', views: 1800, date: '2024-01-10' },
      { id: '3', title: 'Modern CSS Techniques', views: 3200, date: '2024-01-05' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
                <p className="text-gray-600 leading-relaxed">{userProfile.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{userProfile.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Joined {userProfile.joinDate}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Verified Author</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.stats.posts}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userProfile.stats.followers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userProfile.stats.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{userProfile.stats.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Recent Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userProfile.recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600">Published on {new Date(post.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{post.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">views</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <Input defaultValue={userProfile.name} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input defaultValue={userProfile.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Input defaultValue={userProfile.location} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <Input placeholder="https://your-website.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              defaultValue={userProfile.bio}
            />
          </div>
          <div className="flex space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
