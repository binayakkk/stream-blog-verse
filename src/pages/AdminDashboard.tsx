
import React, { useState } from 'react';
import Header from '@/components/Header';
import BlogPostForm from '@/components/BlogPostForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'edit'>('dashboard');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Getting Started with React Hooks',
      excerpt: 'Learn how to use React Hooks effectively...',
      content: 'React Hooks revolutionized...',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Technology',
      tags: ['React', 'JavaScript'],
      featured: true,
    },
    {
      id: '2',
      title: 'The Future of Web Development',
      excerpt: 'Explore the latest trends...',
      content: 'Web development continues...',
      author: 'Mike Chen',
      date: '2024-01-12',
      category: 'Technology',
      tags: ['Web Development', 'Trends'],
      featured: false,
    }
  ]);

  const { toast } = useToast();

  const handleSavePost = (postData: Omit<BlogPost, 'id' | 'date'>) => {
    if (editingPost) {
      // Update existing post
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id 
          ? { ...postData, id: editingPost.id, date: editingPost.date }
          : post
      ));
      toast({
        title: "Post updated",
        description: "Your blog post has been successfully updated.",
      });
    } else {
      // Create new post
      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      setPosts(prev => [newPost, ...prev]);
      toast({
        title: "Post created",
        description: "Your new blog post has been successfully created.",
      });
    }
    
    setCurrentView('dashboard');
    setEditingPost(null);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('edit');
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast({
      title: "Post deleted",
      description: "The blog post has been successfully deleted.",
    });
  };

  const stats = {
    totalPosts: posts.length,
    featuredPosts: posts.filter(p => p.featured).length,
    categories: new Set(posts.map(p => p.category)).size,
    totalViews: '12.5k'
  };

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('dashboard')}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
          </div>
          <BlogPostForm onSave={handleSavePost} />
        </div>
      </div>
    );
  }

  if (currentView === 'edit' && editingPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setCurrentView('dashboard');
                setEditingPost(null);
              }}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
          </div>
          <BlogPostForm post={editingPost} onSave={handleSavePost} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button 
            onClick={() => setCurrentView('create')}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Post</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.featuredPosts}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
                </div>
                <Edit className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Management */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{post.category}</span>
                      {post.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Featured</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
