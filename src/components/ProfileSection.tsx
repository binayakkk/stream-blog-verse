
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, MapPin, Calendar, Edit, Camera, Award, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePosts } from '@/hooks/usePosts';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface Profile {
  id: string;
  full_name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

const ProfileSection = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    bio: '',
    location: '',
    website: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { posts } = usePosts();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setFormData({
          full_name: session.user.user_metadata?.full_name || '',
          email: session.user.email || '',
          bio: '',
          location: '',
          website: ''
        });
        await loadProfile(session.user.id);
      }
    };
    getUser();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error loading profile:', error);
        return;
      }
      
      if (data) {
        setProfile(data);
        setFormData(prev => ({
          ...prev,
          full_name: data.full_name || '',
          bio: data.bio || '',
          location: data.location || '',
          website: data.website || ''
        }));
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Update or insert profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;

      // Also update user metadata for consistency
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
        }
      });

      if (authError) console.error('Auth update error:', authError);

      setEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      await loadProfile(user.id);
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const userPosts = posts.filter(post => 
    post.author === (profile?.full_name || formData.full_name || user?.email?.split('@')[0])
  );

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Please sign in</h3>
        <p className="text-gray-500">You need to be signed in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {(profile?.full_name || formData.full_name || user.email || 'U').charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={() => setEditing(!editing)}
              >
                <Edit className="h-4 w-4" />
                <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile?.full_name || formData.full_name || user.email?.split('@')[0] || 'User'}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {profile?.bio || 'No bio available. Click edit to add your bio.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{profile?.location || 'Location not set'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">Verified Author</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userPosts.length}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {userPosts.reduce((sum, post) => sum + (post.views || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {userPosts.filter(post => post.featured).length}
                  </div>
                  <div className="text-sm text-gray-600">Featured</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {new Set(userPosts.flatMap(post => post.tags)).size}
                  </div>
                  <div className="text-sm text-gray-600">Topics</div>
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
            <span>Your Recent Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600">Published on {new Date(post.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{(post.views || 0).toLocaleString()}</div>
                    <div className="text-sm text-gray-500">views</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">You haven't written any posts yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      {editing && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input 
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input value={formData.email} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <Input 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://your-website.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileSection;
